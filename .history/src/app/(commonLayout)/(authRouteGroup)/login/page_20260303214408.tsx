import LoginForm from "@/components/modules/Auth/LoginForm"

interface LoginParams {
  searchParams: Promise<{ redirect?: string }>;
}
const LoginPage = ({ searchParams }: LoginParams) => {
  
  return (
    <LoginForm/>
  )
}

export default LoginPage