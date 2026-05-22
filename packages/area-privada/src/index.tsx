import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./login";
import MisAlquileres from "./mis-alquileres";
import { HeroSection } from "../../ui/src/HeroSection";

const AreaPrivadaRouter = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    const { logout } = useAuth();

    // Función auxiliar para cambiar de URL sin recargar la página (Francisca)
    const navigateTo = (path: string) => {
        window.history.pushState(null, "", path);
        setCurrentPath(path);
    };

    useEffect(() => {
        // Manejamos interacción del usuario con el navegador (Francisca)
        const handlePopstate = () => setCurrentPath(window.location.pathname);
        window.addEventListener("popstate", handlePopstate);

        if (!isLoading) {
            // No está logeado y trata de entrar a cualquier sitio que no sea Login (Francisca)
            if (!isAuthenticated && currentPath !== "/area-privada/login") {
                navigateTo("/area-privada/login");
            }

            // Sí está logeado pero está en el Login (Francisca)
            if (isAuthenticated && currentPath === "/area-privada/login") {
                navigateTo("/area-privada/mis-alquileres");
            }
        }

        return () => window.removeEventListener("popstate", handlePopstate);
    }, [currentPath, isAuthenticated, isLoading]);

    // Renderizados

    // Mientras comprobamos la sesión (Francisca)
    if (isLoading) return <div>Cargando...</div>;

    // Si no está autenticado, solo mostramos el Login (Francisca)
    if (!isAuthenticated) {
        return <Login />;
    }

    // Si está autenticado, renderizamos según la URL (Francisca)
    return (
        <>
            {currentPath === "/area-privada" && (
                <HeroSection
                    title="Mi área privada"
                    message="Bienvenido a tu área privada. Aquí puedes gestionar tus alquileres y ver tus propiedades favoritas."
                    primaryAction={{
                        label: "Mis alquileres",
                        onClick: () =>
                            navigateTo("/area-privada/mis-alquileres"),
                    }}
                    secondaryAction={{
                        label: "Cerrar sesión",
                        onClick: () => (
                            logout(),
                            navigateTo("/area-privada/login")
                        ),
                    }}
                />
            )}

            {currentPath === "/area-privada/mis-alquileres" && (
                <MisAlquileres />
            )}
        </>
    );
};

export const AreaPrivada = () => (
    <AuthProvider>
        <AreaPrivadaRouter />
    </AuthProvider>
);

export default AreaPrivada;
