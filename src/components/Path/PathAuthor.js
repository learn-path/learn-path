import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, getVal } from "react-redux-firebase";

const enhance = compose(
  firestoreConnect(props => {
    return [
      {
        collection: "users",
        doc: props.id
      }
    ];
  }),
  connect(({ firebase: { auth }, firestore }, props) => {
    if (!props) return {};
    return {
      auth,
      firestore,
      id: props.id,
      author: getVal(firestore, `data/users/${props.id}`)
    };
  })
);

const PathAuthor = ({ author }) => {
  if (!author) return "";
  return (
    <div className="user-profile">
      <span>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            width: 60,
            height: 60,
            borderRadius: "50%",
            overflow: "hidden",
            userSelect: "none"
          }}
        >
          <img
            alt="LOGOUT"
            src={author.photoURL}
            style={{
              width: "100%",
              height: "100%",
              textAlign: "center",
              objectFit: "cover"
            }}
          />
        </div>{" "}
      </span>
      <div className="user-profile-body">
        <h3>{author.displayName}</h3>
        <p>{author.short_desc}</p>
      </div>
    </div>
  );
};

export default enhance(PathAuthor);
