import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name:'search',
    initialState:{
        category_id:null,
        product_name:null,
    },
    reducers:{
        setCategoryID(state,action){    
          let category = action.payload;
          if(category === 0){
            state.category_id = null;           
          }else{
            state.category_id = category;       
          }
        
        },
        setProductName(state,action){    
            state.product_name = action.payload?action.payload:null;
        },
       
    }
})


export const searchActions = searchSlice.actions;
export default searchSlice.reducer;