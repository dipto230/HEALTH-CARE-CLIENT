/* eslint-disable @typescript-eslint/no-explicit-any */
import { loginAction } from "@/app/(commonLayout)/(authRouteGroup)/login/_action"
import AppField from "@/components/shared/form/AppField"
import AppSubmitButton from "@/components/shared/form/AppSubmitButton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ILoginPayload, loginZodSchema } from "@/zod/auth.validation"
import { useForm } from "@tanstack/react-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const LoginForm = () => {
    const queryClient = useQueryClient()

    const [serverError, setServerError] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false);
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
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                    Welcome Back
                </CardTitle>
                <CardDescription>
                    Please enter your credentials to log in
                </CardDescription>

            </CardHeader>
            <CardContent>
                <form
                    method="POST"
                    action="#"
                    noValidate
                    onSubmit={
                        (e) => {
                            e.preventDefault()
                            e.stopPropagation();
                            form.handleSubmit()

                        }
                    }
                    className="space-y-4"
                >
                    <form.Field
                        name="email"
                        validators={{onChange: loginZodSchema.shape.email}}
                    >
                        {
                            (field) => (
                                <AppField
                                    field={field}
                                    label="Email"
                                    type="email"
                                    placeholder="Enter your email"
                                />
                            )
                        }

                    </form.Field>
                    <form.Field
                        name="password"
                        validators={{ onChange: loginZodSchema.shape.password }}
                        
                    >
                        {
                            (filed) => (
                                <AppField
                                    field={filed}
                                    label="Password"
                                    type={showPassword? "text":"password"}
                                    placeholder="Enter your password"
                                    aria-label={
                                        showPassword?"Hide Password":"Show Password"
                                    }
                                    append={
                                        <Button
                                            onClick={() => setShowPassword((value) => !value)}
                                            variant="ghost"
                                            size="icon"

                                        >
                                            {showPassword? <EyeOff className="size-4" aria-hidden="true"/> : <Eye className="size-4" aria-hidden="true"/>}
                                            </Button>
                                    }

                                />
                            )
                        }

                    </form.Field>

                    <div className="text-right mt-2">
                        <Link
                            href="/forgot-password"
                            className="text-sm text-primary hover:underline underline-offset-4"
                        >
                            Forgot Password
                        </Link>
                    </div>

                    {serverError && (
                        <Alert variant={"destructive"}>
                            <AlertDescription>
                                {serverError}
                            </AlertDescription>

                        </Alert>
                    )}

                    <form.Subscribe
                        selector={(s)=>[s.canSubmit, s.isSubmitting] as const}
                    >
                        {
                            ([canSubmit, isSubmitting]) => (
                                <AppSubmitButton
                                    isPending={isSubmitting}
                                    disabled={!canSubmit}
                                >
                                    Log in

                                </AppSubmitButton>
                            )
                        }

                    </form.Subscribe>

                </form>

                <div className="relative my-6">
                    <div className="absolute inset-0  flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">
                            Or Continue With
                        </span>

                    </div>
                </div>
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={()=>{}}
                >
                    <svg><path d="M23.4 46.9c-12.5 0-23-10.2-23-22.7s10.5-22.7 23-22.7c6.9 0 11.9 2.7 15.6 6.3l-4.4 4.4c-2.7-2.5-6.3-4.4-11.2-4.4C14.2 7.7 7.1 15 7.1 24.2c0 9.1 7.1 16.5 16.3 16.5 5.9 0 9.3-2.4 11.5-4.5 1.8-1.8 2.9-4.3 3.4-7.8H23.5v-6.2h20.7c.2 1.1.3 2.4.3 3.9 0 4.7-1.3 10.4-5.4 14.5-3.9 4.1-9 6.3-15.7 6.3zm52.7-14.6c0 8.4-6.6 14.6-14.7 14.6s-14.7-6.2-14.7-14.6c0-8.5 6.6-14.6 14.7-14.6 8.1-.1 14.7 6.1 14.7 14.6zm-6.4 0c0-5.3-3.8-8.9-8.3-8.9-4.4 0-8.3 3.6-8.3 8.9 0 5.2 3.8 8.9 8.3 8.9 4.5-.1 8.3-3.7 8.3-8.9zm38.3 0c0 8.4-6.6 14.6-14.7 14.6s-14.7-6.2-14.7-14.6c0-8.5 6.6-14.6 14.7-14.6 8.1-.1 14.7 6.1 14.7 14.6zm-6.5 0c0-5.3-3.8-8.9-8.3-8.9-4.4 0-8.3 3.6-8.3 8.9 0 5.2 3.8 8.9 8.3 8.9 4.5-.1 8.3-3.7 8.3-8.9zm37-13.8v26.3c0 10.8-6.4 15.2-13.9 15.2-7.1 0-11.4-4.8-13-8.6l5.6-2.3c1 2.4 3.4 5.2 7.4 5.2 4.8 0 7.8-3 7.8-8.6v-2.1h-.2c-1.4 1.8-4.2 3.3-7.7 3.3-7.3 0-14-6.4-14-14.6 0-8.3 6.7-14.7 14-14.7 3.5 0 6.3 1.6 7.7 3.3h.2v-2.4h6.1zm-5.7 13.8c0-5.2-3.4-8.9-7.8-8.9s-8.1 3.8-8.1 8.9c0 5.1 3.7 8.8 8.1 8.8 4.4 0 7.8-3.7 7.8-8.8zm16-29.2V46h-6.2V3.1h6.2zm24.9 34l5 3.3c-1.6 2.4-5.5 6.5-12.2 6.5-8.3 0-14.5-6.4-14.5-14.6 0-8.7 6.3-14.6 13.8-14.6 7.6 0 11.3 6 12.5 9.3l.7 1.7-19.6 8.1c1.5 2.9 3.8 4.4 7.1 4.4s5.5-1.7 7.2-4.1zm-15.3-5.3l13.1-5.4c-.7-1.8-2.9-3.1-5.4-3.1-3.4 0-7.9 2.9-7.7 8.5z" /><path fill="none" d="M0 1h180v59.5H0z" /></svg>

                    Sign in with Google

                </Button>
            </CardContent>
            
     </Card>
    )
}
export default LoginForm