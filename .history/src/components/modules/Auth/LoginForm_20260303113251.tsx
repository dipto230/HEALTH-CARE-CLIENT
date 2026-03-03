import { loginAction } from "@/app/(commonLayout)/(authRouteGroup)/login/_action"
import { ILoginPayload } from "@/zod/auth.validation"
import { useForm } from "@tanstack/react-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
const LoginForm = () => {
    const queryClient = useQueryClient()

    const [serverError, setServerError] = useState(null)
    const {mutateAsync , isPending } = useMutation({
        mutationFn: (payload: ILoginPayload) => loginAction(payload),
    })
    const form = useForm({
        defaultValues: {
            email: "",
            password:"",
        },
        onSubmit: async ({ value }) => {
            try {
                const result = await mutateAsync(value);
                if (result.success) {
                    
                }
            } catch (error) {
                
            }
        }
    })
    return (
        <div>

        </div>
    )
}
export default LoginForm