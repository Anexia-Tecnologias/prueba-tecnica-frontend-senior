import { memo, PropsWithChildren } from "react";
import S from "./PropiedadCard.module.css";
import { StarIcon } from "./StarIcon";

// Definimos una interfaz para las props del componente PropiedadCard (Francisca)
export interface Propiedad {
    id: string;
    address: {
        street: string;
        city: string;
    };
    description: string;
    images: string[];
    price: number;
    published: boolean;
}

export interface PropiedadCardProps extends PropsWithChildren<
    React.HTMLAttributes<HTMLDivElement>
> {
    propiedad: Propiedad;
    isFavorite?: boolean; // Nueva prop para indicar si es favorito (Francisca)
    onToggleFavorite?: () => void; // Nueva prop para manejar el toggle de favorito (Francisca)
}

// Componentes siempre con "memo", para evitar renders innecesarios (Francisca)
export const PropiedadCard = memo(
    ({
        propiedad,
        isFavorite,
        onToggleFavorite,
        className,
        ...attrs
    }: PropiedadCardProps) => {
        const { address, images, description, price, published } = propiedad;
        // Imagen por fecto si no hay imágenes (Francisca)
        const defaultImage =
            "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?q=80&w=1170";

        // Imágenes para galería de miniaturas (Francisca)
        const thumbs = images.slice(0, 3);

        return (
            <div
                {...attrs}
                className={`${S["propiedad-card"]} ${className || ""}`}
            >
                {/* Galería de imágenes */}
                <div className={S["propiedad-galeria"]}>
                    {/* Botón de favoritos */}
                    <button
                        className={`${S["fav-button"]} ${isFavorite ? S["active"] : ""}`}
                        onClick={onToggleFavorite}
                        aria-label={
                            isFavorite
                                ? "Quitar de favoritos"
                                : "Añadir a favoritos"
                        }
                    >
                        {/* Pasamos isFavorite al icono para que cambie de color */}
                        <StarIcon
                            strokeColor={
                                isFavorite ? "#ffffff" : "var(--color-primary)"
                            }
                        />
                    </button>
                    <div className={S["main-image-container"]}>
                        <img
                            src={thumbs[0] || defaultImage}
                            alt={address.street}
                        />
                    </div>

                    {thumbs.slice(1).map((img, index) => (
                        <div key={index} className={S["thumb-image-container"]}>
                            <img src={img} alt={`${address.street} ${index}`} />
                        </div>
                    ))}
                </div>

                <div className={S["propiedad-info"]}>
                    <h3 className={S["propiedad-titulo"]}>
                        {address.street}, {address.city.toUpperCase()}
                    </h3>

                    <p className={S["propiedad-descripcion"]}>{description}</p>

                    <div className={S["propiedad-footer"]}>
                        {published ? (
                            <span className={S["badge-publicado"]}>
                                Publicado
                            </span>
                        ) : (
                            <div></div>
                        )}

                        <p className={S["propiedad-precio"]}>
                            <span className={S["precio-cantidad"]}>
                                {price}€
                            </span>
                            <span className={S["precio-periodo"]}> al mes</span>
                        </p>
                    </div>
                </div>
            </div>
        );
    },
);

// Asignamos un displayName para facilitar la depuración en React DevTools (Francisca)
PropiedadCard.displayName = "PropiedadCard";
