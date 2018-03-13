import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Todos from "./Todos.component";

export default compose(
  firestoreConnect([{ collection: "todos" }]),
  connect(state => ({
    todos: state.firestore.data.todos
  }))
)(Todos);
