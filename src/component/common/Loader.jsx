import React from "react";
import logo1 from "../../add-on/assets/images/miniLogo.jpg";

const Loader = ({ isLoading }) => {
  return (
    <div id="overlayer" style={{ display: !isLoading && "none" }}>
      <img src={logo1} alt="Logo" className="spin" />

      <div class="loader">
        <span class="loader-inner"></span>
      </div>
    </div>
  );
};

export default Loader;
