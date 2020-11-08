import React from "react";
import { Button, TextInput } from "carbon-components-react";

const LoginPage = () => (
  <div className="loginpage">
    <h1 className="heading">View User Posts</h1>
    <TextInput
      id="email-input"
      className="text-input"
      type="email"
      //   cols={50}
      helperText=" "
      invalidText="Invalid error message."
      labelText="Email"
      placeholder="Enter Email"
      //   rows={4}
    />
    <TextInput
      id="password-input"
      className="text-input"
      type="password"
      //   cols={50}
      helperText=" "
      invalidText="Invalid error message."
      labelText="Password"
      placeholder="Enter Password"
      //   rows={4}
    />
    <Button kind="secondary">Submit</Button>
  </div>
);

export default LoginPage;
