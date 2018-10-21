import React, { Component } from "react";
import axios from "axios";
import "./ProjectsList.css";
import * as projectsData from "../../Map/projects-data.json";

export default class ProjectsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allProject: []
    }
  }

  componentWillMount() {
    this.fetchAllProjects();
  }

  componentDidMount() {
    document.body.style.overflowY = "auto";
  }

  fetchAllProjects = () => {
    axios.get("/api/projects").then(res => {
      this.setState({ allProject: res.data }, () => { console.log(this.state.allProject); });
    });
  };

  render() {
    const projects = this.state.allProject.map((project, key) => {
      return (
        <tr>
          <td>{project.id}</td>
          <td>{project.title}</td>
          <td>{project.organization_name}</td>
          <td className="project-options">
            <a>
              <i className="far fa-eye" /> show
            </a>
            <a>
              <i className="fas fa-edit" />
              update
            </a>
            <a>
              <i className="fas fa-trash-alt" /> delete
            </a>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <table class="projects-list-table">
          <thead>
            <tr>
              <th>
                <h1>Project ID</h1>
              </th>
              <th>
                <h1>Project Name</h1>
              </th>
              <th>
                <h1>Organization Name</h1>
              </th>
              <th>
                <h1>Options</h1>
              </th>
            </tr>
          </thead>
          <tbody>{projects}</tbody>
        </table>
      </div>
    );
  }
}
