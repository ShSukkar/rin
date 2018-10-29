import React, { Component } from "react";
import axios from "axios";
import "./NewStory.css";

export default class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      text: "",
      img: ""
    };
  }

  componentDidMount() {
    document.body.style.overflowY = "auto";
  }

  onChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  addStory = e => {
    console.log(this.state);

    e.preventDefault();
    let storyData = {
      title: this.state.title,
      text: [this.state.text],
      imgs: [this.state.img]
    };

    axios
      .post("/api/stories", storyData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  onChangeImg = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", e.target.files[0]);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    axios.post("/api/upload", formData, config).then(res => {
      const imageURL = res.data.location;
      this.setState({
        img: imageURL
      });
    });
  };

  render() {
    return (
      <div className="admin-form">
        <form>
          <label htmlFor="story-title">story title</label> <br />
          <input
            required
            type="text"
            name="title"
            id="story-title"
            onChange={this.onChange}
          />
          <br />
          <br />
          <label htmlFor="story-text">story text</label> <br />
          <textarea
            required
            rows="4"
            cols="50"
            required
            type="text"
            name="text"
            id="story-text"
            onChange={this.onChange}
          />
          <label htmlFor="image">add image for the story</label> <br />
          <input
            type="file"
            name="img"
            accept="image/*"
            onChange={this.onChangeImg}
          />
          <button type="submit" onClick={this.addStory}>
            <p>
              <i className="fas fa-plus" /> Add Story
            </p>
          </button>
          <div className="done-img">
            <img src="/imgs/done.gif" alt="" />
          </div>
        </form>
      </div>
    );
  }
}
