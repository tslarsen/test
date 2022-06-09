const context = cast.framework.CastReceiverContext.getInstance();
const playerManager = context.getPlayerManager();

console.log("Hey there");

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
