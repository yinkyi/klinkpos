import React,{useState} from "react";

export const ProductsContext = React.createContext({
    products:[]
})

export default props=>{
    const[]=useState();
    return <ProductsContext.Provider value={}>{props.children}</ProductsContext.Provider>
}