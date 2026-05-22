import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { HeroSection } from "@repo/ui";

const meta: Meta<typeof HeroSection> = {
  title: "UI/HeroSection",
  component: HeroSection,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    title: { control: "text", description: "Título principal" },
    message: { control: "text", description: "Mensaje de cuerpo" },
    className: { table: { disable: true } }, // Ocultamos className si no es necesario tocarlo 
  },
  // Usamos fn() para capturar los clics en el panel de Actions
  args: {
    primaryAction: {
      label: "Empezar ahora",
      onClick: fn(),
      variant: "primary",
    },
  },
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof HeroSection>;

// Historia principal con ambos botones
export const Default: Story = {
  args: {
    title: "Bienvenido a nuestra plataforma",
    message: "La mejor solución para gestionar tus alquileres.",
    secondaryAction: {
      label: "Saber más",
      onClick: fn(),
      variant: "outline",
    },
  },
};

// Historia solo con el botón primario
export const OnlyPrimaryAction: Story = {
  args: {
    title: "¡Únete a la comunidad!",
    message: "Regístrate hoy mismo y obtén acceso exclusivo.",
    secondaryAction: undefined,
  },
};

// Historia con un mensaje muy largo para probar diseño 
export const LongContent: Story = {
  args: {
    title: "Un título extremadamente largo para probar cómo se comporta el componente en pantallas pequeñas",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    secondaryAction: {
      label: "Cancelar",
      onClick: fn(),
      variant: "outline",
    },
  },
};