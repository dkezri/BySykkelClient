export type Location= {
    latitude: number,
    longitude:number,
  };

export type Stations ={
    stationId:string,
    name: string,
    address:string,
    capacity:number,
    numBikesAvailable:number,
    numDocksAvailable:number,
    distance:number
};
