import SignUp from "../../components/SignUp/SignUp";
import { Redirect } from "react-router";
import { useUser } from "../../contexts/UserContext";

const SignUpPage = () => {
  const user = useUser();

  if (user?.role) return <Redirect to="/" />;

  return <SignUp />;
};

export default SignUpPage;
