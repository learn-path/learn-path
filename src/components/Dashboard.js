import React from "react";
import MyPaths from "./MyPaths";
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';

var callback = function(key){
 
}

export default () => (
  <div className="container">
    <Tabs
      defaultActiveKey="1"
      onChange={callback}
      renderTabBar={()=><ScrollableInkTabBar />}
      renderTabContent={()=><TabContent />}
    >
      <TabPane tab='Your Paths' key="1">
        <span className="title">Your Paths</span>
        <MyPaths />
      </TabPane>
      <TabPane tab='Subscribed Paths' key="2">
        <span className="title">Subscribed Paths</span>
        <ul>
          <li>Path 1</li>
          <li>Path 2</li>
        </ul>
      </TabPane>
    </Tabs>
    
  </div>
);
