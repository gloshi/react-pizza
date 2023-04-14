import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { addItem } from "../../redux/slices/cartSlice";

function PizzaBlock({ obj }) {
  const dispatch = useDispatch()
  const cartItem = useSelector(state => state.cart.items.find(el => el.id === obj.id))

  const [activeSize, setActiveSize] = React.useState(0);
  const [activeType, setActiveType] = React.useState(0);

  const typeNames = ["Тонкое", "Традиционное"];
  const addedCount = cartItem ? cartItem.count : 0

  const onClickAdd = () => {
    const item = {
      id: obj.id,
      title: obj.title,
      price: obj.price,
      imageUrl: obj.imageUrl,
      type: typeNames[activeType],
      size: obj.sizes[activeSize],
    };
    dispatch(addItem(item))
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={obj.imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{obj.title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {obj.types.map((el, id) => (
              <li
                key={id}
                onClick={() => setActiveType(id)}
                className={activeType === id ? "active" : ""}
              >
                {typeNames[el]}
              </li>
            ))}
          </ul>
          <ul>
            {obj.sizes.map((el, id) => (
              <li
                key={id}
                onClick={() => setActiveSize(id)}
                className={activeSize === id ? "active" : ""}
              >
                {el} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {obj.price} ₽</div>
          <div onClick={onClickAdd} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span >Добавить</span>
            {addedCount > 0 && <i>{ cartItem.count}</i>}
          </div>
        </div>
      </div>
    </div>
  );
}
export default PizzaBlock;