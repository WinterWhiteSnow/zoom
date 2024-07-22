console.log("여기는 앱이야");
alert("안녕");

const messageList = document.querySelector("ul")
const messageForm = document.querySelector("#message")
const nickname = document.querySelector("#nick")
const socket = new WebSocket(`ws://${window.location.host}`)

//브라우저가 서버가 연결됨
socket.addEventListener("open", () => {
    console.log("백이랑 연결돼씀!!");
})

//서버가 브라우저에게 뭐라 보냄
socket.addEventListener("message",(meg) => {
    const li = document.createElement("li");
    li.innerText = meg.data;
    messageList.append(li);
})

//브라우저가 서버와 연결이 끊어짐을 알게됨
socket.addEventListener("close", () => {
    console.log("백이랑 연결 끊어짐... 잘가염...");
})

//브라우저가 서버에게 메세지를 보냄
// setTimeout(()=> {
//     socket.send("프론트에서 백으로!");
// },3000);

function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input")
    console.log("입력한 값은 : ",input.value);
    socket.send(makeMessage("new_message", input.value));

    //원래 이벤트리스너 message인 구문인것
    const li = document.createElement("li");
    li.innerText = `YOU : ${input.value}`;
    messageList.append(li);

    input.value = "";
}

function handleNickSubmit(event) {
    event.preventDefault();
    const input = nickname.querySelector("input")
    socket.send(makeMessage("nickname",input.value));
}

function makeMessage (type, payload) {
    const msg = {type, payload}
    return JSON.stringify(msg);
}

messageForm.addEventListener("submit", handleSubmit);
nickname.addEventListener("submit",handleNickSubmit);