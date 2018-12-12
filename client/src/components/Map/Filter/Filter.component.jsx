import React from "react";
import Paper from "@material-ui/core/Paper";
import "./Filter.css";

export default function Filter(props) {
  return (
    <Paper
      className="filter-modal"
      style={{
        display: props.shown ? "block" : "none",
        opacity: props.shown ? "1" : "0"
      }}
    >
      <span
        className="fas fa-times"
        id="close-filter"
        onClick={props.handleFilterToggle}
      />
    </Paper>
  );
}
