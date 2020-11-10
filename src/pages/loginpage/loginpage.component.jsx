import React from "react";
import { Button, TextInput } from "carbon-components-react";
import { setCurrentUser } from "../../redux/user/user.actions";
import { connect } from "react-redux";
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
    this.setState({ [name]: e.target.value, isEmailInvalid: false });
  };

  handleClick = (e) => {
    const BASE_URL = "https://dummyapi.io/data/api";
    const APP_ID = "5fa4f09c8a129ee167647e57";

    fetch(`${BASE_URL}/user`, {
      headers: { "app-id": APP_ID },
    })
      .then((response) => response.json())
      .then(({ data }) => {
        // console.log(data);
        return data.filter(
          (user) => user.email.toLowerCase() === this.state.email.toLowerCase()
        )[0];
      })
      .then((requiredUser) => {
        if (requiredUser === undefined || requiredUser.length === 0) {
          this.setState({
            isEmailInvalid: true,
            emailInvalidText: "Enter valid Email ID",
          });
        } else {
          this.props.setCurrentUser(requiredUser);
        }
      });
  };

  render() {
    return (
      <div>
        <div className="note">
          <h4>NOTE: user any of these mailID's for test puposes</h4>
          <br />
          <p>heinz-georg.fiedler@example.com</p>
          <p>katie.hughes@example.com</p>
          <p>vetle.aasland@example.com</p>
          <p>dylan.vasquez@example.com</p>
          <p>margarita.vicente@example.com</p>
          <p>joey.oliver@example.com</p>
          <p>lilja.lampinen@example.com</p>
          <p>abigail.liu@example.com</p>
          <p>melanie.pilz@example.com</p>
          <p>evan.carlson@example.com</p>
          <p>kitty.steward@example.com</p>
          <p>vanessa.ramos@example.com</p>
          <p>olai.gomes@example.com</p>
          <p>constance.bourgeois@example.com</p>
          <p>kenneth.carter@example.com</p>
          <p>sigmund.myran@example.com</p>
          <p>josefina.calvo@example.com</p>
          <p>annabel.somby@example.com</p>
          <p>friedrich-karl.brand@example.com</p>
          <p>sibylle.leibold@example.com</p>
        </div>
        <div className="loginpage">
          <h2 className="heading">Manage Your Posts</h2>
          <div className="input-box">
            <TextInput
              id="email-input"
              className="text-input"
              type="email"
              invalid={this.state.isEmailInvalid}
              invalidText={this.state.emailInvalidText}
              labelText="Email"
              placeholder="Enter Email"
              name="email"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-box">
            <TextInput
              id="password-input"
              className="text-input"
              type="password"
              invalidText="Invalid error message."
              labelText="Password"
              placeholder="Enter Password"
              name="password"
              onChange={this.handleChange}
            />
          </div>

          <Button kind="primary" onClick={this.handleClick}>
            Login
          </Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(LoginPage);
