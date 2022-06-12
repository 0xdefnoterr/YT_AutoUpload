const { spawn } = require("child_process");


// makeid for each process

function makeid(length) {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// spanw the bot multiplae time
for (let i = 0; i < 2; i++) {
  const child = spawn("node", ["main.js"]);
  console.log(`${makeid(5)}` + " " + `${child.pid}`);
}
