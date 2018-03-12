import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { isLoaded, isEmpty } from "react-redux-firebase";

const Todos = ({ todos }) => {
  const todosList = !isLoaded(todos)
    ? "Loading"
    : isEmpty(todos)
      ? "Todo list is empty"
      : Object.keys(todos).map((key, id) => (
          <li key={key}>{todos[key].name}</li>
        ));
  return (
    <div>
      <h2>TODOS</h2>
      <ul>{todosList}</ul>
    </div>
  );
};

export default Todos;
