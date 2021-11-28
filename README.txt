Comando principal para iniciar el proyecto y crear el package.json
npm init

Te pedira llenar varios campos:
-package name: Nombre del paquete.
-version: Version del paquete
-description: Descriptión del paquete
-entry point:
-test command: Comando para correr pruebas unitarias
-git repository: Repositorio de git
-keywords: Palabras claves para encontrar el proyecto
-author: Nombre del autor del proyecto
-license: EMI
Presionar yes si todos los campos estan correcto.

Una vez creado el package.json, veremos un campos llamado scripts, en este poderemos agregar comandos que queremos que sean ejecutados
de manera mas sencilla, ejemplos
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "base3": "node app --base=3"
}
Para este caso decimos que si ejecutamos el comando "npm run base3", se va a ejecutar el comando "node app --base=3"

CREACIÓN DE DEPENDENCIAS:
1. Simplemente agregue en la consolade comandos el comando para instalar el paquete y este se agregara a las dependencias del proyecto
en el package.json, Se creara un nuevo campo como este:
"dependencies": {
    "colors": "^1.4.0"
}
A demas tambien se creara un nuevo json llamado, package-lock.json el cual contendra toda la info de las dependencias.

2.Ahora bien se queremos crear una dependencias que van a hacer usadas solo en desarrollo, lo que debemos a hacer es que junto al comando de
de instalación del paquete agregar lo siguiente: --save-dev, ejemplo: "npm install nodemon --save-dev", esto creara un nuevo campo en el package.json
coomo este:
"devDependencies": {
    "nodemon": "^2.0.15"
}

CREACIÓN ESPECIFICA DE VERSIÓN DE DEPENDENCIAS
Si queremos instalar una versión especifica de un paquete, debemos llevar a cabo el siguiente comando: npm install nodemon@1.0.0

ACTUALIZACIÓN DE TODAS LAS DEPENDENCIAS:
npm update

ELIMINACIÓN DE DEPENDENCIAS
Si queremos eliminar alguna dependencia, solo bastara con ejecutar el comando de npm uninstall "nombre de la dependencias", ejemplo:
"npm uninstall nodemon"

Cabe destacar que en la carpeta de node_modules, veremos todas la carpetas que se han creada y que son necesarias para las dependencias.

INSTALAR DEPENDENCIAS EN PROYECTO NUEVO:
npm i

INSTALAR DEPENDENCIAS EN PROYECTO DE DESARROLLO:
npm i --production

LISTAR MODULOS INSTALADOS:
npm ls

LISTAR MODULOS INSTALADOS SIN SUS DEPENDENCIAS:
npm ls --depth 0

VERIFICAR SI HAY ACTUALIZACIONES PARA LOS MODULOS:
npm outdated

ACTUALIZAR TODOS LOS MODULOS:
npm update.

GIT 
Iniciar proyecto git
git init