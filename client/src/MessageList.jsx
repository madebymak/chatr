
import React, {Component} from 'react';
import Message from './message.jsx'


class MessageList extends Component {

  render() {
      return (
        <div id="message-list">
        {this.props.data.messages.map((messageInfo) => (
          <Message key = {
            messageInfo.id
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


