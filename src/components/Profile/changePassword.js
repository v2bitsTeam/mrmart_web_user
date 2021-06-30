import { postData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function changePassword(userId, oldPswd, newPswd) {
  const formData = new FormData();
  formData.append("uid", userId);
  formData.append("oldpassword", oldPswd);
  formData.append("newpassword", newPswd);

  const response = await postData(baseUrl + "update_password.php", formData);
  return response;
}

export default changePassword;
