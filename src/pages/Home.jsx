import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import React from 'react';
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../Pagination';
import axios from 'axios'
import qs from 'qs'
import {useNavigate } from 'react-router-dom'
import { SearchContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { Axios } from 'axios';

export const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
    const sortType = useSelector(state => state.filter.sort.sortProperty);

    

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number));
    }
    const { searchValue } = React.useContext(SearchContext);

    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState([true])


    const onClickCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const order = sortType.includes("-") ? "asc" : "desc";
    const sortBy = sortType.replace("-", "");
    const category = categoryId > 0
        ? `category=${categoryId}` : ""

    const search = searchValue
        ? `&search=${searchValue}` : ""

    const fetchPizzas = async () => {
        setIsLoading(true)
    }
        
    
     React.useEffect(() => {
         setIsLoading(true);
         


    axios.get(`https://631f72b922cefb1edc4c3895.mockapi.io/Items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search} `
        )
            .then((res) => {
                setItems(res.data)
                setIsLoading(false);
            })

         console.log(555)
        window.scrollTo(0, 0)
    }, [categoryId, sortType, searchValue, currentPage]);




    React.useEffect(() => {
        const queryString = qs.stringify({
            sortProperty: sort.sortProperty,
            categoryId,
            currentPage,
        });
        navigate(`?${queryString}`)
    }, [categoryId, sortType, searchValue, currentPage])


    const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj} />)
    const Skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)
    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onClickCategory} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading ? Skeletons
                        : pizzas
                }
            </div>
            <Pagination value={currentPage} onChangePage={onChangePage} />
        </div>
    )
}


export default Home;