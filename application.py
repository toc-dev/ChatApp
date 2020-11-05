import os
from time import localtime, strftime
from flask import Flask, render_template, request, redirect
from flask_socketio import SocketIO, send, emit, join_room, leave_room

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
# initialize flask socketio and pass in the app
socketio = SocketIO(app)
ROOMS = ["lounge", "news", "games", "coding"]
current_users = []
hundred_messages = []
first_four = hundred_messages[-3:]
print("hello", hundred_messages)


@app.route("/", methods=['GET', 'POST'])
def index():
    #return "Project 2: TODO"
    #if request.method == 'POST':
    return render_template('registration.html')

@app.route("/login", methods=['GET', 'POST'])
def login():
    #if request.method == 'POST':
    #    return redirect("/chat")
    return render_template("login.html")

@app.route("/chat", methods=['POST'])
def chat():
    return render_template('chat.html', rooms=ROOMS, four=hundred_messages[-3:])

socketio.on('deleteMessages')
def delete_messages(data):
    name = data['username']
    #delete messages from server by sender
    pass

@socketio.on('message')
def message(data):
    msg = data['msg']
    username = data['username']
    room = data['room']
    time_stamp = strftime('%b-%d %I:%M%p', localtime())

    message_info = {
        'msg': msg,
        'username': username,
        'time_stamp': time_stamp,
        'room': room
        }
    
    #countMessages = len(hundred_messages) #(sum(x.get('room') == room for x in hundred_messages))
    #if countMessages > 4:
    #    del hundred_messages[0]
    #if countMessages <= 4:
    hundred_messages.append(message_info)
    send({'msg': data['msg'], 'username': data['username'], 'time_stamp':
        strftime('%b-%d %I:%M%p', localtime())}, room=data['room'])
    
    print(f"\n\n{data}\n\n")
    #send({'msg': hundred_messages, 'username': data['username'], 'time_stamp':
    #      strftime('%b-%d %I:%M%p', localtime())}, room=data['room'])
    print("hullo", hundred_messages)
    print("test", hundred_messages[-3:])

@socketio.on('join')
def join(data):
    join_room(data['room'])
    send({'msg': data['username'] + " has joined the " + data['room'] + 
          " room."}, room=data['room'])

@socketio.on('leave')
def leave(data):
    leave_room(data['room'])
    send({'msg': data['username'] + " has left the " + data['room'] + 
          " room."}, room=data['room'])

@socketio.on('new_channel')
def new_channel(data):
    channel_name = data["channel_name"]
    if channel_name not in ROOMS:
        ROOMS.append(channel_name)
        send({"msg": data["channel_name"] + " room" + " created"}, broadcast=True)
        print(f"\n\n{data}\n\n")
    else:
        send({'msg': "name already taken"})

if __name__ == '__main__':
    socketio.run(app, debug = True)
