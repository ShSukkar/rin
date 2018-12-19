import React, { Component } from "react";
import axios from "axios";
import "./SignUpLogIn.css";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export default class SignUpLogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roles: ["Investor", "Entrepreneur", "Humanitarian Community"],
      userInfo: {
        firstName: "",
        lastName: "",
        organizationName: "",
        userRole: "",
        email: "",
        password: "",
        password2: ""
      },
      errors: []
    };
  }

  // display the proper form for the user (login || signup)
  toggleClassBounce = () => {
    if (
      document
        .querySelector(".user_options-forms")
        .classList.contains("bounceRight")
    ) {
      document
        .querySelector(".user_options-forms")
        .classList.remove("bounceRight");
      document.querySelector(".user_options-forms").classList.add("bounceLeft");
    } else {
      document
        .querySelector(".user_options-forms")
        .classList.remove("bounceLeft");
      document
        .querySelector(".user_options-forms")
        .classList.add("bounceRight");
    }
  };

  onChange = e => {
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        [e.target.name]: e.target.value
      }
    });
  };

  addUser = e => {
    e.preventDefault();

    let { userInfo } = this.state;

    axios
      .post("/users/register", userInfo)
      .then(res => {
        this.toggleClassBounce();
      })
      .catch(error => {
        const errors = [];
        if (typeof error.response.data === "object") {
          for (let i in error.response.data) {
            errors.push(<li key={i}>{error.response.data[i]}</li>);
          }
        }
        this.setState({
          errors: errors
        });
      });
  };

  login = e => {
    e.preventDefault();

    let userData = {
      email: this.state.userInfo.email,
      password: this.state.userInfo.password
    };

    axios
      .post("/users/login", userData)
      .then(res => {
        const token = res.data.token;
        window.localStorage.setItem("jwttoken", token);
        this.props.history.push("members");
      })
      .catch(error => {
        console.log(error);
      });
  };

  toggleErrors = () => {
    this.setState({ errors: [] });
  };

  render() {
    let roles = this.state.roles.map((role, i) => {
      return (
        <option value={role} key={i}>
          {role}
        </option>
      );
    });

    return (
      <div className="user">
        <div
          className="errors"
          style={{ display: this.state.errors.length ? "block" : "none" }}
        >
          <h3 className="heading-theme-2">please try again</h3>
          <ul>{this.state.errors}</ul>
          <button className="errors-dismiss" onClick={this.toggleErrors}>
            OK
          </button>
        </div>
        <div className="user_options-container">
          <div className="user_options-text">
            <div className="user_options">
              <h2 className="user-title">Don't have an account?</h2>
              <p className="user-text">
                Create a member account and enjoy our exclusive services
              </p>
              <button
                className="user-signup-login"
                onClick={this.toggleClassBounce}
              >
                Sign up
              </button>
            </div>

            <div className="user_options">
              <h2 className="user-title">Have an account?</h2>
              <p className="user-text">Login dierctly to your account</p>
              <button
                className="user-signup-login"
                onClick={this.toggleClassBounce}
              >
                Login
              </button>
            </div>
          </div>
          {/******************** login form  *******************************/}
          <div className="user_options-forms bounceRight">

            <div className="user_forms-login">
              <Typography variant="h2" className="forms_title">Login</Typography>
              <FormControl className="forms_form">
                <fieldset className="forms_fieldset">
                  <div className="forms_field">
                    <TextField
                      label="Email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      onChange={this.onChange}
                      value={this.state.email}
                      placeholder="Email"
                      margin="normal"
                      required
                    />
                  </div>
                  <div className="forms_field">
                    <TextField
                      label="Password"
                      type="password"
                      name="password"
                      autoComplete="current-password"
                      onChange={this.onChange}
                      value={this.state.password}
                      margin="normal"
                      required
                    />
                  </div>
                </fieldset>
                <div className="forms_buttons">
                  <Button variant="contained" onClick={this.login} style={{ color: "var(--color-2)" }}>
                    Log In
                  </Button>
                </div>
              </FormControl>
            </div>

            {/******************** signup form  *******************************/}
            <div className="user_forms-signup">
              <Typography variant="h2" className="forms_title">Signup</Typography>
              <form className="forms_form" onSubmit={this.addUser}>
                <fieldset className="forms_fieldset">
                  <div className="forms_field">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      className="forms_field-input"
                      onChange={this.onChange}
                      required
                    />
                  </div>
                  <div className="forms_field">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      className="forms_field-input"
                      onChange={this.onChange}
                      required
                    />
                  </div>

                  <div className="forms_field">
                    <input
                      type="text"
                      name="organizationName"
                      placeholder="Organization Name"
                      className="forms_field-input"
                      onChange={this.onChange}
                      required
                    />
                  </div>
                  <div className="forms_field">
                    <select
                      name="userRole"
                      className="forms_field-input"
                      onChange={this.onChange}
                      required
                    >
                      <option>User Role</option>
                      {roles}
                    </select>
                  </div>
                  <div className="forms_field">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="forms_field-input"
                      onChange={this.onChange}
                      required
                    />
                  </div>
                  <div className="forms_field">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="forms_field-input"
                      onChange={this.onChange}
                      required
                    />
                  </div>
                  <div className="forms_field">
                    <input
                      type="password"
                      name="password2"
                      placeholder="Confirm Password"
                      className="forms_field-input"
                      onChange={this.onChange}
                      required
                    />
                  </div>
                </fieldset>
                <div className="forms_buttons">
                  <input
                    type="submit"
                    value="Sign Up"
                    className="forms_buttons-action"
                    onClick={this.addUser}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
