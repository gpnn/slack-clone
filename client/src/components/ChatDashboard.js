import React, { Component } from "react";
import ChatRoom from "./ChatRoom";
import ChannelList from "./ChannelList";
import AddChannelForm from "./AddChannelForm";

import { addChannels, getChannels } from "../api/channels";
import Modal from "./Modal";

export default class ChatDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      channels: [{ name: "channel1", id: 1 }, { name: "channel2", id: 2 }],
      user: this.props.user,
      channelMessages: [],
      channelSelected: "",
      show: false
    };

    this.selectChannel = this.selectChannel.bind(this);
    this.addChannel = this.addChannel.bind(this);
    this.deleteChannel = this.deleteChannel.bind(this);
  }

  componentDidMount() {
    console.log(this.props.user);
    // fetch all the channels then set state
    this.loadChannels();
  }

  loadChannels() {
    getChannels();
    // some logic to populate the channels array in the constructor
  }

  selectChannel(channelId) {
    this.setState({ channelSelected: channelId });
  }

  async addChannel(e, name) {
    e.preventDefault();
    if (!name) return;

    // post to db with new channel name and set state with the new channelId
    try {
      const channelId = await addChannels(name, this.props.user.id);
      const newElement = { name: name, id: channelId };
      this.setState(prevState => ({
        channels: [...prevState.channels, newElement]
      }));
    } catch (error) {
      console.log("cannot add this channel"); // handle this better in future issue
    }
  }

  deleteChannel(e) {
    e.preventDefault();
    const newChannels = this.state.channels.filter(channel => {
      return channel.id !== this.state.channelSelected;
    });
    const channelSelected = newChannels.length >= 0 ? newChannels[0] : null;
    this.setState({
      channels: newChannels,
      channelSelected: channelSelected.id
    });
  }

  render() {
    return (
      <div>
        <div className="row dash">
          <div className="col-sm-3 channellist">
            <div className="channels">
              <ChannelList
                channels={this.state.channels}
                selectChannel={this.selectChannel}
              />
            </div>
          </div>
          <div className="col-sm-9" align="center">
            <div className="chatRoom">
              {!this.state.channelSelected ? (
                <div>Please select a channel</div>
              ) : (
                <ChatRoom
                  channel={this.state.channelSelected}
                  user={this.state.user}
                  messages={this.getChannelMessages}
                />
              )}
              <Modal />
            </div>
          </div>
        </div>
        <div className="row">
          <AddChannelForm
            deleteChannel={this.deleteChannel}
            addChannel={this.addChannel}
          />
        </div>
      </div>
    );
  }
}
