import type { AnyFieldApi } from "@tanstack/react-form"

type AppFieldProps = {
    field: AnyFieldApi;
    label: string;
    type?: "text" | "email" | "password" | "number";
    
}