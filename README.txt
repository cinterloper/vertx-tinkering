run the server verticle (groovy or js)
vertx run server.lng
it will deploy 
 another verticle listening for messages
 an eventbus bridge
 a webserver serving the chat app on 8086
 
if you send a message using the chat app, it reaches the bridge

the bridge tries to append the headers as described (please correct me if i missed something) in the 
Handling event bus bridge events
section of vertx.io/docs

the headers do not appear (as far as i can tell) in any consumers (groovy or js) setup to recieve them




js:
########before headers added, source(bridgeing) verticle: JSON.stringify( be.rawMessage())) : ############{"type":"publish","address":"chat.to.server","headers":{},"body":"sdflkjlksdjf"}
########after headers added, source(bridgeing) verticle: JSON.stringify( be.rawMessage())) : ############{"type":"publish","address":"chat.to.server","headers":{"header1":"val","header2":"val2"},"body":"sdflkjlksdjf"}
V2: got this message: "sdflkjlksdjf" with headers: {}
########after headers added, source/bridge verticle############ JSON.stringify(message.body()) + JSON.stringify(message.headers())  : "sdflkjlksdjf"{}

groovy:

##########groovy: after headers added, as rm: null
##########groovy: after headers added, as rm: [type:register, address:chat.to.client, headers:[:]]
##########groovy: after headers added, as rm: [type:publish, address:chat.to.server, headers:{"thisheader":"kibble","thatheader":"skooba"}, body:lkajdflkjd]
#### groovy headers on message after headers added666: []
##########groovy: after headers added, as rm: [type:rec, address:chat.to.client, body:12/27/15 7:38:12 AM: lkajdflkjd]
V2: got this message: "lkajdflkjd" with headers: {} 
^C##########groovy: after headers added, as rm: [type:unregister, address:chat.to.client]
##########groovy: after headers added, as rm: null




