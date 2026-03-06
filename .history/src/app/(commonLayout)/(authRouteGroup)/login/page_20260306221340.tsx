import LoginForm from "@/components/modules/Auth/LoginForm";

interface LoginParams {
  searchParams: Promise<{
    redirect?: string;
  }>;
}

const LoginPage = async ({ searchParams }: LoginParams) => {

  const { redirect } = await searchParams;

  return <LoginForm redirectPath={redirect} />;
};

export default LoginPage;
