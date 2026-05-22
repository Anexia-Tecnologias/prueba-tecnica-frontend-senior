import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { SearchBar } from "@repo/ui";

const meta: Meta<typeof SearchBar> = {
  title: "UI/SearchBar",
  component: SearchBar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    searchTerm: { control: "text", description: "Texto actual en el buscador" },
    loading: { control: "boolean", description: "Estado de carga del botón" },
    setSearchTerm: { action: "setSearchTerm" },
    handleSearch: { action: "handleSearch" },
  },
  args: {
    setSearchTerm: fn(),
    handleSearch: fn(),
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof SearchBar>;

// Historia por defecto
export const Default: Story = {
  args: {
    searchTerm: "",
    loading: false,
  },
};

// Historia con texto ya escrito
export const WithValue: Story = {
  args: {
    searchTerm: "Apartamento en Madrid",
    loading: false,
  },
};

// Historia en estado de carga (bloqueando el botón)
export const Loading: Story = {
  args: {
    searchTerm: "Buscando...",
    loading: true,
  },
};