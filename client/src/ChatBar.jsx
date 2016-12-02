
import React, {Component} from 'react';

class ChatBar extends Component {

  //function event handler
  constructor(props) {
    super(props);
    this.state = {
      messages: " "
    };
    this.sendNotify = this.sendNotify.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendNotify (event) {
    //post nofitication
  }

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
          <input id="username" type="text" placeholder="username" ref='username' onKeyDown={this.sendMessage}/>
          <input id="new-message" type="text" placeholder="Type a message and hit ENTER" onKeyDown={this.sendMessage} ref='newMessage' />
      </footer>
    );
  }
}
export default ChatBar;
