import { getData, postData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function fetchProducts(selectedCategory) {
  let response;
  if (selectedCategory) {
    const formData = new FormData();
    formData.append("cid", selectedCategory);
    response = await postData(
      baseUrl + "get_products_by_categoryId.php",
      formData
    );
  } else {
    response = await getData(baseUrl + "get_all_products.php");
  }
  if (response.status) {
    return response.data;
  }
  return null;
}

export default fetchProducts;
