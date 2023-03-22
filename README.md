# Federico Burgos

[![Captura11.png](https://i.postimg.cc/Qd86m6NM/Captura11.png)](https://postimg.cc/0b4d20wg)


## Stack:

React

React Router Dom

Redux

SweetAlert

Materialize 

Markdown Editor


## How to run APP


1 - Cambiar el token para evitar error 401
    
    Dirigirse a la carpeta "src/utils" y cambiar el "acces_token" por uno nuevo. Abajo veran un guía de como conseguir un token.
    
    https://docs.github.com/en/enterprise-server@3.4/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
    
    Por ultimo, al tener que elegir entre las opciones "Select scopes" solo hace falta marcar la primer opción "repo".

2 - cd client

3 - npm i

4 - npm run start


### Notas:

¡Buenas! El proyecto se trata de simular el buscador y explorador de GitHub. Mediante la API publica que ofrece Git junto la documentación de la misma me puse como reto poder realizar el buscador. Con un aspecto soberbio y simple cumplo con la funcionalidad deseada. La utilización ofrece la posibilidad de buscar cualquier repositorio (mientras sea publico) retornando al usuario una lista de repositorios emparentados con la busqueda (según mayor similitud hasta menor) con un sistema de paginación y renderizado maximo por pagina. A la vez tambien se muestra la imagen de perfil y datos de los dueños de los repositorios. 
Por ultimo se puede acceder a cada repositorio y explorar los archivos que posee. Se puede leer las lineas de codigo, ver la documentación y hasta visualizar las imagenes adjuntas al repositorio.
