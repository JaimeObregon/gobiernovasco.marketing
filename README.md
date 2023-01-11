# gobiernovasco.marketing

Explora cómo se reparte el dinero público a los medios de comunicación en el País Vasco.

Este repositorio contiene el código fuente y la documentación del sitio web [gobiernovasco.marketing](https://gobiernovasco.marketing).

Un proyecto de Jaime Gómez-Obregón.

## Puesta en marcha

Clona el proyecto desde GitHub e instala `node` 18 o superior y `yarn` en tu sistema, si acaso no lo están ya.

Si es la primera vez que arrancas el proyecto, instala antes sus dependencias:

```console
yarn install
```

Y lanza finalmente el entorno de desarrollo:

```console
npm run dev
```

El proyecto se abrirá en una nueva pestaña en tu navegador.

En Visual Studio Code el comando `npm run dev` se lanzará automáticamente al abrir la carpeta del proyecto.

### Despliegue en producción

Se hace automáticamente en Netlify con cada `push` a la rama `main`.

### Reconstrucción de la fuente de datos (opcional)

No es necesario porque el documento JSON con todos los datos requeridos por el proyecto está incorporado al repositorio.

Pero para reprocesar los ficheros originales PDF del Gobierno Vasco, instala `pdftohtml` en tu sistema y conviértelos a su versión HTML aproximada:

```console
./bin/convert.sh
```

Después, corre el intérprete que los toma y emite por `stdout` la estructura de datos JSON resultante:

```console
npm run parse > /httpdocs/datasource.json
```

Por último, es recomendable revisar que todos los tests pasan satisfactoriamente:

```
npm test
```
