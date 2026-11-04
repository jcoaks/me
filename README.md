# jcoaks.com

Mi portafolio y tarjeta de presentación. Sitio estático en HTML y CSS, sin frameworks ni build, publicado en Cloudflare.

- Español: https://jcoaks.com
- Inglés: https://jcoaks.com/en/

## Estructura

```
public/               # Todo lo que se publica
├── index.html        # Versión en español
├── en/index.html     # Versión en inglés
├── style.css         # Estilos (tema oscuro/claro y estilos de impresión)
├── site.js           # Switch de tema y botón de descarga del CV
└── assets/juan.jpg   # Foto
wrangler.jsonc        # Configuración de Cloudflare y dominios
```

## Cómo funciona

- **Idioma.** Hay una página real por idioma, así cada URL se puede compartir en el idioma correcto. El switch ES/EN son links normales. Las dos páginas llevan `hreflang` y metadatos propios para compartir en redes.
- **Tema.** Usa el tema del sistema por defecto y recuerda la elección en `localStorage`. Los colores son variables CSS al inicio de `style.css`.
- **CV en PDF.** No hay un PDF aparte. El botón "Descargar CV" abre la impresión del navegador y `@media print` en `style.css` convierte la página en un CV de 2 páginas A4. Para actualizar el CV basta con editar el contenido de la página.

## Editar contenido

Cada cambio de texto se hace **dos veces**, una en `public/index.html` y otra en `public/en/index.html`. Las secciones son: presentación, sobre mí, experiencia, proyectos, herramientas y contacto.

## Vista previa local

Las rutas son absolutas (`/style.css`), así que hay que servir la carpeta `public/` desde la raíz:

```sh
python3 -m http.server 8080 --directory public
```

Luego abrir http://localhost:8080 y http://localhost:8080/en/.

## Publicar

```sh
npx wrangler login    # solo la primera vez
npx wrangler deploy
```

Esto sube `public/` y mantiene conectados `jcoaks.com` y `www.jcoaks.com`. El despliegue es manual: un push a GitHub no publica por sí solo.

## Correo

`hola@jcoaks.com` se reenvía a mi Gmail con Cloudflare Email Routing. Se configura en el panel de Cloudflare, no en este repo.
