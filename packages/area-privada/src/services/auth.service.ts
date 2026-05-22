const API_URL = "https://dummy-api.asaldana.workers.dev/api";

// Interfaz para la respuesta del login (Francisca)
export interface LoginResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    refresh_expires_in: number;
}

export const authService = {
    // Método para iniciar sesión y obtener tokens (Francisca)
    login: async (email: string, password: string): Promise<LoginResponse> => {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: email,
                password: password,
            }),
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("Credenciales inválidas");
            }
            throw new Error("Error en el servidor");
        }

        return response.json();
    },

    // Método para renovar el token usando el refresh token (Francisca)
    refreshToken: async (token: string): Promise<LoginResponse> => {
        const response = await fetch(`${API_URL}/refresh-token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh_token: token }),
        });

        if (!response.ok) {
            throw new Error(
                "El refresh token es inválido, ha expirado o no es de tipo refresh.",
            );
        }
        return response.json();
    },
};
