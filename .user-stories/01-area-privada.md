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

> **Francisca (Frontend developer)** — _05-03-2026_
>
> _Implementación de la lógica de gestión de favoritos en el listado de propiedades y mejoras en la interfaz de listado de propiedades._
> _Refactorización del buscador, creado el componente <SearchBar /> a un módulo independiente y creación de su documentación en Storybook._
> _Sincronización con la maqueta: PropiedadCard, etiquetas de "publicados" y botón de favoritos._
> _Añadido acceso directo al área privada desde el componente de listado de propiedades para mejorar UX._
>
> ---
>
> **Francisca (Frontend developer)** — _05-03-2026_
>
> _Listado de alquileres a datos dinámicos de la API y optimizar renderizado._
>
> - _Sustituir datos mock por datos de la API con listings.service (APIs pública y privada)._
> - _Implementar 'useMemo' para el filtrado de propiedades y permitir la búsqueda._
> - _Integración de <PropiedadCard /> para la visualización estandarizada de viviendas._
> - _Añadir estados de carga, error y manejo de resultados vacíos en la vista de MisAlquileres._
> - _Refactorizar 'HeroSection' para permitir botones opcionales, mejorando la flexibilidad del componente._
>
> ---
>
> **Francisca (Frontend developer)** — _05-03-2026_
>
> _Creado servicio listing.service.ts para conectar a la API y gestionar el listing de propiedades. Definición de la interfaz 'Listing' y métodos para consultas públicas y privadas (y su búsqueda)._
> _Mejora de comentarios en auth.service._
>
> ---
>
> **Francisca (Frontend developer)** — _04-03-2026_
>
> - _Continúo trabajando en el diseño._
> - _He creado el componente PropiedadCard para el listado de propiedades._
> - _Stories de HeroSection y PropiedadCard para visualizarlos en el Storybook._
> - _Eliminado css innecesario en mis-alquileres al crear el nuevo componente._
> - _StarIcon para manejar el icono de favoritos en el PropertyCard._
>
> ---
>
> **Francisca (Frontend developer)** — _04-03-2026_
>
> - _Creo un nuevo componente HeroSection provisional para mejorar el UX/UI del manejo de errores y área privada._
>
> ---
>
> **Francisca (Frontend developer)** — _28-02-2026_
>
> _Empiezo con la tarea._
> _Programada lógica de autenticación e inicio de sesión. Esto ha implicado:_
>
> - _Añadir la librería js-cookie al paquete area-privada para gestionar los tokens de la sesión._
> - _Servicio authService en auth.service.ts para conectar a la API y validar._
> - _Contexto AuthContext lógica del usuario utilizando authServices y cookies para la sesión._
> - _Modificar elementos del formulario login para el uso del contexto._
> - _AreaPrivadaRouter en index para manejar la navegación en función de la autenticación y añadimos el contexto en el index._
>
> ---
>
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
