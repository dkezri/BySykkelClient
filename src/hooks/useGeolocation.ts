import {useState} from "react";
import {Location} from "../types/index"

const useGeolocation=(): Location=>{
    const [coordination,setCoordination]=useState({});
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
    if (navigator.geolocation) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then(function (result) {
            if (result.state === "granted") {
             navigator.geolocation.getCurrentPosition((data)=>{
              setCoordination(data.coords);
             }, errors, options);
            } else if (result.state === "prompt") {
              navigator.geolocation.getCurrentPosition((data)=>{
                setCoordination(data.coords);
              }, errors, options);
            } else if (result.state === "denied") {
              //If denied then you have to show instructions to enable location
            }
          });
      
    }else {
        console.log("Geolocation is not supported by this browser.");
      }
      const location={
        latitude: coordination.latitude,
        longitude:coordination.longitude

      }
  return  location
}

const errors= (err:any)=> {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

export default useGeolocation;