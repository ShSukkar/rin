import React, { Component } from "react";
import axios from "axios";
import "./StoryInfo.css";

export default class StoryInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      story: {},
      text: [],
      imgs: []
    };
  }

  componentWillMount() {
    this.getStory(this.state.id);
  }

  componentDidMount() {
    document.body.style.overflowY = "auto";
  }

  getStory = id => {
    axios.get(`/api/stories/${id}`).then(res => {
      this.setState({ story: res.data[0] }, () => {
        this.setState(
          {
            text: JSON.parse(res.data[0]["text"]),
            imgs: JSON.parse(res.data[0]["imgs"])
          },
          () => {
            console.log(this.state.imgs);
          }
        );
      });
    });
  };

  render() {
    return (
      <div>
        <table className="admin-table">
          <tr>
            <th>
              <h3 className="heading-theme-3-admin-titles">Story ID</h3>
            </th>
            <td>
              <p className="p-theme-1-admin-info">{this.state.id}</p>
            </td>
          </tr>
          <tr>
            <th>
              <h3 className="heading-theme-3-admin-titles">Story Tilte</h3>
            </th>
            <td>
              <p className="p-theme-1-admin-info">{this.state.story.title}</p>
            </td>
          </tr>
          <tr>
            <th>
              <h3 className="heading-theme-3-admin-titles">Story Details</h3>
            </th>
            <td>
              <p className="p-theme-1-admin-info">{this.state.text[0]}</p>
            </td>
          </tr>
          <tr>
            <th>
              <h3 className="heading-theme-3-admin-titles">Story Images</h3>
            </th>
            <td>
              <img src={this.state.imgs[0]} alt="Story Image" />
            </td>
          </tr>
        </table>
      </div>
    );
  }
}
