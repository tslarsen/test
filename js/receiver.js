const context = cast.framework.CastReceiverContext.getInstance();
const playerManager = context.getPlayerManager();

//Media Sample API Values
const SAMPLE_URL = "https://storage.googleapis.com/cpe-sample-media/content.json";
const StreamType = {
  DASH: 'application/dash+xml',
  HLS: 'application/x-mpegurl'
}
const TEST_STREAM_TYPE = StreamType.DASH

// Debug Logger
const castDebugLogger = cast.debug.CastDebugLogger.getInstance();
const LOG_TAG = 'MyAPP.LOG';

// Enable debug logger and show a 'DEBUG MODE' overlay at top left corner.
castDebugLogger.setEnabled(true);

// Show debug overlay
castDebugLogger.showDebugLogs(true);

// Clear log messages on debug overlay
//castDebugLogger.clearDebugLogs();  }

// Set verbosity level for Core events.
castDebugLogger.loggerLevelByEvents = {
  'cast.framework.events.category.CORE': cast.framework.LoggerLevel.INFO,
  'cast.framework.events.EventType.MEDIA_STATUS': cast.framework.LoggerLevel.DEBUG
}

// Set verbosity level for custom tags.
castDebugLogger.loggerLevelByTags = {
    LOG_TAG: cast.framework.LoggerLevel.DEBUG,
};

const ismhm1_0x0D = context.canDisplayType('audio/mp4', ' mhm1.0x0D');
const ismhm1_0x0E = context.canDisplayType('audio/mp4', ' mhm1.0x0E');
const ismhm1_0x12 = context.canDisplayType('audio/mp4', ' mhm1.0x12');
const ismha1_0x0D = context.canDisplayType('audio/mp4', ' mha1.0x0D');
const ismha1_0x0E = context.canDisplayType('audio/mp4', ' mha1.0x0E');
const ismha1_0x12 = context.canDisplayType('audio/mp4', ' mha1.0x12');
const isatmos = context.canDisplayType('audio/mp4; codecs=ec-3; spatialRendering=true');


playerManager.setMessageInterceptor(
  cast.framework.messages.MessageType.LOAD,
  request => {
    castDebugLogger.info(LOG_TAG, 'Intercepting LOAD request');

    // Map contentId to entity
    if (request.media && request.media.entity) {
      request.media.contentId = request.media.entity;
    }

    return new Promise((resolve, reject) => {
      // Fetch repository metadata
      makeRequest('GET', SAMPLE_URL)
        .then(function (data) {
          // Obtain resources by contentId from downloaded repository metadata.
          let item = data[request.media.contentId];
          if(!item) {
            // Content could not be found in repository
            castDebugLogger.error(LOG_TAG, 'Content not found');
            reject();
          } else {
            // Adjusting request to make requested content playable
            request.media.contentType = TEST_STREAM_TYPE;

            // Configure player to parse DASH content
            if(TEST_STREAM_TYPE == StreamType.DASH) {
              request.media.contentUrl = item.stream.dash;
            }

            // Configure player to parse HLS content
            else if(TEST_STREAM_TYPE == StreamType.HLS) {
              request.media.contentUrl = item.stream.hls
              request.media.hlsSegmentFormat = cast.framework.messages.HlsSegmentFormat.FMP4;
              request.media.hlsVideoSegmentFormat = cast.framework.messages.HlsVideoSegmentFormat.FMP4;
            }
            
            castDebugLogger.warn(LOG_TAG, 'Playable URL:', request.media.contentUrl);
            
            // Add metadata
            let metadata = new cast.framework.messages.GenericMediaMetadata();
            metadata.title = item.title;
            metadata.subtitle = item.author;

            request.media.metadata = metadata;

            // Resolve request
            resolve(request);
          }
      });
    });
  });

// Optimizing for smart displays
const touchControls = cast.framework.ui.Controls.getInstance();
const playerData = new cast.framework.ui.PlayerData();
const playerDataBinder = new cast.framework.ui.PlayerDataBinder(playerData);

let browseItems = getBrowseItems();

function getBrowseItems() {
  let browseItems = [];
  makeRequest('GET', SAMPLE_URL)
  .then(function (data) {
    for (let key in data) {
      let item = new cast.framework.ui.BrowseItem();
      item.entity = key;
      item.title = data[key].title;
      item.subtitle = data[key].description;
      item.image = new cast.framework.messages.Image(data[key].poster);
      item.imageType = cast.framework.ui.BrowseImageType.MOVIE;
      browseItems.push(item);
    }
  });
  return browseItems;
}

let browseContent = new cast.framework.ui.BrowseContent();
browseContent.title = 'Up Next';
browseContent.items = browseItems;
browseContent.targetAspectRatio =
  cast.framework.ui.BrowseImageAspectRatio.LANDSCAPE_16_TO_9;

playerDataBinder.addEventListener(
  cast.framework.ui.PlayerDataEventType.MEDIA_CHANGED,
  (e) => {
    if (!e.value) return;

    // Media browse
    touchControls.setBrowseContent(browseContent);

    // Clear default buttons and re-assign
    touchControls.clearDefaultSlotAssignments();
    touchControls.assignButton(
      cast.framework.ui.ControlsSlot.SLOT_PRIMARY_1,
      cast.framework.ui.ControlsButton.SEEK_BACKWARD_30
    );
  });

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


context.start();
