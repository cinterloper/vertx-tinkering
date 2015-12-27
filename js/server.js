var Router = require("vertx-web-js/router");
var SockJSHandler = require("vertx-web-js/sock_js_handler");
var StaticHandler = require("vertx-web-js/static_handler");

var router = Router.router(vertx);
var logger = Java.type("io.vertx.core.logging.LoggerFactory").getLogger("server.js");

// Allow events for the designated addresses in/out of the event bus bridge
var opts = {
  "inboundPermitteds" : [
    {
      "address" : "chat.to.server"
    }
  ],
  "outboundPermitteds" : [
    {
      "address" : "chat.to.client"
    }
  ]
};

// Create the event bus bridge and add it to the router.
var ebHandler = SockJSHandler.create(vertx).bridge(opts,function (be) {

    if (be.type() === 'SEND' || be.type() === 'PUBLISH') {

    console.log('########before headers added, source(bridgeing) verticle: JSON.stringify( be.rawMessage())) : ############'+  JSON.stringify( be.rawMessage()));

        // Add some headers
        var headers = {
            "header1": "val",
            "header2": "val2"
        };
        be.rawMessage().headers=headers

    }
    console.log('########after headers added, source(bridgeing) verticle: JSON.stringify( be.rawMessage())) : ############'+  JSON.stringify( be.rawMessage()));

    be.complete(true)
});
router.route("/eventbus/*").handler(ebHandler.handle);

// Create a router endpoint for the static content.
router.route().handler(StaticHandler.create().handle);

// Start the web server and tell it to use the router to handle requests.
vertx.createHttpServer().requestHandler(router.accept).listen(8086);

var eb = vertx.eventBus();

// Register to listen for messages coming IN to the server
eb.consumer("chat.to.server").handler(function (message) {
// Create a timestamp string
  var timestamp = Java.type("java.text.DateFormat").getDateTimeInstance(Java.type("java.text.DateFormat").SHORT, Java.type("java.text.DateFormat").MEDIUM).format(Java.type("java.util.Date").from(Java.type("java.time.Instant").now()));
// Send the message back out to all clients with the timestamp prepended.
  console.log('########after headers added, source/bridge verticle############ JSON.stringify(message.body()) + JSON.stringify(message.headers())  : '  + JSON.stringify(message.body())+ JSON.stringify(message.headers()) );

//  eb.publish("chat.to.client", timestamp + ": " + message.body());
});

