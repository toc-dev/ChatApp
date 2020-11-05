// JavaScript source code
document.addEventListener('DOMContentLoaded', () => {
    var socket = io();
    // connect() //'http://' + document.domain + ':' + location.port);
    //socket.on('connect', () => {
    //    socket.send('I am connected')
    //});
    // add_room.addEventListener('add_room', newRoom);

     let room = "Lounge";
     //joinRoom(room);

    // displaying messages
    socket.on('message', data => {
        console.log(`Message received: ${data}`);
        if (data.msg) {
            console.log(data)
            const p = document.createElement('p');
            const span_username = document.createElement('span');
            const span_timestamp = document.createElement('span');

            
            const br = document.createElement('br');
            if (data.username == username) {
                p.setAttribute("class", "my-msg");
                //Username
                span_username.setAttribute("class", "my-username");
                span_username.innerText = data.username;

                // Timestamp
                span_timestamp.setAttribute("class", "my-username");
                span_timestamp.innerText = data.time_stamp;
                p.innerHTML = span_username.outerHTML + br.outerHTML + data.msg
                    + br.outerHTML + span_timestamp.outerHTML;
               
                //alert(document.querySelector('#display-message-section'))
                document.querySelector('#display-message-section').append(p);
               
                //Display other people's messages
            } else if (typeof data.username !== 'undefined') {
                p.setAttribute("class", "others-msg");

                //username
                span_username.setAttribute("class", "other-username");
                span_username.innerText = data.username;

                //Timestamp
                span_timestamp.setAttribute("class", "timestamp");
                span_timestamp.innerText = data.time_stamp;

                //HTML to append
                p.innerHTML += span_username.outerHTML + br.outerHTML + data.msg +
                    br.outerHTML + span_timestamp.outerHTML;

                //Append
                document.querySelector('#display-message-section').append(p);
            }
            // Display system messsage
            else {
                printSysMsg(data.msg);
            }
        }
        scrollDownChatWindow();
    });

    document.querySelector('#send_message').onclick = () => {

        
       socket.send({
            'msg': document.querySelector('#user_message').value,
            'username': username, 'room': room
        });
        // clear input area
        document.querySelector('#user_message').value = '';
    }

    
    //document.querySelectorAll("#add-room").forEach(p => {
    //    p.onclick = () => {
    //        newRoom(room)
    //    }
    //})


    // Room selection
    document.querySelectorAll(".select-room").forEach(p => {
        p.onclick = () => {
            let newRoom = p.innerHTML;
            if (newRoom == room) {
                msg = `You are already in ${room} room.`
                printSysMsg(msg);
            } else {
                leaveRoom(room);
                joinRoom(newRoom);
                room = newRoom;
            }
        }
    });
    // leave room
    function leaveRoom(room) {
        socket.emit('leave', { 'username': username, 'room': room });
    }
    // Join room
    function joinRoom(room) {
        socket.emit('join', { 'username': username, 'room': room });
        //Clear message section
        document.querySelector('#display-message-section').innerHTML = '';
        //Autofocus on text box
        document.querySelector('#user_message').focus();
    }

    // Scroll chat window down
    function scrollDownChatWindow() {
        const chatWindow = document.querySelector("#display-message-section");
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
    // Print system message
    function printSysMsg(msg) {
        const p = document.createElement('p');
        p.innerHTML = msg;
        document.querySelector('#display-message-section').append(p);
        scrollDownChatWindow()
    }

var roomList = document.querySelector('.select-room');
var myForm = document.querySelector('.add-room');
var newRoom = document.querySelector('#new-room');

    document.querySelector('#new-room').onsubmit = () => {
        let channel = document.querySelector('#channel-name').value;
        let channel_name = channel

        // clear input
        document.querySelector('#channel-name').value = '';
        socket.emit('new_channel', { channel_name: channel_name });
        console.log(channel_name);
    return true;
    };
    //document.querySelector('#send_message').onclick = () => {
    //    socket.emit('save_message', {
    //        'msg': document.querySelector('#user_message').value,
    //        'username': username, 'room': room
    //    })
    //}
})