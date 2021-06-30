import { postData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function addToCart(productId, userId, quantity) {
  const formData = new FormData();
  formData.append("pid", productId);
  formData.append("uid", userId);
  formData.append("items", quantity);
  const response = await postData(baseUrl + "add_to_cart.php", formData);
  console.log(response);
  return response;
}

export default addToCart;
