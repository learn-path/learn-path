import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect, getVal } from "react-redux-firebase";
import queryString from "query-string";
import SearchResults from "./SearchResults";

export default compose(
  firestoreConnect(props => {
    let query = queryString.parse(props.location.search);
    console.log(query);
    return [
      {
        collection: "paths",
        where: ["title", "==", query.q],
        limit: 10,
        orderBy: ["created", "desc"]
      }
    ];
  }),
  connect(({ firestore }, props) => {
    return {
      paths: firestore.ordered.paths
    };
  })
)(SearchResults);
