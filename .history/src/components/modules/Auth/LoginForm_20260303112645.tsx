import { loginAction } from "@/app/(commonLayout)/(authRouteGroup)/login/_action"
import { ILoginPayload } from "@/zod/auth.validation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
const LoginForm = () => {
    const queryClient = useQueryClient()
    const { } = useMutation({
        mutationFn: (payload: ILoginPayload) => loginAction(payload),
    })
    return (
        <div>

        </div>
    )
}
export default LoginForm