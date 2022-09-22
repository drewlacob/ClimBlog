import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Alert, AlertTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { validateEmail, validatePassword } from "../utils";
import { UserContext } from "../UserContext";
import { createAccount } from "../api/createAccount";

const Register = () => {
  const { isLoggedIn, userID, username } = React.useContext(UserContext);
  const [, setIsLoggedInValue] = isLoggedIn;
  const [, setUserIDValue] = userID;
  const [, setUsername] = username;
  const [hasError, setHasError] = React.useState("");
  const nav = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var email = data.get("email");
    var username = data.get("username");
    var password = data.get("password");
    var password2 = data.get("password2");

    if (!username) {
      setHasError("Please enter a first name!");
      return;
    }

    if (!password || !password2 || !email) {
      setHasError("Please fill out all fields!");
      return;
    }
    if (password !== password2) {
      setHasError("Passwords do not match!");
      return;
    }
    if (password.length < 8) {
      setHasError("Password must be at least 8 characters!");
      return;
    }
    if (!validatePassword(password)) {
      setHasError("Password must have at least one lowercase letter, one uppercase letter, and one number!");
      return;
    }
    if (!validateEmail(email)) {
      setHasError("Invalid email!");
      return;
    }

    console.log(email, password, username);
    var user = await createAccount(email, password, username);
    if (typeof user === "undefined" || typeof user.user_id === "undefined")
      setHasError("Email or username already in use!");
    else {
      setIsLoggedInValue(true);
      setUsername(user.username);
      console.log(user.username);
      setUserIDValue(user.user_id);
      nav("/");
    }
  };
  //todo: change to user names
  //todo: change to login with username and password
  //todo later: separate profile, view profile, add friends, etc
  return (
    <Grid container direction="column" sx={{ display: "flex", alignItems: "center", justifyContent: "center", my: 2 }}>
      <Typography>Create An Account</Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField margin="normal" required fullWidth id="username" label="Username" name="username" />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password2"
          label="Retype Password"
          type="password"
          id="password2"
          autoComplete="current-password"
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Create Account
        </Button>
        {hasError && (
          <Alert severity="error" variant="filled">
            <AlertTitle>Error</AlertTitle>
            {hasError}
          </Alert>
        )}
      </Box>
    </Grid>
  );
};

export default Register;
