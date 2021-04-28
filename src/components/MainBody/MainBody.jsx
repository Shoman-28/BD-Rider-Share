import React, { useContext } from "react";

import { travleContext } from "../../App";
import BodyCard from "../BodyCard/BodyCard";
import "./MainBody.css";

const MainBody = () => {
  const [transFort] = useContext(travleContext);

  return (
    <div className="containerFluid">
      <div className="container main-body-container">
        <div className="row d-flex justify-content-center">
          {transFort?.map((x) => (
            <BodyCard key={x.id} transfort={x}></BodyCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainBody;
