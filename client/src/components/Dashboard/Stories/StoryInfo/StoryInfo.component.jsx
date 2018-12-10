import React, { Component } from "react";
import axios from "axios";
import draftToHtml from 'draftjs-to-html';
import renderHTML from 'react-render-html';
import "./StoryInfo.css";

const content = { "entityMap": {}, "blocks": [{ "key": "637gr", "text": "Initialized from content state.", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }] };

export default class StoryInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      story: {
        imgs: [],
        SDGs: [],
        text: ""
      },
      myText: ""
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
      this.setState({
        story: res.data[0]
      }, () => {
        this.setState({ story: { ...this.state.story, text: draftToHtml(JSON.parse(this.state.story.text)) } });
        // this.setState({ myText: renderHTML(draftToHtml(JSON.parse(this.state.story.text))) });
      });
    });
  };

  render() {
    const { contentState } = this.state;

    let SDGs = this.state.story.SDGs.map(sdg => {
      return (
        <li>
          <p className="p-theme-1-admin-info">{sdg}</p>
        </li>
      );
    });

    return (
      <div className="admin-info-single">
        <table>
          <tr>
            <th>Story ID</th>
            <td>{this.state.id}</td>
          </tr>
          <tr>
            <th>Story Tilte</th>
            <td>{this.state.story.title}</td>
          </tr>
          <tr>
            <th>Story Pre-Description</th>
            <td>
              <p className="p-theme-1-admin-info">{this.state.story.pre_description}</p>
            </td>
          </tr>
          <tr>
            <th>Story Details</th>
            <td>
              <div>
                {renderHTML(this.state.story.text)}
              </div>
            </td>
          </tr>
          <tr>
            <th>Story Lens</th>
            <td>
              <p className="p-theme-1-admin-info">{this.state.story.lens}</p>
            </td>
          </tr>
          <tr>
            <th>Story SDGs</th>
            <td>
              <ul>
                {SDGs}
              </ul>
            </td>
          </tr>
          <tr>
            <th>Story Images</th>
            <td>
              <img className="admin-img" src={this.state.story.imgs[0]} alt="Story" />
            </td>
          </tr>
        </table>
      </div>
    );
  }
}
