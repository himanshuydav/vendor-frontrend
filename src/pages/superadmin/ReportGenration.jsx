import React, { useState } from "react";
import ReportContract from "../../component/common/ReportContract";
import TabBar from "../../component/common/TabBar";
import ReportInvoice from "../../component/common/ReportInvoice";
import ReportPayment from "../../component/common/ReportPayment";


const ReportGenration = () => {
  const tabs = [
    { id: 'Purchase Contract', label: 'Purchase Contract' },
    { id: 'Bill', label: 'Bill' },
    { id: 'Payment', label:'Payment' },
  ];

  const [currentTab, setCurrentTab] = useState(tabs[0].id);

  const handleTabChange = (tabId) => {
    setCurrentTab(tabId);
  };



  return (
    <div>
      <TabBar tabs={tabs} defaultTab={currentTab} onTabChange={handleTabChange} />
      {currentTab === 'Purchase Contract' && <ReportContract/>}
      {currentTab === 'Bill' && <ReportInvoice />}
      {currentTab === 'Payment' && <ReportPayment />}
     
    </div>
  );
};

export default ReportGenration;
