
import React, {Component} from 'react';

class ChatBar extends Component {

  //function event handler
  constructor(props) {
    super(props);
    this.state = {
      messages: " "
    };
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage (event) {
    if(event.keyCode == 13){
      if (this.refs.username.value === "") {
        this.refs.username.value = "Anonymous";
      }
      console.log("user:",this.refs.username.value);
      console.log("message:",this.refs.newMessage.value);
      this.props.submit(this.refs.username.value, this.refs.newMessage.value)
      this.refs.newMessage.value = ""
    }
  }

  render() {
    return (
      <footer>
          <input id="username" type="text" placeholder="Leave blank for anonymous." onKeyDown={this.sendMessage} ref='username'/>
          <input id="new-message" type="text" placeholder="Type a message and hit ENTER" onKeyDown={this.sendMessage} ref='newMessage' />
      </footer>
    );
  }
}
export default ChatBar;
