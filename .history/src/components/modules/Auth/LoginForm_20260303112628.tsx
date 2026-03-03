import { ILoginPayload } from "@/zod/auth.validation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
const LoginForm = () => {
    const queryClient = useQueryClient()
    const { } = useMutation({
        mutationFn: (payload: ILoginPayload) => 
    })
    return (
        <div>

        </div>
    )
}
export default LoginForm