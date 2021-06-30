import { postData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function updateCartItems(items, cartId) {
  let response;
  const formData = new FormData();
  formData.append("items", items);
  formData.append("cart_id", cartId);
  response = await postData(baseUrl + "update_cart_items.php", formData);

  return response;
}

export default updateCartItems;
