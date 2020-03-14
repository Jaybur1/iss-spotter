const { nextISSTimesForMyLocation } = require("./iss_promised");
//const { utcToZonedTime, format } = require("date-fns-tz"); in case working with vagrant

nextISSTimesForMyLocation(data => {
  data.forEach(pass => {
    //console.log(pass.risetime);
    const time = new Date(pass.risetime * 1000);
    //in case working with vagrant uncomment.
    //   const timeZone = "America/Toronto";
    //   const zonedDate = utcToZonedTime(time, timeZone);
    //   const pattern = "cccccc PP pp zzzz"; //".m.yyy HH:mm:ss.SSS [GMT]Z (z)";
    //   const output = format(zonedDate, pattern, { timeZone });
    console.log(
      `Next pass at ${time.toString()} for ${pass.duration} seconds!`
    );
  });
});
