import { postData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function UserLogin(mobile, password) {
  const formData = new FormData();
  formData.append("mobile", mobile);
  formData.append("password", password);
  const response = await postData(baseUrl + "login.php", formData);
  if (response.status) {
    return response.data[0];
  }
  return response.message;
}

export default UserLogin;
