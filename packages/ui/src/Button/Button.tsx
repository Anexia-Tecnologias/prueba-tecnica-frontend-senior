import { memo, PropsWithChildren } from "react";
import S from "./Button.module.css";

// Definimos una interfaz para las props del componente Button (Pepe)
export interface ButtonProps extends PropsWithChildren<
    React.ButtonHTMLAttributes<HTMLButtonElement>
> {
    variant?: "primary" | "outline";
}

// Componentes siempre con "memo", para evitar renders innecesarios (Pepe)
export const Button = memo((props: ButtonProps) => {
    const { children, variant = "primary", ...attrs } = props;
    const { className } = attrs;

    return (
        <button
            {...attrs}
            className={`${S.Button} ${S[variant]} ${className || ""}`}
        >
            {children}
        </button>
    );
});

// Asignamos un displayName para facilitar la depuración en React DevTools (Pepe)
Button.displayName = "Button";
