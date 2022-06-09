const context = cast.framework.CastReceiverContext.getInstance();
const playerManager = context.getPlayerManager();

console.log("Hey there");

if (context.canDisplayType('audio/mp4', ' mhm1.0x0D ')){
  console.log("Supported format: audio/mp4', ' mhm1.0x0D");
}
  context.start();
