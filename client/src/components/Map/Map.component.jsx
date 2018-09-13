import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import "./Map.css";
import * as options from './map-options';
import * as projects from './projects-data.json';


const Dot = (props) => {
  const colors = {
    'health': '#8DC26F',
    'education': '#ff9068',
    'nutrition': '#6441A5',
    'water': '#64b3f4',
    'agriculture': '#FFB75E',
    'infancy': '#FFB75E',
    'housing': '#E83338'
  }
  return (
    <div className="dot" style={{ background: colors[props.project.type] }} />
  )
};

export default class Map extends Component {
  state = {
    position: {
      lat: 31.95,
      lng: 35.99
    },
    zoom: 5
  };

  componentWillMount() {
    this.getUserLocation();

  }

  // get the user location;
  getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        position: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      });
    });
  };

  // mouse hover handler for the spectrum;
  handleMouseHover = (e) => {
    const index = e.target.dataset.index;


  }

  render() {

    const dots = projects.map((project, key) => {
      return (
        <Dot lng={project.position.lng} lat={project.position.lat} key={key} project={project} key={key} />
      );
    })



    return (
      <div
        style={{ height: "100vh", width: "100%" }}
        className="map fadeInFast"
      >
        <div className="filter-spectrum">
          <ul className="spectrum">
            <li className="spectrum-item" data-index={0} onMouseEnter={this.handleMouseHover}></li>
            <li className="spectrum-item" data-index={1} onMouseEnter={this.handleMouseHover}></li>
            <li className="spectrum-item" data-index={2} onMouseEnter={this.handleMouseHover}></li>
            <li className="spectrum-item" data-index={3} onMouseEnter={this.handleMouseHover}></li>
            <li className="spectrum-item" data-index={4} onMouseEnter={this.handleMouseHover}></li>
            <li className="spectrum-item" data-index={5} onMouseEnter={this.handleMouseHover}></li>
            <li className="spectrum-item" data-index={6} onMouseEnter={this.handleMouseHover}></li>
          </ul>
        </div>
        <GoogleMapReact
          options={options}
          bootstrapURLKeys={{ key: "AIzaSyAxYHlwX3Vu7-ygTF2wiB3sjSyFU7mAMJE" }}
          defaultCenter={this.state.position}
          defaultZoom={this.state.zoom}
        >
          {[dots]}
        </GoogleMapReact>
      </div>
    );
  }
}







