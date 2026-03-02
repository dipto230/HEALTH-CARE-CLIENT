import { Label } from "@/components/ui/label";
import type { AnyFieldApi } from "@tanstack/react-form"
import React from "react";

type AppFieldProps = {
    field: AnyFieldApi;
    label: string;
    type?: "text" | "email" | "password" | "number";
    placeholder?: string;
    append?: React.ReactNode;
    prepend?: React.ReactNode;
    className?: string;
    disabled?: boolean;

}

const AppField = ({
    field,
    label,
    type="text",
    placeholder,
    append,
    prepend,
    className,
    disabled = false,
}: AppFieldProps) => {
    return (
        <div className={cn("space-y-1.5", className)}>
            <Label htmlFor={field.name} className={cn}>

            </Label>

        </div>

    )
}

export default AppField

