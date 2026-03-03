import LoginForm from "@/components/modules/Auth/LoginForm"

interface LoginParams {
  searchParams: Promise<{ redirect?: string }>;
}
const LoginPage = () => {
  return (
    <LoginForm/>
  )
}

export default LoginPage