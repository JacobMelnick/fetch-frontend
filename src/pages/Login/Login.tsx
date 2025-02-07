import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // implement login logic here
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            margin="normal"
            value={username}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(event.target.value)
            }
          />
          <TextField
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value)
            }
          />
        </form>
      </CardContent>
      <CardActions>
        <Button type="submit" color="primary">
          Login
        </Button>
      </CardActions>
    </Card>
  );
};

export default Login;
