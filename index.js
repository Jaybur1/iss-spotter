const { nextISSTimesForMyLocation } = require("./iss");

//@passTimes - array of objects {duration: number, risetime: timestamp}
nextISSTimesForMyLocation((err, passTimes) => {
  if(err) return err;

  passTimes.forEach(pass => {
    const time = new Date(pass.risetime * 1000)
    
    console.log(`Next pass at ${time.toString()}for ${pass.duration} seconds!`)
  })
});
// -14400
