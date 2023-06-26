import Messages from "./components/Messages";
import Input from "./components/Input";
import User from "./components/User";
import React, { Component } from "react";
import "./App.css";

function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

class App extends Component {
  state = {
    messages: [],
    member: {
      username: "name",
      color: randomColor(),
    },
  };

  constructor() {
    super();
    this.drone = new window.Scaledrone("dYeXTZcfI2uw97aK", {
      data: this.state.member,
    });
    this.drone.on("open", (error) => {
      if (error) {
        console.error(error);
        return;
      }
      const member = { ...this.state.member };
      member.id = this.drone.clientId;
      this.setState({ member });
    });
    const room = this.drone.subscribe("observable-room");
    room.on("data", (data, member) => {
      const { content, user } = data;
      const { color, name } = user;
      const { id } = member;
      this.setState({
        messages: [
          ...this.state.messages,
          {
            text: content,
            member: {
              id,
              clientData: {
                color,
                username: name,
              },
            },
          },
        ],
      });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>My Chat App</h1>
        </div>
        <User
          username={this.state.member.username}
          color={this.state.member.color}
          onUsernameChange={(username) => {
            this.setState({
              member: { ...this.state.member, username: username },
            });
          }}
          onColorChange={(color) =>
            this.setState({ member: { ...this.state.member, color: color } })
          }
        />
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input onSendMessage={this.onSendMessage} />
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message: {
        content: message,
        user: {
          name: this.state.member.username,
          color: this.state.member.color,
        },
      },
    });
  };
}

export default App;
