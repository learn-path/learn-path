import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, getVal } from "react-redux-firebase";
import PathCard from "./PathCard";

const enhance = compose(
  firestoreConnect(props => {
    return [
      {
        collection: "paths",
        doc: props.pathToLoad.id
      }
    ];
  }),
  connect(({ firebase: { auth }, firestore }, props) => {
    if (!props) return {};
    return {
      auth,
      firestore,
      id: props.pathToLoad.id,
      loadedPath: getVal(firestore, `data/paths/${props.pathToLoad.id}`, {})
    };
  })
);

const SubscribedPathItem = ({ loadedPath, toggleBlock, id }) => {
  const path = loadedPath ? loadedPath : {};
  return <PathCard id={id} path={path} />;
};

export default enhance(SubscribedPathItem);
