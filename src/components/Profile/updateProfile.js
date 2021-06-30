import { postData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function updateProfile(formData) {
  const response = await postData(baseUrl + "update_profile.php", formData);
  return response;
}

export default updateProfile;
