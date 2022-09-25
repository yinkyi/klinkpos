import React,{useEffect,useState} from "react";
import ProductCard  from "./ProductCard";
import useHttp from "../../hooks/use-http";
import {useSelector } from "react-redux";
import {getProducts} from "../../lib/api";
import InfiniteScroll from 'react-infinite-scroll-component';
const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};
const ProductList = () =>{
    const [product,setProduct]=useState([]);
    const token = useSelector(state=>state.auth.token);
    const {sendRequest:sendRequestProduct,data:productData,status:productStatus} = useHttp(getProducts);
    let product_context;

    if(productStatus === "pending"){
        product_context = "Loading Products..."
      }    
      else if(productStatus==="completed" && (productData && productData.length>0)){    
        // dispatch(packSliceActions.setClassPack(classPackData));     
        //category_context = "hey";
        product_context ="found";
        
      }else if(productStatus==="completed" && (!productData && productData.length === 0 )) {
        product_context = <p>No product!!</p>;
      }
    const fetchMoreData = () =>{debugger;
        setTimeout(() => {
            sendRequestProduct({
                apiToken:token
              });
          }, 1500);
          if(productStatus==="completed" && (productData && productData.length>0)){  
            const updatedArr = [...product,productData];  
            setProduct(updatedArr[0]);   
            console.log(product);     
          }
    }
    useEffect(()=>{
        sendRequestProduct({
          apiToken:token
        });
    },[])

    return(
        <React.Fragment>      
             {
                product.map((p)=>(
                    <ProductCard product={p} key={p.id}/>
                ))
            }      
            <InfiniteScroll
              dataLength={product.length}
              next={() => {
                fetchMoreData()
              }}
              hasMore={true}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>No more product...</b>
                </p>
              }
            >
            <div style={{ minHeight: "100vh" }}>
               {
                    product.map((p)=>(
                        <ProductCard product={p} key={p.id}/>
                    ))
                }
            </div>
            </InfiniteScroll>
        </React.Fragment>
        
    )
}

export default ProductList;