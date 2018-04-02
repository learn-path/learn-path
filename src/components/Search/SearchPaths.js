import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import queryString from "query-string";
import SearchResults from "./SearchResults";

export default compose(
  firestoreConnect(props => {
    let query = queryString.parse(props.location.search);
    return [
      {
        collection: "paths",
        where: [
          ["title", "==", query.q],
          ["blocked", "==", false],
          ["private", "==", false]
        ],
        limit: 10,
        orderBy: ["created", "desc"],
        storeAs: "searchResults",
        logListenerError: true
      }
    ];
  }),
  connect(({ firestore }, props) => {
    return {
      searchResults: firestore.ordered.searchResults
    };
  })
)(SearchResults);
