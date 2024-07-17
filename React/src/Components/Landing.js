import React from 'react'
import Cards from './Cards';
import '../App.css';

const Landing = () => {
  return (
     <>
     <div className="px-4 py-5   text-center Land">
    <div className="col-lg-6 mx-auto  margin Link">
     <h1 className="display-5 fw-bold text-body-emphasis Link  " style={{color: "red"}}> Unlock the Joy of Cooking with Easy Recipes and Delicious Results.</h1>
       
       
    </div>
  </div>
  <Cards/>
     
     </>
  )
}

export default Landing
