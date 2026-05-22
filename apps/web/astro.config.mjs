import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
    integrations: [react()],
    vite: {
        plugins: [
            {
                name: "rewrite",
                configureServer(serve) {
                    serve.middlewares.use((req, _, next) => {
                        if (req.url?.startsWith("/area-privada/")) {
                            req.url = "/area-privada";
                        }

                        next();
                    });
                },
            },
        ],
        dev: {
            sourcemap: true,
        },
        build: {
            sourcemap: true,
        },
    },
});
