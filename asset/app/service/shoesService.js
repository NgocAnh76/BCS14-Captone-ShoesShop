function getListAPI() {
  return axios({
    method: "get",
    url: "https://shop.cyberlearn.vn/api/Product",
    // nếu kh ghi mặc định là Json
  });
}
// tìm kiếm
// function searchChoe(valueSearch) {
//   axios.get("https://shop.cyberlearn.vn/api/Product").then((response) => {
//     const products = response.data.content;
//     const filterProduct = products.filter((product) => {
//       return product.name.toLowerCase().includes(valueSearch.toLowerCase());
//     });
//     // return filterProduct;
//     console.log(filterProduct);
//   });
// }

//get detail
function getProduct(id) {
  return axios({
    method: "get",
    url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
  });
}

// post register
function postRegister(clientObj) {
  return axios({
    method: "post",
    url: "https://shop.cyberlearn.vn/api/Users/signup",
    // responseType: JSON,
    data: clientObj,
  });
}

export { getListAPI, getProduct, postRegister };
