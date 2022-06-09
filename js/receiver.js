const context = cast.framework.CastReceiverContext.getInstance();
const playerManager = context.getPlayerManager();

console.log("Hey there");


const ismhm1_0x0D = context.canDisplayType('audio/mp4', ' mhm1.0x0D');
const ismhm1_0x0E = context.canDisplayType('audio/mp4', ' mhm1.0x0E');
const ismhm1_0x12 = context.canDisplayType('audio/mp4', ' mhm1.0x12');
const ismha1_0x0D = context.canDisplayType('audio/mp4', ' mha1.0x0D');
const ismha1_0x0E = context.canDisplayType('audio/mp4', ' mha1.0x0E');
const ismha1_0x12 = context.canDisplayType('audio/mp4', ' mha1.0x12');
const isatmos = context.canDisplayType('audio/mp4; codecs=ec-3; spatialRendering=true');

console.log("------------------");

console.log("Supported format: audio/mp4', ' mhm1.0x0D: " + ismhm1_0x0D);
console.log("Supported format: audio/mp4', ' mhm1.0x0E: " + ismhm1_0x0E);
console.log("Supported format: audio/mp4', ' mhm1.0x12: " + ismhm1_0x12);
console.log("Supported format: audio/mp4', ' mha1.0x0D: " + ismha1_0x0D);
console.log("Supported format: audio/mp4', ' mha1.0x0E: " + ismha1_0x0E);
console.log("Supported format: audio/mp4', ' mha1.0x12: " + ismha1_0x12);
console.log("Supported format: audio/mp4; codecs=ec-3; spatialRendering=true: " + ismhm1_atmos);
console.log("------------------");


if (context.canDisplayType('audio/mp4', ' mhm1.0x0D ')){
  console.log("Supported format: audio/mp4', ' mhm1.0x0D");
}
else{
    console.log("NOT Supported format: audio/mp4', ' mhm1.0x0D");
}

if (context.canDisplayType('audio/mp4', ' mhm1.0x0E ')){
  console.log("Supported format: audio/mp4', ' mhm1.0x0E");
}
else{
  console.log("NOT Supported format: audio/mp4', ' mhm1.0x0E");
}

if (context.canDisplayType('audio/mp4', ' mhm1.0x12 ')){
  console.log("Supported format: audio/mp4', ' mhm1.0x12");
}
else{
    console.log("NOT Supported format: audio/mp4', ' mhm1.0x12");
}

if (context.canDisplayType('audio/mp4; codecs=ec-3; spatialRendering=true')){
  console.log("Supported format: audio/mp4; codecs=ec-3; spatialRendering=true");
}
else{
    console.log("NOT Supported format: audio/mp4; codecs=ec-3; spatialRendering=true");
}

  context.start();
