import React, { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { travleContext } from '../../App';
import "./FindRiders.css";
import { useForm } from "react-hook-form";
import SearchRidesResult from './SearchRidesResult/SearchRidesResult';


const FindRiders = () => {
  const [destination, setDestination] = useState("")
  const [transFort] = useContext(travleContext)
  const { key } = useParams()


  const SelectedTransFortDetails = transFort.find(x => x.id == key)

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    setDestination(data)

  }
  const searchBackgroundColor = {
    backgroundColor: "rgba(11, 12, 12, 0.863)",
    borderRadius: "10px"
  }
  const searchBackgroundResultcolor = {
    backgroundColor: "gray",
    borderRadius: "10px"
  }


  return (
    <div className="container">
      <div className="row">
        <div style={!destination ? searchBackgroundColor : searchBackgroundResultcolor} className="col-sm-10 col-md-4 px-5   form-container-wrapper">

          {!destination ? <form onSubmit={handleSubmit(onSubmit)}>
            <lavel>Pick From</lavel><br />
            <input type="text" name="destinationFrom" id="" ref={register({ required: true })} />
            {errors.destinationFrom && <span className="text-danger">Please give your starting point </span>}<br />
            <lavel>Pick To</lavel><br />
            <input type="text" name="destinationTo" id="" ref={register({ required: true })} />
            {errors.destinationTo && <span className="text-danger">Please give your Ending point </span>}<br />
            <input type="submit" value="Search riders" />
          </form>
            : <>
              <SearchRidesResult SelectedTransFortDetails={SelectedTransFortDetails} destination={destination}></SearchRidesResult>

            </>
          }
        </div>
        <div className="col-md-7 d-flex justify-content-center align-items-center mt-5 ">

         
        </div>
      </div>
    </div>
  );
};

export default FindRiders;