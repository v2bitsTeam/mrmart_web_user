import { postData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function sendPasswordMail(mobile) {
  const formData = new FormData();
  formData.append("mobile", mobile);
  const response = await postData(baseUrl + "forgotpassword.php", formData);

  return response;
}

export default sendPasswordMail;
