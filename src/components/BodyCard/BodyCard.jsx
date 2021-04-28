import React from "react";
import { Card } from "react-bootstrap";
import "./BodyCard.css";

import { useHistory } from "react-router";

const BodyCard = (props) => {
  const { transfort, img, id } = props.transfort;

  const history = useHistory();

  const hendelRides = (id) => {
    const url = `/transFort/${id}`;
    history.push(url);
  };
  return (
    <div className="col-md-3 mt-5 body-card-container">
      <Card className="card-wrapper shadow">
        <div className="img-container">
          <Card.Img variant="top" src={img} />
        
        </div>

        <Card.Body onClick={() => hendelRides(id)} className="card-button card-Body">
          <Card.Title  className="  text-center text-light">

            {transfort}
          </Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BodyCard;
