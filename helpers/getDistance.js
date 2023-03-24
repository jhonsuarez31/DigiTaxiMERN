

const getDistance = (passengerLat,passengerLon, driverLat, driverLon ) => {
    
    passengerLat = degreesToRadians(passengerLat)
    passengerLon = degreesToRadians(passengerLon)
    driverLat = degreesToRadians(driverLat)
    driverLon = degreesToRadians(driverLon   )

    const EARTH_RADIUS_KM = 6371;
    
    const latitud = (passengerLat - driverLat)
    
    const longitud = ( passengerLon - driverLon)

    let a = Math.pow(Math.sin(latitud / 2.0), 2) + Math.cos(passengerLat) * Math.cos(driverLat) * Math.pow(Math.sin(longitud / 2.0), 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return EARTH_RADIUS_KM * c;

}

const degreesToRadians = (degrees) => {
    return degrees * Math.PI / 180;
};

module.exports ={
    getDistance
}