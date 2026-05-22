import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@repo/ui";

const meta: Meta<typeof Button> = {
    title: "UI/Button",
    component: Button,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["primary", "outline"],
            description: "Visual variant of the button",
        },
        children: {
            control: "text",
            description: "Button content",
        },
        className: {
            control: "text",
            description: "Optional CSS class name",
        },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        variant: "primary",
        children: "Text",
    },
};

export const Outline: Story = {
    args: {
        variant: "outline",
        children: "Text",
    },
};
