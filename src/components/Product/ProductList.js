import React,{useEffect} from "react";
import ProductCard  from "./ProductCard";
import useHttp from "../../hooks/use-http";
import {useSelector } from "react-redux";
import {getProducts} from "../../lib/api";

const ProductList = () =>{
    const token = useSelector(state=>state.auth.token);
    const {sendRequest:sendRequestProduct,data:productData,status:productStatus} = useHttp(getProducts);
    let product_context;

    if(productStatus === "pending"){
        product_context = "Loading Products..."
      }    
      else if(productStatus==="completed" && (productData && productData["data"] && productData["data"].length>0)){    
        // dispatch(packSliceActions.setClassPack(classPackData));     
        //category_context = "hey";
        product_context ="found";
        
      }else if(productStatus==="completed" && (!productData && productData["data"].length === 0 )) {
        product_context = <p>No product!!</p>;
      }

    useEffect(()=>{
        sendRequestProduct({
          apiToken:token
        });
    },[])

    return(
        <React.Fragment>
            {product_context === "found" ?
                  productData["data"].map((p)=>(
                    <ProductCard product={p} key={p.id}/>
                )):''
            }
            
        </React.Fragment>
        
    )
}

export default ProductList;