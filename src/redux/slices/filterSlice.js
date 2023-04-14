import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryId: 0,
    pageCount: 1,
    sortType: {
        name: "популярности",
        sort: "rating",
    }
}

export const filter = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setcategoryId(state,action)  {
        state.categoryId = action.payload
    },
    setSortType(state,action)  {
        state.sortType = action.payload
    },
    setPageCount(state,action)  {
      state.pageCount = action.payload
  },
  },
})


export const { setcategoryId,setSortType,setPageCount } = filter.actions

export default filter.reducer