const { nextISSTimesForMyLocation } = require("./iss");
const { utcToZonedTime, format } = require("date-fns-tz");

//@passTimes - array of objects {duration: number, risetime: timestamp}
nextISSTimesForMyLocation((err, passTimes) => {
  if (err) return err;

  passTimes.forEach(pass => {
    const time = new Date(pass.risetime * 1000);
    // const date = utcToZonedTime(time, "America/Toronto");
    const timeZone = "America/Toronto";
    const zonedDate = utcToZonedTime(time, timeZone);
    const pattern = "cccccc PP pp zzzz"; //".m.yyy HH:mm:ss.SSS [GMT]Z (z)";
    const output = format(zonedDate, pattern, { timeZone });
    console.log(`Next pass at ${output} for ${pass.duration} seconds!`);
  });
});
