import axios from "axios";

const URL =
  "https://api.timbu.cloud/products?organization_id=f2919a8959de42678ecfee097b92dbad&reverse_sort=false&page=1&size=10&Appid=2JUPEW4GZJ444X5&Apikey=a10504a42558408ab7ca4c0f541a1cd620240713120243519515";

export async function allProducts() {
  const res = await axios.get(URL);

  const data = res.data;
  return data;
}
