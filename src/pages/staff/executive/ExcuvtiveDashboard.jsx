import React from "react";
import ExcutiveTableTwo from "../../../component/common/ExcutiveTableTwo";
import { Helmet } from "react-helmet";

const ExcuvtiveDashboard = () => {

  return (
    <div>
       <Helmet>
        <title>Vendor Portal || Purchase Contract</title>
      </Helmet>
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Purchase Contracts</h3>
            <ExcutiveTableTwo />

          </div>
        </div>
      </div>
    
  );
};

export default ExcuvtiveDashboard;
