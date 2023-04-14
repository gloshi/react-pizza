import React from "react";

function Categories({ categoryId, onClickCategoryId }) {
  const arrCategories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {arrCategories.map((el, id) => (
          <li
            key={id}
            onClick={() => onClickCategoryId(id)}
            className={categoryId === id ? "active" : ""}
          >
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Categories;
