
import React, {Component} from 'react';

class ChatBar extends Component {

  //function event handler

  function (event) {
    // body...
  }

  render() {
    var currentUser = this.props.data.currentUser.name;
    return (
      <footer>
        <input id="username" type="text" value={currentUser} />
        <input id="new-message" type="text" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default ChatBar;