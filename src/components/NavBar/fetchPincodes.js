import { getData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";

async function fetchPincodes() {
  let response;
  response = await getData(baseUrl + "get_pincodes.php");

  if (response.status) {
    return response.data;
  }
  return null;
}

export default fetchPincodes;
