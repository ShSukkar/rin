import React, { Component } from 'react';
import axios from "axios";
import "./ProjectInfo.css";

export default class ProjectInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            project: {},
            country: "",
            start_date: ""
        }
    }

    componentDidMount() {
        document.body.style.overflowY = "auto";
    }

    componentWillMount() {
        this.getProject(this.state.id);
    }

    getProject = (id) => {
        axios.get(`/api/projects/${id}`).then(res => {
            this.setState({ project: res.data[0] }, () => {
                this.setState({ start_date: res.data[0].start_date.slice(0, 10) });
                this.getProjectCountry(this.state.project.location_id);
            });
        });
    }

    getProjectCountry = (locationId) => {
        axios.get(`/api/projects/location/${locationId}`).then(res => {
            this.setState({ country: res.data[0]["name"] });
        });
    }

    render() {
        return (
            <div className="">
                <table className="projects-table">
                    <tr>
                        <th><h3 className="heading-theme-3-admin-titles">Project ID</h3></th>
                        <td>
                            <p className="p-theme-1-admin-project-info">{this.state.id}</p>
                        </td>
                    </tr>
                    <tr>
                        <th><h3 className="heading-theme-3-admin-titles">Project Tilte</h3></th>
                        <td><p className="p-theme-1-admin-project-info">{this.state.project.title}</p></td>
                    </tr>
                    <tr>
                        <th><h3 className="heading-theme-3-admin-titles">Project Country</h3></th>
                        <td><p className="p-theme-1-admin-project-info">{this.state.country}</p></td>
                    </tr>
                    <tr>
                        <th><h3 className="heading-theme-3-admin-titles">Project Description</h3></th>
                        <td><p className="p-theme-1-admin-project-info">{this.state.project.project_description}</p></td>
                    </tr>
                    <tr>
                        <th><h3 className="heading-theme-3-admin-titles">Project Start Date</h3></th>
                        <td><p className="p-theme-1-admin-project-info">{this.state.start_date}</p></td>
                    </tr>
                    <tr>
                        <th><h3 className="heading-theme-3-admin-titles">Project Capacity </h3></th>
                        <td><p className="p-theme-1-admin-project-info">{this.state.project.capacity}</p></td>
                    </tr>
                    <tr>
                        <th><h3 className="heading-theme-3-admin-titles">Project Organization Name</h3></th>
                        <td><p className="p-theme-1-admin-project-info">{this.state.project.organization_name}</p></td>
                    </tr>
                    <tr>
                        <th><h3 className="heading-theme-3-admin-titles">Project Type</h3></th>
                        <td><p className="p-theme-1-admin-project-info">{this.state.project.type}</p></td>
                    </tr>
                    <tr>
                        <th><h3 className="heading-theme-3-admin-titles">Project Image</h3></th>
                        <td><img src={this.state.project.img_url} alt="Project Img" /></td>
                    </tr>
                </table>
            </div>
        )
    }
}
