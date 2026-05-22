import Login from "./login";
import MisAlquileres from "./mis-alquileres";

export const AreaPrivada = () => {
    // Redirije al login por defecto:
    if (window.location.pathname === "/area-privada") {
        window.history.replaceState(null, "", "/area-privada/login");
    }

    return (
        <>
            {window.location.pathname === "/area-privada/mis-alquileres" && (
                <MisAlquileres />
            )}
            {window.location.pathname === "/area-privada/login" && <Login />}
        </>
    );
};

export default AreaPrivada;
