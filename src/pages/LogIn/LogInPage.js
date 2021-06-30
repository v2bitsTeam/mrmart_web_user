import LogIn from "../../components/LogIn/LogIn";
import { Redirect } from "react-router";
import { useUser } from "../../contexts/UserContext";
import CustomSnackbar from "../../components/CustomSnackbar/CustomSnackbar";

const LogInPage = ({ location }) => {
  const user = useUser();
  let message = location?.state?.message;
  let severity = location?.state?.severity;

  if (user?.role)
    return (
      <Redirect
        to={{
          pathname: "/",
          state: {
            fromLogin: true,
          },
        }}
      />
    );

  return (
    <>
      <LogIn />
      {message && <CustomSnackbar message={message} severity={severity} />}
    </>
  );
};

export default LogInPage;
