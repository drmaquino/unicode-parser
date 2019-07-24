
# Unicode-parser
Script ideal para generar documentos que se podrían confeccionar usando LaTeX, pero no hay suficientes ganas/tiempo de aprenderlo.

## Descripción
Al ejecutarse, este script revisa y encuentra en todos los archivos de una carpeta dada, todas las palabras clave que aparezcan, y las reemplaza por sus respectivos símbolos Unicode, según una tabla-diccionario interno.

## Requerimientos
Solo es necesario contar con NodeJS instalado para poder ejecutar el script.

## Ejemplos de uso

Para usar este script, debemos ejecutarlo desde una terminal, por lo cual es necesario abrir una terminal y posicionarse en el directorio en donde se encuenta el parser.

### Ver opciones de ejecución

```user@pc:~$ node unicode-parser.js```

### Ver lista de claves y simbolos unicode disponibles

```user@pc:~$ node unicode-parser.js -d```

### Traducir el contenido de una carpeta
(Consideremos que la carpeta que contiene los archivos que queremos traducir se encuenta en la ruta: "/ruta/a/la/carpeta")

```user@pc:~$ node unicode-parser.js -p /ruta/a/la/carpeta```

Los archivos traducidos se guardarán en otro directorio en la misma ruta donde se encuenta la carpeta original. Este directorio será creado la primera vez, si es necesario.

***Importante:** si se deseara convertir un único archivo, se deberá colocar ese archivo en una carpeta aparte y pasar al programa la ruta de la misma, ya que por el momento el programa sólo recibe rutas de carpetas.*

## Confección de los documentos
El script permite insertar símbolos unicode escribiendo su alias en el texto. Para indicar que estamos escribiendo un alias, y no simplemente texto, se deberá anteponer un '$' (signo peso) y terminar con un '.' (punto). Si alguna de las líneas llegara a contener algun error de formato, o el alias introducido no está dentro del diccionario, se mostrará un error en la línea en cuestion. Aquí algunos ejemplos:

### Archivo original
```
aConj: Secu(Secu(Evento)) $->. Conj(Secu(Evento))
aConj(<>) $===. $emptyset.
aConj(e$bullet.s) $===. Ag(e, aConj(s))

$bullet. función nuevoJuego(in h: Habitacion, in js: Conj(Jugador), in f: Fantasma) $->. juego: Juego
Pre $===. { $not.vacio?(js) $and. Rep(h) $and.L
        $pi.$_1.(prim(f)) $in. libres(h) }
Post $===. { habitacion(juego) $=obs. h $and.
        fantasmas(juego) $=obs. agregar(f, $emptyset.) $and.
		jugadores(juego) $=obs. js $and.
        ($forall.jug: Jugador)(jug $in. js $=>.L acciones(jug, juego) $=obs. <>) }

$bullet. función verJugadoresVivos(in juego: Juego) $-> js: Lista(Tupla(Jugador, Pos, Dir))
  Pre $===. { true }
  Post $===. { ( $forall.j: Jugador)(j $in. jugadores(juego) $=>.L
            (j $in. claves(js) $<==>. jugadorVivo(j, juego))) }
```

### Archivo traducido
```
aConj: Secu(Secu(Evento)) ⟶ Conj(Secu(Evento))
aConj(<>) ≡ ∅
aConj(e•s) ≡ Ag(e, aConj(s))

• función nuevoJuego(in h: Habitacion, in js: Conj(Jugador), in f: Fantasma) ⟶ juego: Juego
Pre ≡ { ¬vacio?(js) ∧ Rep(h) ∧L
        π₁(prim(f)) ∊ libres(h) }
Post ≡ { habitacion(juego) =ᵒᵇˢ h ∧
        fantasmas(juego) =ᵒᵇˢ agregar(f, ∅) ∧
		jugadores(juego) =ᵒᵇˢ js ∧
        (∀jug: Jugador)(jug ∊ js ⇒L acciones(jug, juego) =ᵒᵇˢ <>) }

>>>> ERROR: los marcadores de apertura/cierre no coinciden
$bullet.función verJugadoresVivos(in juego: Juego) $-> js: Lista(Tupla(Jugador, Pos, Dir))
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
Pre ≡ { true }
Post ≡ { ( ∀j: Jugador)(j ∊ jugadores(juego) ⇒L
>>>> ERROR: '<==>' no es un comando valido
            (j $in. claves(js) $<==>. jugadorVivo(j, juego))) }
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

```

## Extensión del programa
En el caso de que los símbolos que necesites no se encuentren en la tabla, es posible agregarlos editando directamente el código fuente, añadiendo el par "*clave*": "*valor*" al diccionario.

Por el momento, se mantiene todo en un único archivo para favorecer su portabilidad y simpleza. Es posible que en futuras versiones esto cambie, y a medida que su tamaño lo amerite, termine separado en más de un archivo.

Si te gustaría colaborar con el proyecto, corregir algun error, agregar alguna funcionalidad, etc, no dudes en contactarme!
