const path = require("path");
const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const port = 8080;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, "public"))); // Hosting static files, html files, javacript file. Everything that isn't dynamic redirects to public directory

wss.on("connection", function connection(ws) {
  // Checks for a connection

  ws.on("message", function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        //client.send(JSON.stringify({ data }));
        client.send(data.toString());
      }
    });
  });
});

server.listen(port, function () {
  console.log(`Server is  listening on ${port}`);
});
