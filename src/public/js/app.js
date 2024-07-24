const socket = io();

const welcome = document.getElementById("welcome")
const form = welcome.querySelector("form")
const room = document.getElementById("room")

let roomName = "";

room.hidden = true;
function handleMessageSubmit (event) {
    event.preventDefault();
    const input = room.querySelector("#msg input")
     socket.emit("new_message",input.value,roomName, () => {
        addMessage(`You : ${input.value}`)
        input.value = "";
    });
    
}

function handleNicknameSubmit (event) {
    event.preventDefault();
    const input = room.querySelector("#name input")
    const value = input.value;
    socket.emit("nickname",input.value);
}

function showRoom () {
    const h3 = room.querySelector("h3")
    h3.innerText = `room ${roomName}`
    welcome.hidden=true;
    room.hidden=false;
    const msgForm = room.querySelector("#msg")
    const nameForm = room.querySelector("#name")
    msgForm.addEventListener("submit", handleMessageSubmit)
    nameForm.addEventListener("submit", handleNicknameSubmit)

}

function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter_room",{payload: input.value}, showRoom)
    roomName = input.value;
    input.value=""
}

function addMessage(msg) {
    const ul = room.querySelector("ul")
    const li = document.createElement("li")
    li.innerText = msg
    ul.appendChild(li);
}

form.addEventListener("submit",handleRoomSubmit);

socket.on("welcome", (user) => {
    console.log("접속한거 맞음?")
    addMessage(user+" hello!")
})

socket.on("bye", (user) => {
    addMessage(user+" byebye")
})

socket.on("new_message",addMessage) 