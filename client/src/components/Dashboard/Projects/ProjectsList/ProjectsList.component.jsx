import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ProjectsList.css";

export default class ProjectsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allProject: []
    };
  }

  componentWillMount() {
    this.fetchAllProjects();
  }

  componentDidMount() {
    document.body.style.overflowY = "auto";
  }

  fetchAllProjects = () => {
    axios.get("/api/projects").then(res => {
      this.setState({ allProject: res.data });
    });
  };

  deleteProject = project => {
    axios
      .delete(`/api/projects/${project.id}`)
      .then(res => {
        this.fetchAllProjects();
      })
      .catch(err => {
        console.log("Error deleting a table row");
      });
  };

  render() {
    const projects = this.state.allProject.map(project => {
      return (
        <tr>
          <td>{project.id}</td>
          <td>{project.title}</td>
          <td>{project.organization_name}</td>
          <td className="project-options">
            <Link to={`/dashboard/projects/list/${project.id}`}>
              <i className="far fa-eye" />
            </Link>
            <Link to={`/dashboard/projects/list/updateproject/${project.id}`}>
              <i className="fas fa-edit" />
            </Link>
            <a onClick={() => this.deleteProject(project)}>
              <i className="fas fa-trash-alt" />
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
              <th>Project ID</th>
              <th>Project Name</th>
              <th>Organization Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{projects}</tbody>
        </table>
      </div>
    );
  }
}
