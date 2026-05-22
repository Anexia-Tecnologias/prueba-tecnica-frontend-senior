import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import "./login.css";
import { Button } from "@repo/ui";

export const Login = () => {
    const { login, error: authError } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLocalError(null);
        setIsLoading(true);

        // Datos del formulario 
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            // Llamamos a la función login del contexto
            await login(email, password);
            // Si el login es correcto, el AuthProvider actualizará el estado y el index.tsx nos redirigirá a /mis-alquileres
        } catch (err) {
            console.error("Error en el login:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form-wrapper">
                <div className="login-logo">
                    <img
                        src="/assets/logo-low.jpg"
                        alt="Alquiler Seguro Logo"
                    />
                </div>

                <form className="login-form" onSubmit={submit}>
                    <div className="login-field">
                        <label htmlFor="email">Usuario</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            placeholder="Ej:usuario@email.com"
                        />
                    </div>

                    <div className="login-field">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            placeholder="******"
                        />
                    </div>

                    {(authError || localError) && (
                        <div className="login-error-message">
                            {authError || localError}
                        </div>
                    )}

                    <Button
                        type="submit"
                        variant="primary"
                        className="login-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? "Accediendo..." : "Acceder"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;
