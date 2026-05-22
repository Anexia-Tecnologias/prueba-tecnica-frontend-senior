import "./mis-alquileres.css";

const propiedadesData = [
    {
        id: 1,
        imagen: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
        titulo: "Calle Antonio de nebrija, SEVILLA",
        descripcion:
            "Condominio en el centro de la ciudad de 50 m2, dispone de 1 dormitorio",
        precio: 1400,
        publicado: true,
    },
    {
        id: 2,
        imagen: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
        titulo: "Calle Antonio de nebrija, SEVILLA",
        descripcion:
            "Condominio en el centro de la ciudad de 50 m2, dispone de 1 dormitorio",
        precio: 1400,
        publicado: true,
    },
    {
        id: 3,
        imagen: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
        titulo: "Calle Antonio de nebrija, SEVILLA",
        descripcion:
            "Condominio en el centro de la ciudad de 50 m2, dispone de 1 dormitorio",
        precio: 1400,
        publicado: true,
    },
];

export const MisAlquileres = () => {
    return (
        <div className="mis-alquileres">
            <div className="mis-alquileres-buscador">
                <input
                    type="text"
                    className="buscador-input"
                    placeholder="Busca por dirección o departamento"
                />
                <button className="btn-asociar">Buscar</button>
            </div>

            <div className="mis-alquileres-toolbar">
                <p className="resultado-count">
                    Resultado:{" "}
                    <strong>{propiedadesData.length} Listados</strong>
                </p>
            </div>

            <div className="propiedades-grid">
                {propiedadesData.map((propiedad) => (
                    <div key={propiedad.id} className="propiedad-card">
                        <div className="propiedad-imagen">
                            <img
                                src={propiedad.imagen}
                                alt={propiedad.titulo}
                            />
                        </div>
                        <div className="propiedad-info">
                            <h3 className="propiedad-titulo">
                                {propiedad.titulo}
                            </h3>
                            <p className="propiedad-descripcion">
                                {propiedad.descripcion}
                            </p>
                            <div className="propiedad-footer">
                                <span className="badge-publicado">
                                    Publicado
                                </span>
                                <p className="propiedad-precio">
                                    <span className="precio-cantidad">
                                        {propiedad.precio}€
                                    </span>
                                    <span className="precio-periodo">
                                        {" "}
                                        al mes
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MisAlquileres;
