
# Unicode-parser
Script ideal para generar documentos que se podrían confeccionar usando LaTeX, pero no hay suficientes ganas/tiempo de aprenderlo.

## Descripción
Al ejecutarse, este script revisa y encuentra en todos los archivos de una carpeta dada, todas las palabras clave que aparezcan, y las reemplaza por sus respectivos símbolos Unicode, según una tabla-diccionario interno.

## Requerimientos
Solo es necesario contar con NodeJS instalado para poder ejecutar el script.

## Ejemplos de uso

Para usar este script, debemos ejecutarlo desde una terminal, por lo cual es necesario abrir una terminal y posicionarse en el directorio en donde se encuenta el parser.

### Ver opciones de uso

```user@pc:~$ node unicode-parser.js```

### Ver lista de claves y simbolos unicode disponibles

```user@pc:~$ node unicode-parser.js -d```

### Traducir el contenido de una carpeta
(Consideremos que la carpeta que contiene los archivos que queremos traducir se encuenta en la ruta: "/ruta/a/la/carpeta")

```user@pc:~$ node unicode-parser.js -p /ruta/a/la/carpeta```

***Importante:** si se deseara convertir un único archivo, se deberá colocar ese archivo en una carpeta aparte y pasar al programa la ruta de la misma, ya que por el momento el programa sólo recibe rutas de carpetas.*

## Extensión del programa
En el caso de que los símbolos que necesites no se encuentren en la tabla, es posible agregarlos editando directamente el código fuente, añadiendo el par "*clave*": "*valor*" al diccionario.

Por el momento, se mantiene todo en un único archivo para favorecer su portabilidad y simpleza. Es posible que en futuras versiones esto cambie, y a medida que su tamaño lo amerite, termine separado en más de un archivo.

Si te gustaría colaborar con el proyecto, corregir algun error, agregar alguna funcionalidad, etc, no dudes en contactarme!
