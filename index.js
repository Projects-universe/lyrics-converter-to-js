var fs = require('fs');
var parser = require('subtitles-parser-vtt');

var srt = fs.readFileSync('Love.srt','utf8');

var data = parser.fromVtt(srt);

// console.log(data)

const updatedData = data.map(obj => {

  const startTime = obj.startTime.replace(",", ".")
    const endTime = obj.endTime.replace(",", ".")


  const st = startTime.split(":");
  const et = endTime.split(":");
  const startT = +st[0] * 60 * 60 + +st[1] * 60 + +st[2];
  const endT = +et[0] * 60 * 60 + +et[1] * 60 + +et[2];

  return {
    ...obj,
    startTime: startT,
    endTime: endT
  }
})

fs.writeFileSync('./export.js',JSON.stringify(updatedData))

console.log(updatedData)