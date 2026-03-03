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
                        <span className="px-2 bg-white "></span>

                    </div>
                </div>
            </CardContent>
            
     </Card>
    )
}
export default LoginForm