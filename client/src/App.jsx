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
  }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({loading: true})  // change the state. this calls render() and the component updates.
  //   }, 3000)
  // }

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
        } />

      </div>
    );
  }
}


export default App;
