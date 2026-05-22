import type { Meta, StoryObj } from "@storybook/react";
import { PropiedadCard } from "@repo/ui";

const meta: Meta<typeof PropiedadCard> = {
  title: "UI/PropiedadCard",
  component: PropiedadCard,
  tags: ["autodocs"],
  // Decorador opcional para centrar la card y que no ocupe todo el ancho en Storybook
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    className: {
      control: "text",
      description: "Clase CSS opcional para extender estilos",
    },
  },
} satisfies Meta<typeof PropiedadCard>;

export default meta;
type Story = StoryObj<typeof PropiedadCard>;

// Mock de datos básico para reutilizar
const mockPropiedad = {
  id: "1",
  address: {
    street: "Calle de la Piruleta, 123",
    city: "Madrid",
  },
  description: "Increíble ático luminoso con vistas despejadas y terraza privada. Ideal para parejas o profesionales.",
  price: 1250,
  published: true,
  images: [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1000",
  ],
};

// Historia por defecto: Caso ideal 
export const Default: Story = {
  args: {
    propiedad: mockPropiedad,
  },
};

// Historia: Propiedad no publicada (para ver el estado del footer)
export const NoPublicada: Story = {
  args: {
    propiedad: {
      ...mockPropiedad,
      published: false,
    },
  },
};

// Historia: Sin imágenes (para probar el fallback de la imagen por defecto)
export const SinImagenes: Story = {
  args: {
    propiedad: {
      ...mockPropiedad,
      images: [],
    },
  },
};

// Historia: Texto muy largo (para probar el truncado de 3 líneas que configuramos)
export const DescripcionLarga: Story = {
  args: {
    propiedad: {
      ...mockPropiedad,
      description: "Este es un texto extremadamente largo diseñado para probar la capacidad del componente de truncar el contenido de forma elegante. Debería mostrar un máximo de tres líneas gracias a la propiedad line-clamp de CSS y añadir puntos suspensivos al final para que el diseño no se rompa en el grid de la aplicación.",
    },
  },
};