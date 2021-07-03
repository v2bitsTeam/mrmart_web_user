import { postData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function userSignUp(formData) {
  const response = await postData(baseUrl + "register_new.php", formData);
  console.log(response);
  return response;
}

export default userSignUp;
