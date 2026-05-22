const API_URL = "https://dummy-api.asaldana.workers.dev/api";

// Definición de tipos (Francisca)
export interface Listing {
    id: string;
    address: {
        street: string;
        city: string;
        province: string;
        postal_code: string;
        country: string;
    };
    description: string;
    images: string[];
    price: number;
    room_count: number;
    bathroom_count: number;
    area: number;
    published: boolean;
}

export const ListingsService = {
    // Método para obtener listings privados del cliente (Francisca)
    getCustomerListings: async (
        token: string,
        search?: string,
    ): Promise<Listing[]> => {
        const url = new URL(`${API_URL}/customer/listings`);

        // Si existe el parámetro search, lo añadimos a la query string (Francisca)
        if (search) url.searchParams.append("search", search);

        const response = await fetch(url.toString(), {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            const errorData = {
                status: response.status,
                message: "Error en la petición de listings",
            };

            if (response.status === 401) errorData.message = "Sesión expirada";
            if (response.status === 503)
                errorData.message = "Servicio no disponible";

            throw errorData;
        }

        return response.json();
    },

    // Método para obtener listings públicos (Francisca)
    getPublicListings: async (search?: string): Promise<Listing[]> => {
        const url = new URL(`${API_URL}/public/listings`);

        // Si existe el parámetro search, lo añadimos a la query string (Francisca)
        if (search) {
            url.searchParams.append("search", search);
        }

        const response = await fetch(url.toString(), {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            const error: any = new Error(
                "Error al obtener las viviendas públicas",
            );
            error.status = response.status;
            throw error;
        }

        return response.json();
    },
};
