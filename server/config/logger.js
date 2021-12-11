const { createLogger, format, transports } = require("winston");

function something(info) {
  let baseLogMessage = `"@timestamp": "${
    info.timestamp
  }", "level":"${info.level.toUpperCase()}", "message":"${
    info.message
  }", "service":"NatParks"`;

  Object.entries(info).forEach((ent) => {
    const key = ent[0];
    const val = ent[1];
    if (!["level", "message", "timestamp"].includes(key)) {
      if (typeof val === "object") {
        if (Array.isArray(val)) {
          val.forEach((item) => {
            const i = item.dataValues;
            // Object.entries(item.dataValues).forEach((e) => {
            for (let k in i) {
              if (i.hasOwnProperty(k)) {
                i[k] = String(i[k]);
              }
            }
          });
        }
        baseLogMessage += `, "${ent[0]}": ${JSON.stringify(ent[1])}`;
      } else {
        baseLogMessage += `, "${ent[0]}":"${ent[1]}"`;
      }
    }
  });

  // if (info["latency"]) {
  //   baseLogMessage += `, "latency":"${info["latency"]}"`;
  // }
  //
  // if (info["stage"]) {
  //   baseLogMessage += `, "stage":"${info["stage"]}";`;
  // }

  return `{${baseLogMessage}}`;
}

module.exports = createLogger({
  transports: new transports.File({
    filename: "logs/server.log",
    format: format.combine(
      format.timestamp({ format: "YYYY-MM-DDTHH:mm:ss.sssZ" }),
      format.printf((info) => something(info))
    ),
    // format: format.combine(
    //   format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
    //   format.align(),
    //   format.printf(
    //     (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
    //   )
    // ),
  }),
});
