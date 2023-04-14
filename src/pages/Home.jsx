import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setcategoryId, setPageCount } from "../redux/slices/filterSlice";

import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import { AppContext } from "../App";

const Home = () => {
  const dispatch = useDispatch();

  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sortType);
  const pageCounter = useSelector((state) => state.filter.pageCount);
  // const items = useSelector((state) => state.pizzaSlice);

  const onClickCategoryId = (id) => {
    dispatch(setcategoryId(id));
  };
  const onClickPage = (id) => {
    dispatch(setPageCount(id));
  };

  const { searchValue } = React.useContext(AppContext);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // const [pageCounter, setPageCounter] = React.useState(1);
  // const [categoryId, setCategoryId] = React.useState(0);
  // const [sortType, setSortType] = React.useState({
  //   name: "популярности",
  //   sort: "rating",
  // });

  const getPizzas = async () => {
    setIsLoading(true);

    const order = sortType.sort.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    // await axios.get(
    //   `https://635699c42712d01e14f80386.mockapi.io/pizzas?page=${pageCounter}&limit=8&${search}${category}&sortBy=${sortType.sort.replace(
    //     "-",
    //     ""
    //   )}&order=${order}`
    // ).then(res => {setItems(res.data)
    //   setIsLoading(false)
    // })
    try {
      const res = await axios.get(
        `https://635699c42712d01e14f80386.mockapi.io/pizzas?page=${pageCounter}&limit=8&${search}${category}&sortBy=${sortType.sort.replace(
          "-",
          ""
        )}&order=${order}`
      );
      setItems(res.data);
      
    } catch (error) {
      
      console.log(error)
      alert('Ошибка получения данных')
    } finally {
      setIsLoading(false);
    }
    
  };

  React.useEffect(() => {
    getPizzas();

    // fetch(
    //   `https://635699c42712d01e14f80386.mockapi.io/pizzas?page=${pageCounter}&limit=8&${search}${category}&sortBy=${sortType.sort.replace("-", "")}&order=${order}`
    // )
    //   .then((res) => res.json())
    //   .then((data) => setItems(data))
    //   .finally(setIsLoading(false));
  }, [categoryId, sortType, searchValue, pageCounter]);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onClickCategoryId={onClickCategoryId}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? skeletons
          : items.map((obj) => <PizzaBlock key={obj.id} obj={obj} />)}
      </div>
      <Pagination onChangePage={(number) => onClickPage(number)} />
    </div>
  );
};

export default Home;
