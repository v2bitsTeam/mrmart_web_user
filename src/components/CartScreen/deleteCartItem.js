import { postData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function deleteCartItem(cartId) {
  let response;
  const formData = new FormData();
  formData.append("cart_id", cartId);
  response = await postData(baseUrl + "delete_cart_item.php", formData);

  return response;
}

export default deleteCartItem;
