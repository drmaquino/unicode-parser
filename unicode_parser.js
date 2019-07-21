const fs = require('fs')
const readline = require('readline')

const dict = {
    forall: '\u2200',
    exists: '\u2203',
    and: '\u2227',
    or: '\u2228',
    not: '\u00AC',
    in: '\u220A',
    then: '\u21D2',
    '=>': '\u21D2',
    iff: '\u27FA',
    '<=>': '\u27FA',
    '->': '\u27F6',
    '<-': '\u27F5',
    emptyset: '\u2205',
    neq: '\u2260',
    '=obs': '=\u1D52\u1D47\u02E2',
    '===': '\u2261',
    '<=': '\u2264',
    '>=': '\u2265',
    pi: '\u03C0',
    _0: '\u2080',
    _1: '\u2081',
    _2: '\u2082',
    _3: '\u2083',
    _4: '\u2084',
    _5: '\u2085',
    _6: '\u2086',
    _7: '\u2087',
    _8: '\u2088',
    _9: '\u2089',
    bullet: '\u2022',
    beta: '\u03B2'
}

async function processFolder(originFolder) {
    const destinationFolder = originFolder + '/../transpiled'
    try {
        const allFilenames = fs.readdirSync(originFolder)
        const filenames = filterHiddenAndDirectories(allFilenames)
        try {
            fs.mkdirSync(destinationFolder)
        } catch (err) {
            // folder exists, no need to create it
        }
        for (const name of filenames) {
            try {
                processFile(originFolder + '/' + name, destinationFolder + '/' + name)
            } catch (err2) {
                console.log("error al procesar el archivo: " + name)
            }
        }
    } catch (err) {
        console.log("no existe la ruta especificada")
    }
}

function filterHiddenAndDirectories(filenames) {
    // this attempts (poorly) to avoid processing folders and hidden files
    return filenames.filter(e => e.includes('.') && !e.startsWith('.'))
}

async function processFile(origin, destination) {
    const transpiled = await processText(origin)
    fs.writeFileSync(destination, transpiled)
}

async function processText(origin) {
    let text = ''
    const fileStream = fs.createReadStream(origin)

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    })

    for await (const line of rl) {
        if (!line.startsWith('//')) {
            try {
                const translated = translateLine(line)
                text += translated
                text += '\n'
            } catch (err) {
                let markedError = ''
                markedError += '>>>> ERROR: ' + err + '\n'
                markedError += line
                markedError += '\n<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n'
                text += markedError
            }
        }
    }
    return text
}

function isValidLine(line) {
    let opened = false
    for (const c of line) {
        if (c == '$') {
            if (opened) {
                return false
            } else {
                opened = true
            }
        } else if (c == '.' && opened) {
            opened = false
        }
    }
    return !opened
}

function translateLine(line) {
    if (!isValidLine(line)) {
        throw "los marcadores de apertura/cierre no coinciden"
    } else {
        let result = ''
        let i = 0
        while (i < line.length) {
            if (line[i] == '$') {
                let desde = i
                while (line[i] != '.' && i < line.length) {
                    i++
                }
                const command = line.slice(desde + 1, i)
                if (dict[command]) {
                    const replacement = dict[command]
                    result += replacement
                } else {
                    throw `'${command}' no es un comando valido`
                }
            } else {
                result += line[i]
            }
            i++
        }
        return result
    }
}

function mostrarDiccionario() {
    console.log('este traductor tomara cada palabra que encuentre entre $ y . y la reemplazara segun la siguiente tabla:\n')
    for (const [k, v] of Object.entries(dict)) {
        console.log(`${k} : ${v}`)
    }
}

function mostrarAyuda() {
    console.log("por favor, elija una de las siguientes opciones:")
    console.log("-d : muestra el diccionario de simbolos")
    console.log("-p <folder> : especifica el nombre de la carpeta que contiene los archivos a traducir")
}

async function main() {
    if (process.argv[2] === '-d') {
        mostrarDiccionario()
    } else if (process.argv[2] === '-p') {
        if (process.argv[3]) {
            await processFolder(process.argv[3])
            console.log("traduccion finalizada.")
        } else {
            console.log("por favor, especifique la carpeta con los archivos a traducir.")
        }
    } else {
        mostrarAyuda()
    }
}

main()
