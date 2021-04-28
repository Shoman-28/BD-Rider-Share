import React from 'react';
import "./searchRidesResult.css"





const SearchRidesResult = (props) => {
  const { destinationFrom, destinationTo } = props.destination
  const { img, transfort } = props.SelectedTransFortDetails

  return (
    <>
    <div className="destination-detailsContainer row">
      <div className="col-12 text-item-container">
        <h2> {destinationFrom}</h2>
        <h2> {destinationTo}</h2>
      </div>
      
      
          <div className="col-12 find-transfort-container">
            <img src={img} alt="" srcset="" />
            <span>{transfort} </span>
            <span>Price : $40</span>
          </div>
    
      
      <div className="col-12  find-transfort-container">
      <img src={img} alt="" srcset="" />
            <span>{transfort} </span>
            <span>Price : $60</span>

      </div>
      <div className="col-12 find-transfort-container">
      <img src={img} alt="" srcset="" />
            <span>{transfort} </span>
            <span>Price : $50</span>
            
      </div>
     
    </div>
    
    </>
  );
};

export default SearchRidesResult;

