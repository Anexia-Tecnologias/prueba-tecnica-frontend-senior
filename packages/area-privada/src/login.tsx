import "./login.css";
import { Button } from "@repo/ui";

export const Login = () => {
    const submit = (e: React.FormEvent) => {
        // Aquí llamar al api. (Pancho)
    };

    return (
        <div className="login-container">
            <div className="login-form-wrapper">
                <div className="login-logo">
                    <img src="/assets/logo-low.jpg" />
                </div>

                <form
                    className="login-form"
                    action="/area-privada/mis-alquileres"
                    onSubmit={submit}
                >
                    <div className="login-field">
                        <label>Usuario</label>
                        <input type="email" name="usuario" />
                    </div>

                    <div className="login-field">
                        <label>Contraseña</label>
                        <input type="password" name="contrasena" />
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        className="login-btn"
                    >
                        Acceder
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;
