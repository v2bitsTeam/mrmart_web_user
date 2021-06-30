import { postData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function fetchCartItems(userId) {
  let response;
  const formData = new FormData();
  formData.append("uid", userId);
  response = await postData(baseUrl + "get_current_cart_uid.php", formData);
  if (response.status) {
    return response.data;
  }
  return null;
}

export default fetchCartItems;
