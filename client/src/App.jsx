import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
// import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";

// var data =

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        currentUser: {
          name: "Bob"
        },

        messages: [ {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }]
      }
    }
    this.submit = this.submit.bind(this);
  }



  //function to receive message from chatbar
  submit(username, message) {
    console.log("here:", this.state.data);
    const submitData = {
      // id: id,
      username: username,
      content: message
    };
    const msg = this.state.data.messages.concat(submitData)
    this.setState({
      data: {
        messages: msg
      }
    })
   }

  componentDidMount() {
    console.log("componentDidMount <App />");

    const socket = new WebSocket("ws://localhost:4000/socketserver");
     socket.onopen = function(event) {
       socket.send("Connected");
     };

    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {
        id: 3,
        username: "Michelle",
        content: "Hello there!"
      };
      const messages = this.state.data.messages.concat(newMessage)
      // console.log(messages[2]);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({data: {messages: messages}})
    }, 3000);

}

  render() {
    return (
      <div>
        <nav>
          <h1>Chatty</h1>
        </nav>

        <MessageList data = {
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
