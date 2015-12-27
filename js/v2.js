var Router = require("vertx-web-js/router");
var SockJSHandler = require("vertx-web-js/sock_js_handler");
var StaticHandler = require("vertx-web-js/static_handler");

var router = Router.router(vertx);
var logger = Java.type("io.vertx.core.logging.LoggerFactory").getLogger("v2.js");
var eb = vertx.eventBus();

// Register to listen for messages coming IN to the server
eb.consumer("chat.to.server").handler(function (message) {
  logger.info("V2: got this message: " + JSON.stringify(message.body()) + " with headers: " + JSON.stringify(message.headers()));
});

logger.info("this is v2 here running")
