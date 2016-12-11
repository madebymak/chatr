
import React, {Component} from 'react';
import Message from './Message.jsx'


class MessageList extends Component {

  render() {
      return (
        <div id="message-list">
        {this.props.messageList.messages.map((messageInfo, i) => (
          <Message
            key = {
              i
            }
            username = {
              messageInfo.username
            }
            content = {
              messageInfo.content
            }/>
        ))}
        </div>
      );
    }
  }

export default MessageList;
