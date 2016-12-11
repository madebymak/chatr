import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
// import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";
const socket = new WebSocket("ws://localhost:4000/socketserver");

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        currentUser: "Anonymous",
        messages: [],
        counter: 0
        // messages: [ {
        //   id: 1,
        //   username: "Bob",
        //   content: "Has anyone seen my marbles?",
        // },
        // {
        //   id: 2,
        //   username: "Anonymous",
        //   content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        // }]
      }

    }
    this.submit = this.submit.bind(this);
    // this.usernameData = this.usernameData.bind(this);
  }

  // usernameData(username) {
  //   let submitNotification;
  //   console.log("user:", username);
  //   console.log("currentUser:", this.state.data.currentUser);
  //   if (username !== this.state.data.currentUser) {
  //      submitNotification = {
  //        data: {
  //          currentUser: username,
  //          messages: {
  //            type: "postNotification",
  //            id: 1,
  //            username: username,
  //            content: this.state.data.currentUser + " changed name to " + username
  //          }
  //        }
  //     }
  //     socket.send(JSON.stringify(submitNotification));
  //   }


  //function to receive message from chatbar
  submit(username, content) {
    let submitData;

    if (username !== this.state.data.currentUser) {
      submitData = {
      data: {
        currentUser: username,
        messages: {
          type: "postNotification",
          id: 1,
          username: username,
          content: this.state.data.currentUser + " changed name to " + username
         }
       }
     }
      //  socket.send(JSON.stringify(submitData));
   }

   if (username === this.state.data.currentUser) {
      submitData = {
       data: {
         messages: {
               type: "postMessage",
               id: 1, //get overwritten by UUID
               username: username,
               content: content
         },
       }
     }
   }
    socket.send(JSON.stringify(submitData));
   }

  componentDidMount() {
    // this.socket = socket;
     socket.onopen = (event) => {
       console.log("Connected");

       socket.onmessage = (event) => {
         console.log("message event:", event.data);
         const data = JSON.parse(event.data);
          switch(data.type) {
            case "incomingMessage":
              // const newMessages = this.state.data.messages.concat(updateMessage)
              console.log("newmessage:", data.content);
              this.setState({
                data: {
                  currentUser: data.username,
                  messages: this.state.data.messages.concat({
                    username: data.username,
                    content: data.content
                })
              }
            })
              break;
            case "incomingNotification":
              console.log("nofitication!!!");
              console.log("incomingNotification:", data.content);
              // const newMessages = this.state.data.messages.concat(data.content);
              this.setState({
                data: {
                  currentUser: data.username,
                  messages: this.state.data.messages.concat({
                    username: "NOTIFICATION:",
                    content: "*** " + data.content + "***"
                })
              }
            })
              // console.log("newmessage:", newMessages);
              break;
            default:
              // show an error in the console if the message type is unknown
              throw new Error("Unknown event type " + data.type);
          }
       }
      //  console.log("event data:", event.data);
      //  const message = JSON.parse(event.data);
     }

    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {
    //     id: 3,
    //     username: "Michelle",
    //     content: "Hello there!"
    //   };
    //   const messages = this.state.data.messages.concat(newMessage)
    //   // console.log(messages[2]);
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({data: {messages: messages}})
    // }, 3000);

  }

  render() {
    return (
      <div>
        <nav>
          <h1>Chatty</h1>
          Users online: {this.state.data.counter}
        </nav>

        <MessageList messageList = {
          this.state.data
        }
        />

        <ChatBar data = {
          this.state.data
        } submit = {
          this.submit
        } />
      </div>
    );
  }
}

export default App;
