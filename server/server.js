var ws = require('websocket.io');
var server = ws.listen(9000, function () {
  console.log('\033[96m Server running at localhost:9000 \033[39m');
});

// クライアントからの接続イベントを処理
server.on('connection', function(socket) {

    // クライアントからのメッセージ受信イベントを処理
    socket.on('message', function(data) {
        console.log(JSON.stringify(data));

        // 受信したメッセージを全てのクライアントに送信する
        server.clients.forEach(function(client) {
          client.send(data);
        });

    });

    //closeした時
    socket.on('close', function(data) {
        console.log(JSON.stringify(data));

        server.clients.forEach(function(client) {
            //client.send(data);
            //client.send({data: 'anyone logouted'});
        });
    });

});
