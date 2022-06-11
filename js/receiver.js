const context = cast.framework.CastReceiverContext.getInstance();
const playerManager = context.getPlayerManager();


// Debug Logger
const castDebugLogger = cast.debug.CastDebugLogger.getInstance();
const LOG_TAG = 'MyReceiverApp';

context.addEventListener(cast.framework.system.EventType.READY, () => {
  if (!castDebugLogger.debugOverlayElement_) {
      // Enable debug logger and show a 'DEBUG MODE' overlay at top left corner.
      castDebugLogger.setEnabled(true);
      // Show debug overlay
      castDebugLogger.showDebugLogs(true);
      // Clear log messages on debug overlay
      castDebugLogger.clearDebugLogs();
  }
});

// Set verbosity level for Core events.
castDebugLogger.loggerLevelByEvents = {
  'cast.framework.events.category.CORE': cast.framework.LoggerLevel.INFO,
  'cast.framework.events.EventType.MEDIA_STATUS': cast.framework.LoggerLevel.DEBUG
}

// Set verbosity level for custom tags.
castDebugLogger.loggerLevelByTags = {
    [LOG_TAG]: cast.framework.LoggerLevel.DEBUG,
};

const ismhm1_0x0D = context.canDisplayType('audio/mp4', ' mhm1.0x0D');
const ismhm1_0x0E = context.canDisplayType('audio/mp4', ' mhm1.0x0E');
const ismhm1_0x12 = context.canDisplayType('audio/mp4', ' mhm1.0x12');
const ismha1_0x0D = context.canDisplayType('audio/mp4', ' mha1.0x0D');
const ismha1_0x0E = context.canDisplayType('audio/mp4', ' mha1.0x0E');
const ismha1_0x12 = context.canDisplayType('audio/mp4', ' mha1.0x12');
const isatmos = context.canDisplayType('audio/mp4; codecs=ec-3; spatialRendering=true');

castDebugLogger.info(LOG_TAG, 'Tonni Test: Supported format: audio/mp4  mhm1.0x0D: ' , ismhm1_0x0D);
castDebugLogger.debug(LOG_TAG, '1111Tonni Test: Supported format: audio/mp4  mhm1.0x0D: ' , ismhm1_0x0D);
castDebugLogger.error(LOG_TAG, '2222Tonni Test: Supported format: audio/mp4  mhm1.0x0D: ' , ismhm1_0x0D);

console.log("------------------");

console.log("Supported format: audio/mp4', ' mhm1.0x0D: " + ismhm1_0x0D);
console.log("Supported format: audio/mp4', ' mhm1.0x0E: " + ismhm1_0x0E);
console.log("Supported format: audio/mp4', ' mhm1.0x12: " + ismhm1_0x12);
console.log("Supported format: audio/mp4', ' mha1.0x0D: " + ismha1_0x0D);
console.log("Supported format: audio/mp4', ' mha1.0x0E: " + ismha1_0x0E);
console.log("Supported format: audio/mp4', ' mha1.0x12: " + ismha1_0x12);
console.log("Supported format: audio/mp4; codecs=ec-3; spatialRendering=true: " + isatmos);
console.log("------------------");

playerManager.setMessageInterceptor(
    cast.framework.messages.MessageType.LOAD,
    request => {
        castDebugLogger.debug(LOG_TAG, 'Intercepting LOAD request');

        return new Promise((resolve, reject) => {
            fetchMediaAsset(request.media.contentId).then(
                data => {
                    let item = data[request.media.contentId];
                    if (!item) {
                        castDebugLogger.error(LOG_TAG, 'Content not found');

                        reject();
                    } else {
                        request.media.contentUrl = item.stream.hls;
                        castDebugLogger.info(LOG_TAG,
                            'Playable URL:', request.media.contentUrl);

                        resolve(request);
                    }
                }
            );
        });
    }
);

context.start();
