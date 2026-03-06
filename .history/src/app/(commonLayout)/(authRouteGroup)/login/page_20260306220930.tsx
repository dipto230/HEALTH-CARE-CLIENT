import LoginForm from "@/components/modules/Auth/LoginForm";

interface LoginParams {
  searchParams: {
    redirect?: string;
  };
}

const LoginPage = ({ searchParams }: LoginParams) => {
  const redirectPath = searchParams?.redirect;

  return <LoginForm redirectPath={redirectPath} />;
};

export default LoginPage;
