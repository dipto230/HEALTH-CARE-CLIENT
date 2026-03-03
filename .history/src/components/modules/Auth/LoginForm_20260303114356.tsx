/* eslint-disable @typescript-eslint/no-explicit-any */
import { loginAction } from "@/app/(commonLayout)/(authRouteGroup)/login/_action"
import { Card } from "@/components/ui/card"
import { ILoginPayload } from "@/zod/auth.validation"
import { useForm } from "@tanstack/react-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
const LoginForm = () => {
    const queryClient = useQueryClient()

    const [serverError, setServerError] = useState<string | null>(null)
    const {mutateAsync , isPending } = useMutation({
        mutationFn: (payload: ILoginPayload) => loginAction(payload),
    })
    const form = useForm({
        defaultValues: {
            email: "",
            password:"",
        },
        onSubmit: async ({ value }) => {
            setServerError(null);
            try {
              
                const result = await mutateAsync(value) as any;
                

                if (!result.success) {
                    setServerError(result.message || "Login Failed")
                    return 
                    
                }
            } catch (error: any) {
                console.log(`Login Failed : ${error.message}`)
                setServerError(`Login Failed : ${error.message}`)
            }
        }
    })
    return (
        <Card className="w-full max-w-md mx-auto shadow-md">
            
            
     </Card>
    )
}
export default LoginForm