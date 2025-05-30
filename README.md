# gobiernovasco.marketing

Explora cómo se reparte el dinero público a los medios de comunicación en el País Vasco.

Este repositorio contiene el código fuente y la documentación del sitio web [gobiernovasco.marketing](https://gobiernovasco.marketing), así como las memorias oficiales del Gobierno Vasco, el intérprete (_parser_) programado para extraer de ellas los datos de las campañas de publicidad institucional, y estos datos ya extraídos en forma JSON.

Un proyecto de Jaime Gómez-Obregón [que puedes apoyar en Patreon](https://www.patreon.com/jaime_gomez_obregon).

## Puesta en marcha

Clona el proyecto desde GitHub e instala `node` 18 o superior y `yarn` en tu sistema, si acaso no lo están ya.

Si es la primera vez que arrancas el proyecto, instala antes sus dependencias:

```shell
yarn install
```

Y lanza finalmente el entorno de desarrollo:

```shell
npm run serve
```

El proyecto se abrirá en una nueva pestaña en tu navegador.

En Visual Studio Code el comando `npm run serve` se lanzará automáticamente al abrir la carpeta del proyecto.

### Despliegue en producción

Se hace automáticamente en Netlify con cada `push` a la rama `main`.

### Análisis (opcional)

[TODO] La clasificación de contratistas ordenados por su volumen de contratación o la inversión total en un año se muestran en la consola de depuración del navegador (`console.log()`).

### Reconstrucción de la fuente de datos (opcional)

No es necesario porque el documento JSON con todos los datos extraídos de las memorias institucionales está incorporado al repositorio.

Pero para reprocesar los ficheros originales PDF del Gobierno Vasco, instala `pdftohtml` 0.40 (la versión del paquete poppler es más moderna y no sirve) en tu sistema y conviértelos a su versión HTML aproximada:

```shell
./bin/convert.sh
```

Después, corre el intérprete que los toma y emite por `stdout` la estructura de datos JSON resultante:

```shell
npm run --silent parse > httpdocs/datos/campañas.json
```

Por último, es recomendable revisar que todos los tests pasan satisfactoriamente:

```
npm run test
```
