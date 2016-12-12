import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
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
      }
    }
    this.submit = this.submit.bind(this);
  }

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
    } else if (username === this.state.data.currentUser) {
      submitData = {
        data: {
          messages: {
            type: "postMessage",
            id: 1,
            username: username,
            content: content
          }
        }
      }
    }
    socket.send(JSON.stringify(submitData));
  }

  componentDidMount() {
    socket.onopen = (event) => {
      console.log("Connected");

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        switch (data.type) {
          case "incomingMessage":
            this.setState({
              data: {
                currentUser: data.username,
                messages: this.state.data.messages.concat({username: data.username, content: data.content}),
                counter: this.state.data.counter
              }
            })
            break;
          case "incomingNotification":
            this.setState({
              data: {
                currentUser: data.username,
                messages: this.state.data.messages.concat({
                  username: "NOTIFICATION:",
                  content: "*** " + data.content + "***"
                }),
                counter: this.state.data.counter
              }
            })
            break;

          case 'counter':
            this.setState({
              data: {
                currentUser: this.state.data.currentUser,
                messages: this.state.data.messages.concat({}),
                counter: data.counter
              }
            })
            break;

          default:
            throw new Error("Unknown event type " + data.type);
        }
      }
    }
  }

  render() {
    return (
      <div>
        <nav>
          <h1>Chatty</h1>
          Users online: {this.state.data.counter}
        </nav>

        <MessageList messageList={this.state.data}/>

        <ChatBar data={this.state.data} submit={this.submit}/>
      </div>
    );
  }
}

export default App;
