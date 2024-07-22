import express from "express";
import path from 'path';
// import WebSocket from "ws";
import { fileURLToPath } from "url";
import { WebSocketServer } from "ws";
import { }
import http from 'http';

import SocketIO from "socket.io"


const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set("view engine","pug");
app.set("views", __dirname + "/views");

app.use("/public", express.static(__dirname+"/public"));

app.get("/", (req,res) => res.render("home"));
app.get("/*", (req,res) => res.redirect("/"));


const handleListen = () => console.log("listening on http://localhost:3000");
// app.listen(3000,handleListen); // 포트 번호인듯?

const HttpServer = http.createServer(app); // http서버
const wsServer = SocketIO(HttpServer);







//아래는 웹소켓으로 만들었을때의 잔재
// const wss = new WebSocketServer({ server }); // 웹소켓 서버

// const sockets = [];
// wss.on("connection",(socket) => {
//     sockets.push(socket);
//     console.log("여기는 프론트랑 연결됐슴!!!");
//     socket.send("안녕!!!!")

//     socket["nickname"] ="apple"

//     //브라우저에서 서버로 메세지 받기
//     socket.on("message", (message)=> {
//         message = message.toString("utf8")
//         // console.log(message.toString("utf8"));
//         // socket.send(message.toString("utf8"));
//         const str = JSON.parse(message);
//         switch (str.type) {
//             case "new_message":
//                 sockets.forEach((asocket) => asocket.send(`${socket.nickname} : ${str.payload}`));
//                 break; // 이게 있어야 아래 구문까지 실행이 안됨
//             case "nickname":
//                 socket["nickname"] = str.payload; 
//                 break;
//         }
//     })

//     // 브라우저가 끊어졌다는걸 알아채리기
//     socket.on("close", () => {
//         console.log("프론트량 연결 끊어짐... ㅠㅠ");
//     });
// });



wsServer.listen(3000, handleListen);

// 현재까지의 구조는 http서버를 먼저 구축한 뒤
// http서버 바로 위에 웹소켓 서버를 구축시킨 거임
// http서버랑 웹소켓 서버가 둘다 존재하기도하지만
// 웹소켓 서버가 http서버를 기반으로 생성된 거 정도 이해하면 될듯?
// 그리고 재밌는 사실은
// 같은 포트번호를 사용해서 Http 요청과 웹소켓 요청 둘다 처리할 수 있다고함!!!!



