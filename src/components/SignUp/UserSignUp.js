import { postData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function UserSignUp(formData) {
  const response = await postData(baseUrl + "register.php", formData);
  console.log(response);
  return response;
}

export default UserSignUp;
