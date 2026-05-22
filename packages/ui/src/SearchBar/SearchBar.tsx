import { memo, PropsWithChildren } from "react";
import S from "./SearchBar.module.css";
import { Button } from "../Button";

// Definimos una interfaz para las props del componente SearchBar (Francisca)
export interface SearchBarProps extends PropsWithChildren<
    React.HTMLAttributes<HTMLDivElement>
> {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    handleSearch: () => void;
    loading: boolean;
}

// Componentes siempre con "memo", para evitar renders innecesarios (Francisca)
export const SearchBar = memo(
    ({
        searchTerm,
        setSearchTerm,
        handleSearch,
        loading,
        className,
        ...attrs
    }: SearchBarProps) => {
        return (
            <div className={`${S["mis-alquileres-buscador"]}`}>
                <input
                    type="text"
                    className={`${S["buscador-input"]}`}
                    placeholder="Busca por dirección o departamento"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <Button
                    className={`${S["btn-asociar"]}`}
                    onClick={handleSearch}
                    disabled={loading}
                >
                    {loading ? "Buscando..." : "Buscar"}
                </Button>
            </div>
        );
    },
);

// Asignamos un displayName para facilitar la depuración en React DevTools (Francisca)
SearchBar.displayName = "SearchBar";
