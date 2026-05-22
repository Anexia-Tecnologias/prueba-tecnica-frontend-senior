import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
    it("renderiza el contenido del botón", () => {
        render(<Button>Aceptar</Button>);
        expect(
            screen.getByRole("button", { name: "Aceptar" }),
        ).toBeInTheDocument();
    });

    it("renderiza como un elemento <button>", () => {
        render(<Button>Click</Button>);
        const btn = screen.getByRole("button", { name: "Click" });
        expect(btn.tagName).toBe("BUTTON");
    });

    it("pasa atributos HTML adicionales al botón", () => {
        render(
            <Button type="submit" disabled>
                Enviar
            </Button>,
        );
        const btn = screen.getByRole("button", { name: "Enviar" });
        expect(btn).toBeDisabled();
        expect(btn).toHaveAttribute("type", "submit");
    });

    it("aplica className personalizada", () => {
        render(<Button className="custom">Custom</Button>);
        const btn = screen.getByRole("button", { name: "Custom" });
        expect(btn.className).toContain("custom");
    });
});
