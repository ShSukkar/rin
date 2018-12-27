import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import red from "@material-ui/core/colors/red";

const styles = theme => ({
  header: {
    height: "auto"
  },
  actions: {
    display: "flex",
    justifyContent: "center"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

class RecipeReviewCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  showMmeberInfo = () => {
    this.setState({ isDetailsShown: !this.state.isDetailsShown });
  };

  render() {
    const { classes } = this.props;
    const shown = this.state.isDetailsShown;
    return (
      <Card
        className="member-card"
        style={{ overflowY: shown ? "scroll" : "hidden" }}
      >
        <CardHeader
          avatar={
            <Avatar
              aria-label="Recipe"
              src={this.props.bio.img}
              className={classes.avatar}
            >
              R
            </Avatar>
          }
          title={this.props.bio.name}
        />
        <img src={this.props.bio.img} alt="" className="member-img" />
        <Typography className="padding-20 bio-info" variant="body1">
          <Typography className="color-3" variant="subtitle1">
            {this.props.bio.title}
          </Typography>
          {this.props.bio.description}
        </Typography>
      </Card>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RecipeReviewCard);
