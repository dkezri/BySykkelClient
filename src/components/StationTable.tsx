import  {ReactNode, useEffect, useState}  from 'react'
import Table from "react-bootstrap/Table"
import useGeolocation from "../hooks/useGeolocation"
import {Stations} from "../types"
import { Button } from 'react-bootstrap'

type SectionsProps ={
     children: ReactNode
}
export const StationTable = ({children}: SectionsProps) => {

  const tableHeaders=["StationId","Name","Address","Capacity","NumBikesAvailable","NumDocksAvailable"]
  const [stations, SetStations]= useState<Stations[]>([])
  const geolocation= useGeolocation();

  const baseUrl = import.meta.env.VITE_OSLO_BY_SYKKEL_API;
  const stationUrl=`${baseUrl}/stations`;

  const size=stations.length;
  const updateUrl=()=>{
    if(geolocation!==null && geolocation!==undefined ){
     const newUrl=stationUrl+`?latitude=${geolocation.latitude}&longitude=${geolocation.longitude}`;
     console.log(newUrl)
     getStations(newUrl)
    }
  }

  const getStations=(url:string)=>{
    fetch(url)
    .then(response => response.json())
    .then(res => {
      const stationList:Stations[]=res;
      SetStations(stationList)
    })
  }
  useEffect(()=>{
    getStations(stationUrl)
  },[])
  return (
    <div className='t-100px'>
      <br/>
        <div>{children}</div>
        { 
          size>0 && (<span className='totalStations'>Total: {size} stations</span>)
        }
        <Button className="nearstButton" onClick={updateUrl}>The nearest stations</Button>
        <br/>
        <Table className='tableStation' striped bordered hover>
          <thead>
          <tr>
            {tableHeaders.map( item => 
              <th key={item}>{item}</th>
            )
            }
          </tr>
          </thead>
          <tbody>
            {stations && stations.map((station, index) => 
                <tr key={index}>
                  <td> {station.stationId}</td>
                  <td>{station.name}</td>
                  <td>{station.address}</td>
                  <td>{station.capacity}</td>
                  <td>{station.numBikesAvailable}</td>
                  <td>{station.numDocksAvailable}</td>
                </tr>
              )
            }
          </tbody>
        </Table>
    </div>
  );


}
