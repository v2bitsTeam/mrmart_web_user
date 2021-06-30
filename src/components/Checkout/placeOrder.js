import { postData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function placeOrder(formData) {
  const response = await postData(baseUrl + "add_order.php", formData);
  return response;
}

export default placeOrder;
