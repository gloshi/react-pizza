import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    totalPrice: 0,
    items: [],
}

export const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state,action) {
        const findItem = state.items.find(obj => obj.id === action.payload.id)
        if(findItem){
            findItem.count++
        }else {
            state.items.push({
                ...action.payload,
                count: 1
            })
        }
        state.totalPrice = state.items.reduce((sum,obj)=> {
                    return obj.price * obj.count  + sum
                },0)
        
    },
    minusItem(state,action){
        const findItem = state.items.find(obj => obj.id === action.payload)
        if(findItem){
            console.log(findItem)
            findItem.count--
            
        }
    },
    removeItem(state,action)  {
        state.items = state.items.filter(el => el.id !== action.payload)
    },
    clearItem(state)  {
        state.items = []
        state.totalPrice = 0
    },
  },
})


export const { addItem,removeItem,minusItem, clearItem } = cart.actions

export default cart.reducer