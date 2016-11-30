
import React, {Component} from 'react';

class ChatBar extends Component {

  //function event handler
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
    // this.messageId = this.messageId.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  //function for creating new message id??
  // messageId (id) {
  //   if (id) {
  //     id = id + 1
  //   }
  //   return id;
  // }

  sendMessage (event) {
    if(event.keyCode == 13){
      // console.log("enter pressed");
      console.log("user:",this.refs.username.value);
      console.log("message:",this.refs.newMessage.value);
      this.props.submit(this.refs.username.value, this.refs.newMessage.value)
    }
  }

  render() {
    return (
      <footer>
        <input id="username" type="text" placeholder="username" ref='username' />
        <input id="new-message" type="text" placeholder="Type a message and hit ENTER" onKeyDown={this.sendMessage} ref='newMessage' />
      </footer>
    );
  }
}
export default ChatBar;
