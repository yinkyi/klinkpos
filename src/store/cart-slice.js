import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        items:[],
        totalQty:0,
        totalPrice:0,
        changed:false
    },
    reducers:{       
        addItemToCart(state,action){debugger;
            state.changed = true;
            const newItem = action.payload;  
            console.log(state.items);
            const existingItem = state.items.find(item => item.id === newItem.id);
            if(!existingItem){
                state.items.push({
                    id:newItem.id,
                    name:newItem.name,
                    image:newItem.image,
                    price:newItem.price,
                    quantity:1,
                    totalPrice:newItem.price,
                    currency:newItem.currency
                });
            }else{
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price
            } 
            
            state.totalQty = state.totalQty +1;
            state.totalPrice= state.totalPrice + newItem.price;
        },
        reduceItemCart(state,action){
            state.changed = true;
            const id = action.payload;  
            const existingItem = state.items.find(item => item.id === id);
            if(existingItem){
                if(existingItem.quantity>1){
                    existingItem.quantity--;
                    existingItem.totalPrice = existingItem.totalPrice - existingItem.price
                }else{
                    state.items = state.items.filter(item=>item.id !== id);
                }

                state.totalQty = state.totalQty - 1 > 0 ? state.totalQty - 1 : 0;
                state.totalPrice= state.totalPrice - existingItem.price > 0 ? state.totalPrice - existingItem.price : 0;
            }
            
        },
        removeItemCart(state,action){
            state.changed = true;
            const id = action.payload;  
            const existingItem = state.items.find(item => item.id === id);
            if(existingItem){                
                state.items = state.items.filter(item=>item.id !== id);
                state.totalQty = state.totalQty - existingItem.quantity > 0 ? state.totalQty - existingItem.quantity : 0;
                state.totalPrice= state.totalPrice - existingItem.totalPrice > 0 ? state.totalPrice - existingItem.totalPrice : 0;
            }
            
        },
        emptyCart(state){
            state.changed = false;
            state.items = [];
            state.totalQty = 0;
            state.totalPrice = 0;
        }
    }
})


export const cartActions = cartSlice.actions;
export default cartSlice.reducer;