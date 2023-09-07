import { React, useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    // prevents the page from reloading when you click the submit button (reloading is the button's default behavior)
    event.preventDefault();

    const data = {
      access: username,
      secret: password
    };

    fetch("https://cinedata-05d7865bba09.herokuapp.com/login", {
      method: "POST",
      body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Login response: ", data);
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorgae.setItem("token", data.token);
                onLoggedIn(data.user, data.token);
            } else {
                alert("No such user");
            }
        })
        .catch((e) => {
            alert("Something went wrong");
        });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
        />
      </label>
      <label>
        Password:
        <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
      </label>
      <button type="submit">
        Submit
      </button>
    </form>
  );
};