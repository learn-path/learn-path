import React from "react";
import MyPaths from "./MyPaths";
import SubscribedPaths from "./SubscribedPaths";
import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/TabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";
import Profile from "./Profile";
import { compose } from "redux";
import { connect } from "react-redux";

const Dashboard = ({ auth, profile }) => {
  if (!profile.done)
    return (
      <Profile
        message="Hi, let other users know you better"
        profile={profile}
      />
    );
  return (
    <div className="container">
      <Tabs
        defaultActiveKey="1"
        renderTabBar={() => <ScrollableInkTabBar />}
        renderTabContent={() => <TabContent />}
      >
        <TabPane tab="Your Paths" key="1">
          <span className="title">Your Paths</span>
          <MyPaths />
        </TabPane>
        <TabPane tab="Subscribed Paths" key="2">
          <span className="title">Subscribed Paths</span>
          <SubscribedPaths />
        </TabPane>
        <TabPane tab="Your Profile" key="3">
          <span className="title">Your Profile</span>
          <Profile profile={profile} full={true} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default compose(
  connect(({ firebase: { auth, profile } }) => ({ auth, profile }))
)(Dashboard);
