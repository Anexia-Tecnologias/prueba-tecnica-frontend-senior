# Área privada: login y listado de viviendas alquiladas

_Como cliente (propietario) de Alquilerseguro, quiero poder acceder a un área privada y ver un listado de mis alquileres, para poder identificarlos, buscarlos y acceder a su detalle._

## Criterios de aceptación

## Inicio de sesión

- [ ] El cliente (propietario) debe poder acceder a un área privada en `/area-privada`.
- [ ] Al acceder por primera vez, será redirigido a `/area-privada/login`, donde deberá ingresar su email y contraseña para iniciar sesión.
- [ ] Si el inicio de sesión es incorrecto, se mostrará un mensaje de error indicando que las credenciales son inválidas.
- [ ] Si el inicio de sesión es correcto, el cliente deberá ser redirigido a la página de `/area-privada/mis-alquileres`.
- [ ] Si ya ha iniciado sesión previamente, no deberá volver a ingresar sus credenciales y deberá ser redirigido directamente a la página de `/area-privada/mis-alquileres`.

## Listado de viviendas alquiladas

- [ ] En la página de mis alquileres, el cliente deberá ver un listado de las viviendas que tiene alquiladas, tanto las publicadas como las no publicadas.
- [ ] Se mostrará la información que se nuestra en el diseño.
- [ ] Podrá usar el campo de búsqueda para filtrar por dirección o descripción
- [ ] Podrá marcar como favorito una vivienda, y se mantendrá el estado de favorito aunque se recargue la página o se cierre el navegador.

El detalle de cada vivienda queda fuera del alcance de esta tarea.

## Diseño

https://www.figma.com/design/JU7SZpXFXa82XmtPyMdSOx/frontend-challenge--NO-BORRAR

(Necesitarás create una cuenta de Figma para acceder al diseño, es gratuito)

## Comentarios en la tarea

> **Pancho (Frontend developer)** — _15-01-2026_
>
> _He dejado ya las vistas de login y el listado de viviendas maquetadas, pero falta integrarlas con la API._
>
> ---
>
> **Pancho (Frontend developer)** — _13-01-2026_
>
> _Empiezo con la tarea_
>
> ---
>
> **Juan (Backend developer)** — _23-12-2025_
>
> _Los endpoints están ya creados, dejo la información necesaria para que Pancho pueda integrarlos:_
>
> - **Ruta del API**: `https://dummy-api.asaldana.workers.dev/api`
> - **Documentación**: `https://dummy-api.asaldana.workers.dev` (se accede con los credenciales `developer:developer`)
> - **usuario**: `propietario-de-prueba@alquilerseguro.es`
> - **contraseña**: `86GX36UU9RbREt8c`
>
> ---
>
> **Pepe (Lead front)** — _01-12-2025_
>
> _Dejo la estructura de proyecto ya creada. Hay dos apps: "web" (para la web pública y privada) y "docs", con un storybook para documentar los componentes. También están ya creados las paquetes de la librería "ui" con el componente botón, que he dejado a modo de ejemplo._
>
> _Puedes añadir paquetes npm si lo necesitas, pero añádelos al package correcto y justifica lo que has añadido en un comentario. Si ves también que alguna sobra puedes quitarla._
>
> ---
