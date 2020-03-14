const request = require("request-promise-native");
const { GETIPURL, GETISSURL, GETMYGEOURL } = require("./constance");

const fetchMyIP = () => {
  return request(GETIPURL);
};

const fetchCoordsByIP = ip => {
  return request(GETMYGEOURL + ip);
};

const fetchISSFlyOverTimes = geoObj => {
  return request(`${GETISSURL}lat=${geoObj.lat}&lon=${geoObj.lon}`);
};

const nextISSTimesForMyLocation = callback => {
  fetchMyIP()
    .then(ip => fetchCoordsByIP(JSON.parse(ip).ip))
    .then(coords => {
      const coord = JSON.parse(coords);
      const coordsObj = { lat: coord.data.latitude, lon: coord.data.longitude };
      return fetchISSFlyOverTimes(coordsObj);
    })
    .then(data => {
      const passTimes = JSON.parse(data).response;
      return passTimes;
    })
    .then(passTimes => {
      return callback(passTimes);
    });
};

module.exports = { nextISSTimesForMyLocation };
