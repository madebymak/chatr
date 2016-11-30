
import React, {Component} from 'react';
import Message from './message.jsx'


class MessageList extends Component {

  render() {
      return (
        <div id="message-list">
        {this.props.data.messages.map((data) => (
          <Message key = {
            data.id
          }
          username = {
            data.username
          }
          content = {
            data.content
          }/>
        ))}
        </div>
      );
    }
  }

export default MessageList;


