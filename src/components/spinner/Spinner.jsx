import React from "react";
import spinnerimg from "../../assests/loading.gif";
const Spinner = () => {
  return (
    <>
      <img src={spinnerimg} alt="" className="d-block m-auto" style={{width:"200px"}}/>
    </>
  );
};

export default Spinner;
