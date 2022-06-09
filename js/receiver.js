'use strict';



/**
 * Constants to be used for fetching media by entity from sample repository.
 */
const ID_REGEX = '\/?([^\/]+)\/?$';
const CONTENT_URL = 
  'https://storage.googleapis.com/cpe-sample-media/content.json';

const context = cast.framework.CastReceiverContext.getInstance();
const playerManager = context.getPlayerManager();


const LOG_RECEIVER_TAG = 'Receiver';

/**
 * Debug Logger
 */
const castDebugLogger = cast.debug.CastDebugLogger.getInstance();

/**
 * WARNING: Make sure to turn off debug logger for production release as it
 * may expose details of your app.
 * Uncomment below line to enable debug logger, show a 'DEBUG MODE' tag at
 * top left corner and show debug overlay.
 */
  context.addEventListener(cast.framework.system.EventType.READY, () => {
   if (!castDebugLogger.debugOverlayElement_) {
     /**
      *  Enable debug logger and show a 'DEBUG MODE' tag at
      *  top left corner.
      */
       castDebugLogger.setEnabled(true);

     /**
      * Show debug overlay.
      */
       castDebugLogger.showDebugLogs(true);
   }
 });

/**
 * Set verbosity level for Core events.
 */
castDebugLogger.loggerLevelByEvents = {
  'cast.framework.events.category.CORE':
    cast.framework.LoggerLevel.INFO,
  'cast.framework.events.EventType.MEDIA_STATUS':
    cast.framework.LoggerLevel.DEBUG
};

if (!castDebugLogger.loggerLevelByTags) {
  castDebugLogger.loggerLevelByTags = {};
}

/**
 * Set verbosity level for custom tag.
 * Enables log messages for error, warn, info and debug.
 */
castDebugLogger.loggerLevelByTags[LOG_RECEIVER_TAG] =
  cast.framework.LoggerLevel.DEBUG;

context.start();
