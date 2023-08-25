import React, { useState } from 'react';

const TabBar = ({ tabs, defaultTab, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <div className="tab-bar d-flex ">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`tab cursor-pointer  p-3 ${activeTab === tab.id ? 'tab-active px-3 py-3' : ''}`}
          onClick={() => handleTabClick(tab.id)}
        >

          {tab.label}
        </div>
      ))}
    </div>
  );
};

export default TabBar;