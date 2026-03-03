/* eslint-disable @typescript-eslint/no-explicit-any */
import { loginAction } from "@/app/(commonLayout)/(authRouteGroup)/login/_action"
import AppField from "@/components/shared/form/AppField"
import AppSubmitButton from "@/components/shared/form/AppSubmitButton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
                    onClick={() => {
                        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
                        window.location.href = `${baseUrl}/auth/login/google`;
                    }}
                >
                    <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
  <path fill="#EA4335" d="M24 9.5c3.4 0 6.5 1.2 8.9 3.5l6.6-6.6C35.5 2.5 30.1 0 24 0 14.6 0 6.6 5.8 2.8 14.1l7.9 6.1C12.7 13.3 17.9 9.5 24 9.5z"/>
  <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-2.7-.4-3.9H24v7.4h12.7c-.3 2-1.7 5-4.7 7l7.3 5.7c4.3-4 6.8-9.9 6.8-16.2z"/>
  <path fill="#FBBC05" d="M10.7 28.2c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C1 16.2 0 19.9 0 23.5s1 7.3 2.8 10.8l7.9-6.1z"/>
  <path fill="#34A853" d="M24 48c6.1 0 11.3-2 15-5.4l-7.3-5.7c-2 1.4-4.6 2.4-7.7 2.4-6.1 0-11.3-3.8-13.3-9.1l-7.9 6.1C6.6 42.2 14.6 48 24 48z"/>
</svg>
                   

                    Sign in with Google

                </Button>
            </CardContent>
            <CardFooter>
                <p>
                    <Link
                </p>
            </CardFooter>
            
     </Card>
    )
}
export default LoginForm