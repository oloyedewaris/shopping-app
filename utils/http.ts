import axios from "axios";

const URL =
  "https://api.timbu.cloud/products?organization_id=03c3db909b1f4616a786a4fdf4d7e98c&reverse_sort=false&page=1&size=10&Appid=HIWA8JQD8VXQRXY&Apikey=427bbb3220eb475990086caf7484a50420240704193628397878";

export async function allProducts() {
  const res = await axios.get(URL);

  const data = res.data;
  return data;
}
