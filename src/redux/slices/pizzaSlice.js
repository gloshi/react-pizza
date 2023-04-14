import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
 " pizza/fetchPizzasStatus",
  async (params) => {
    const {
      order,
        sortBy,
        category,
        search,
        pageCounter
    } = params
    const {data} = await axios.get(
      `https://635699c42712d01e14f80386.mockapi.io/pizzas?page=${pageCounter}&limit=8&${search}${category}&sortBy=${sortBy}&order=${order}`
    );
    return data
  }
)


const initialState = {
    items: [],
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state,action) {
       state.items = action.payload
    },
   
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.products = action.payload;
    })
},
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer