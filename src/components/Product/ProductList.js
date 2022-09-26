import React,{useEffect,useState,useCallback} from "react";
import ProductCard  from "./ProductCard";
import {useSelector } from "react-redux";
import InfiniteScroll from 'react-infinite-scroller';
import { api_endpoint } from "../../config";

async function fetchProduct(url,token,search_category_id,search_product_name) {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify( { url:url,
                            apiToken:token,
                            category_id:search_category_id,
                            product_name:search_product_name,
                            rowsPerPage:8
                          }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization':'Bearer '+token
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Could not get product.');
  }
  let links='';
  let products = [];
  if(data.errorCode === 0){
    products = data.data.data;
    links = data.data.next_page_url;
  }
  return {
    links,
    products
  };
}

const Domain = `${api_endpoint}/api/auth/products`;

const ProductList = () =>{
    const [items, setItems] = useState([]);
    const [nextPageUrl, setNextPageUrl] = useState(Domain);
    const [fetching, setFetching] = useState(false);
    const [firstLoad, setfirstLoad] = useState(true);

    const token = useSelector(state=>state.auth.token);
    const search_category_id = useSelector(state=>state.search.category_id);
    const search_product_name = useSelector(state=>state.search.product_name);

    useEffect(()=>{
      if(!firstLoad){
        setItems([]);
        setNextPageUrl(Domain);
      }
      setfirstLoad(false);
    },[search_category_id, search_product_name, firstLoad])

    const fetchItems = useCallback(
      async () => {
        if (fetching) {
          return;
        }

        setFetching(true);

        try {                   
          const { products, links } = await fetchProduct(nextPageUrl,token,search_category_id,search_product_name);
          if(products.length > 0){
            setItems([...items, ...products]);
          }
          if (links) {
            setNextPageUrl(links);
          } else {
            setNextPageUrl(null);
          }
        } finally {
          setFetching(false);
        }
      },
      [items, fetching, nextPageUrl, search_category_id, search_product_name, token]
    );

    const hasMoreItems = !!nextPageUrl;
    const loader = (
      <div key="loader" className="loader">
        Loading ...
      </div>
    );

    return(
        <React.Fragment>
            <InfiniteScroll
               pageStart={0}
               loadMore={fetchItems}
               hasMore={hasMoreItems}
               loader={loader}
               className='row mr-2'
            >
              {
                    items.map((p)=>(
                      <ProductCard product={p} key={p.id}/>
                  ))
              }
            </InfiniteScroll>
            
            
        </React.Fragment>
        
    )
}

export default ProductList;