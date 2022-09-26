import { api_endpoint } from "../config";

const DOMAIN = api_endpoint;

export async function authLogin(requestData) {
  const response = await fetch(`${DOMAIN}/api/auth/login`, {
    method: 'POST',
    body: JSON.stringify(requestData),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login Fail!!.');
  }
 
  return data;
}
export async function logout(requestData) {
  const response = await fetch(`${DOMAIN}/api/auth/logout`, {
    method: 'GET',
    headers: {     
      'Accept': 'application/json',
      'Authorization':'Bearer '+requestData.apiToken
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Logout Fail!!.');
  }

  return data;
}
export async function getCategories(requestData) {
  const response = await fetch(`${DOMAIN}/api/auth/categories`, {
    method: 'POST',
    body: JSON.stringify({
              "rowsPerPage":20
          }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization':'Bearer '+requestData.apiToken
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not get category.');
  }
  let categories=[];
  if(data.errorCode === 0){
    categories = data.data.data;
  }

  return categories;
}
export async function getProducts(requestData) {
  const url = requestData.url?requestData.url:`${DOMAIN}/api/auth/products`;
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
              "category_id":requestData.category_id??requestData.category_id,
              "product_name":requestData.product_name??requestData.product_name,
              "rowsPerPage":8
          }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization':'Bearer '+requestData.apiToken
    },
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Could not get product.');
  }
  let products=[];
  if(data.errorCode === 0){
    products["data"] = data.data.data;
    products["next_page_url"] = data.data.next_page_url;
  }
  return products;
}