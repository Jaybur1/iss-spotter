const { GETIPURL, GETMYGEOURL, GETISSURL } = require("./constance");
const request = require("request");

let currentIp = "207.164.58.134";
let currentGeo;
const fetchMyIP = callback => {
  request(GETIPURL, (err, res, body) => {
    if (err) return callback(err, null);
    if (res.statusCode !== 200) {
      const msg = `Status code ${res.statusCode} when fetching IP. Responce: ${body}`;
      return callback(Error(msg), null);
    }
    const data = JSON.parse(body);
    currentIp = data.ip;
    return callback(err, data.ip);
  });
};

const fetchCoordsByIp = (ip, callback) => {
  if (ip) {
    request(`${GETMYGEOURL}${ip}`, (err, res, body) => {
      if (err) return callback(err, null);
      if (res.statusCode !== 200) {
        const msg = `Status code ${res.statusCode} when fetching GEO location. Responce ${body}`;
        return callback(Error(msg), null);
      }
      const data = JSON.parse(body);
      currentGeo = { lat: data.data.latitude, lon: data.data.longitude };
      return callback(err, currentGeo);
    });
  } else {
    return callback(Error("No ip was found"));
  }
};

const fetchISSFlyOverTimes = (coords, callback) => {
  if (!coords) return callback(Error("no coords"));
  request(
    `${GETISSURL}lat=${coords.lat}&lon=${coords.lon}`,
    (err, res, body) => {
      if (err) return callback(err, null);
      if (res.statusCode !== 200) {
        const msg = `Status code ${res.statusCode} when fetching ISS Fly over location. Responce ${body}`;
        return callback(Error(msg), null);
      }
      const data = JSON.parse(body);
      return callback(err, data);
    }
  );
};

const nextISSTimesForMyLocation = callback => {
  fetchMyIP((err, ip) => {
    if (err) return callback(err, null);
    return fetchCoordsByIp(ip, (err, geo) => {
      if (err) return callback(err, null);
      return fetchISSFlyOverTimes(geo, (err, data) => {
        if (err) return callback(err, null);
        return callback(err,data.response);
      });
    });
  });
};
module.exports = {
  fetchMyIP,
  fetchCoordsByIp,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};
