import React from "react";
import { Button, TextInput } from "carbon-components-react";
import {setCurrentUser} from "../../redux/user/user.action";
import {connect} from "react-redux";
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userId: "",
      isEmailInvalid: false,
      emailInvalidText: "",
    };
  }

  handleChange = (e) => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value, isEmailInvalid:false });
  };

  handleClick = (e) => {
    const BASE_URL = "https://dummyapi.io/data/api";
    const APP_ID = "5fa4f09c8a129ee167647e57";

    fetch(`${BASE_URL}/user`, {
      headers: { "app-id": APP_ID },
    })
      .then((response) => response.json())
      .then(({ data }) => {
        console.log(data);
        return data.filter(
          (user) => user.email.toLowerCase() === this.state.email.toLowerCase()
        )[0];
      })
      .then((requiredUser) => {
        console.log(requiredUser);
        if (requiredUser === undefined || requiredUser.length === 0) {
          this.setState({
            isEmailInvalid: true,
            emailInvalidText: "Enter valid Email ID",
          });
        } else {
          this.props.setCurrentUser(requiredUser)
        }
      });
  };

  render() {
    return (
      <div className="loginpage">
        <h1 className="heading">View Your Posts</h1>
        <div className="input-box">
          <TextInput
            id="email-input"
            className="text-input"
            type="email"
            helperText=""
            invalid={this.state.isEmailInvalid}
            invalidText={this.state.emailInvalidText}
            labelText="Email"
            placeholder="Enter Email"
            name="email"
            onChange={this.handleChange}
            //   rows={4}
          />
        </div>
        <div className="input-box">
          <TextInput
            id="password-input"
            className="text-input"
            type="password"
            //   cols={50}
            helperText=""
            invalidText="Invalid error message."
            labelText="Password"
            placeholder="Enter Password"
            name="password"
            onChange={this.handleChange}
            //   rows={4}
          />
        </div>

        <Button kind="secondary" onClick={this.handleClick}>
          Submit
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps=dispatch=>({
  setCurrentUser:user=>dispatch(setCurrentUser(user))
});

export default connect(null,mapDispatchToProps)(LoginPage);
