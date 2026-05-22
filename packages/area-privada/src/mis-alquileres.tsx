import { useEffect, useState, useCallback, useMemo } from "react";
import Cookies from "js-cookie";
import { useAuth } from "./context/AuthContext";
import { ListingsService, Listing } from "./services/listings.service";
import "./mis-alquileres.css";
import { PropiedadCard, HeroSection, Button, SearchBar } from "@repo/ui";

const MisAlquileres = () => {
    const {
        isAuthenticated,
        isLoading: authLoading,
        refreshSession,
    } = useAuth();

    // Estados para listados, búsqueda, carga y errores (Francisca)
    const [allListings, setAllListings] = useState<Listing[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Gestion de favoritos (Francisca)
    const [favorites, setFavorites] = useState<string[]>(() => {
        const saved = localStorage.getItem("alquileres_favoritos");
        return saved ? JSON.parse(saved) : [];
    });

    // Sincronizar localStorage cada vez que cambie el array de favoritos (Francisca)
    useEffect(() => {
        localStorage.setItem("alquileres_favoritos", JSON.stringify(favorites));
    }, [favorites]);

    // Función para asignar favoritos (Francisca)
    const toggleFavorite = (id: string) => {
        setFavorites((prev) =>
            prev.includes(id)
                ? prev.filter((favId) => favId !== id)
                : [...prev, id],
        );
    };

    // Lógica de filtrado memoizada (se ejecuta solo si cambian los datos o la query) (Francisca)
    const filteredListings = useMemo(() => {
        if (!searchQuery) return allListings;

        const searchLower = searchQuery.toLowerCase();
        return allListings.filter((item) => {
            const addressString = Object.values(item.address)
                .join(" ")
                .toLowerCase();
            const description = item.description.toLowerCase();
            return (
                addressString.includes(searchLower) ||
                description.includes(searchLower)
            );
        });
    }, [allListings, searchQuery]);

    const loadData = useCallback(async () => {
        if (authLoading) return;

        setLoading(true);
        setError(null);

        try {
            const token = Cookies.get("auth_token");

            // Ejecución en paralelo de ambas APIs (Francisca)
            const fetchPrivate = async (): Promise<Listing[]> => {
                if (!isAuthenticated || !token) return [];
                try {
                    // Listings privados
                    return await ListingsService.getCustomerListings(token);
                } catch (err: any) {
                    if (err.status === 401) {
                        const newToken = await refreshSession();
                        if (newToken)
                            return await ListingsService.getCustomerListings(
                                newToken,
                            );
                    }
                    return [];
                }
            };

            const [privateData, publicData] = await Promise.all([
                fetchPrivate(),
                ListingsService.getPublicListings(),
            ]);

            // Combinar y eliminar duplicados (Francisca)
            const combined = [...privateData, ...publicData];
            const uniqueListings = Array.from(
                new Map(combined.map((item) => [item.id, item])).values(),
            );

            setAllListings(uniqueListings);
        } catch (err: any) {
            setError(err.message || "Error al cargar los datos");
        } finally {
            setLoading(false);
        }
    }, [authLoading, isAuthenticated, refreshSession]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    // Función para disparar la búsqueda (Francisca)
    const handleSearch = () => {
        setSearchQuery(searchTerm);
    };

    // Renders de estado (Francisca)

    // Carga inicial (Francisca)
    if (loading && allListings.length === 0)
        return <HeroSection title="Cargando tus alquileres..."></HeroSection>;

    // Si hubo un fallo, mostramos la UI de error con opciones de recuperación (Francisca)
    if (error) {
        return (
            <HeroSection
                title="Algo no ha ido bien"
                message={error}
                primaryAction={{
                    label: "Reintentar",
                    onClick: () => window.location.reload(),
                }}
                secondaryAction={{
                    label: "Ir al área privada",
                    onClick: () => (window.location.href = "/area-privada"),
                }}
            />
        );
    }

    // Renderizado principal: Interfaz de búsqueda, resultados y listado (Francisca)
    return (
        <div className="mis-alquileres">
            <div className="area-privada-header">
                <Button
                    onClick={() => (window.location.href = "/area-privada")}
                    variant="outline"
                >
                    Área Privada
                </Button>
            </div>
            {/* Buscador*/}
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
                loading={loading}
            />

            {/* Toolbar: Número de resultados */}
            <div className="mis-alquileres-toolbar">
                <p className="resultado-count">
                    {loading ? (
                        "Actualizando resultados..."
                    ) : (
                        <>
                            Resultado:{" "}
                            <strong>{filteredListings.length} Listados</strong>
                        </>
                    )}
                </p>
            </div>

            {/* Grid de propiedades*/}
            {filteredListings.length > 0 ? (
                <div className="propiedades-grid">
                    {filteredListings.map((listing) => (
                        <PropiedadCard
                            key={listing.id}
                            propiedad={listing}
                            isFavorite={favorites.includes(listing.id)}
                            onToggleFavorite={() => toggleFavorite(listing.id)}
                        />
                    ))}
                </div>
            ) : (
                // Si no hay resultados, mostramos un mensaje con opción de limpiar búsqueda (Francisca)
                !loading && (
                    <HeroSection
                        title="No hay resultados"
                        message={`No hemos encontrado nada para "${searchQuery}"`}
                        primaryAction={{
                            label: "Limpiar búsqueda",
                            onClick: () => {
                                setSearchTerm("");
                                setSearchQuery("");
                            },
                        }}
                    />
                )
            )}

            {error && <div className="error-toast">{error}</div>}
        </div>
    );
};

export default MisAlquileres;
