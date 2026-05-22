import React, { memo } from "react";
import S from "./HeroSection.module.css";
import { Button } from "@repo/ui";

// Definimos interfaces para las props del componente HeroSection (Francisca)
interface ActionButton {
    label: string;
    onClick: () => void;
    variant?: "primary" | "outline";
}

interface HeroSectionProps {
    title: string;
    message?: string;
    primaryAction?: ActionButton;
    secondaryAction?: ActionButton;
    className?: string;
}

export const HeroSection = memo(
    ({
        title,
        message = "",
        primaryAction,
        secondaryAction,
        className = "",
    }: HeroSectionProps) => {
        const hasActions = !!(primaryAction || secondaryAction);

        return (
            <div className={`${S.container} ${className}`}>
                <h2 className={S.title}>{title}</h2>
                <p className={S.message}>{message}</p>

                {hasActions && (
                    <div className={S["buttons-container"]}>
                        {primaryAction && (
                            <Button
                                onClick={primaryAction.onClick}
                                variant={primaryAction.variant || "primary"}
                            >
                                {primaryAction.label}
                            </Button>
                        )}

                        {secondaryAction && (
                            <Button
                                onClick={secondaryAction.onClick}
                                variant={secondaryAction.variant || "outline"}
                            >
                                {secondaryAction.label}
                            </Button>
                        )}
                    </div>
                )}
            </div>
        );
    },
);

// Asignamos un displayName para facilitar la depuración en React DevTools (Francisca)
HeroSection.displayName = "HeroSection";
