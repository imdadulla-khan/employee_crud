import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Define your admin credentials here
    const adminUsername = "admin";
    const adminPassword = "admin123";

    // Validate the entered credentials
    if (username === adminUsername && password === adminPassword) {
      localStorage.setItem("isAdmin", "true");
      navigate("/dashboard"); // Redirect to the Users page
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-25 bg-white rounded p-3">
        <h2 className="text-center mb-4">Login Page</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-2">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-success">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
