
########before headers added, source(bridgeing) verticle: JSON.stringify( be.rawMessage())) : ############{"type":"publish","address":"chat.to.server","headers":{},"body":"sdflkjlksdjf"}
########after headers added, source(bridgeing) verticle: JSON.stringify( be.rawMessage())) : ############{"type":"publish","address":"chat.to.server","headers":{"header1":"val","header2":"val2"},"body":"sdflkjlksdjf"}
V2: got this message: "sdflkjlksdjf" with headers: {}
########after headers added, source/bridge verticle############ JSON.stringify(message.body()) + JSON.stringify(message.headers())  : "sdflkjlksdjf"{}




