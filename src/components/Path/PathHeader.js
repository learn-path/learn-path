import React from "react";
import ToggleButton from "react-toggle-button";
import PathRating from "./PathRating";
import Pluralize from "react-pluralize";
import PathAuthor from "./PathAuthor";

const PathHeader = ({
  path,
  editMode,
  setEdit,
  auth,
  togglePrivate,
  isSubscribed,
  toggleSubscribe,
  hasPrivilege,
  setRating,
  my_ratings,
  subscribed
}) => {
  let subscribeButton = isSubscribed ? (
    <button
      className="btn btn-blue btn-large btn-subscribe"
      onClick={toggleSubscribe}
    >
      Unsubscribe
    </button>
  ) : (
    <button
      className="btn btn-blue btn-large btn-subscribe"
      onClick={toggleSubscribe}
    >
      Subscribe
    </button>
  );

  if (!path) return "";
  const myRating = my_ratings ? my_ratings.rating : false;
  return (
    <div className="header">
      <div className="container">
        <div className="path-header" style={{ display: "flex" }}>
          <div className="path-image" />
          <div className="path-header-boddy">
            <span className="path-title">{path.title}</span>
            <span className="path-desc">{path.short_desc}</span>
          </div>
          <div>
            <button className="btn" onClick={setEdit}>
              Edit
            </button>
          </div>
        </div>
        <div className="path-info">
          <div className="ratings">
            <span className="count">
              <Pluralize count={path.numRatings} singular="rating" />
            </span>
            <span className="rate">
              <PathRating
                myRating={myRating}
                publicRating={path.avgRating}
                isReadOnly={!auth.uid}
                onChange={setRating}
              />
            </span>
          </div>
          <span className="subscribers">120,600</span>
          <span className="level">{path.level}</span>
        </div>
        <PathAuthor id={path.author} />
        <div style={{ display: "flex", marginBottom: 10 }}>
          {!hasPrivilege ? (
            ""
          ) : (
            <div style={{ display: "flex" }}>
              <span style={{ marginRight: 20 }}>Public</span>
              <ToggleButton value={!path.private} onToggle={togglePrivate} />
            </div>
          )}
        </div>
        {subscribeButton}
      </div>
    </div>
  );
};

export default PathHeader;
