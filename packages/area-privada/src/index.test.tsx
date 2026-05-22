import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("./login", () => ({
    default: () => <div>Login mock</div>,
}));

vi.mock("./mis-alquileres", () => ({
    default: () => <div>MisAlquileres mock</div>,
}));

import { AreaPrivada } from "./index";

describe("AreaPrivada", () => {
    it("renderiza sin errores", async () => {
        const consoleError = vi
            .spyOn(console, "error")
            .mockImplementation(() => {});

        render(<AreaPrivada />);
        expect(consoleError).not.toHaveBeenCalled();

        consoleError.mockRestore();
    });
});
