import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-25 bg-white rounded p-3">
        <h2 className="text-center mb-4">Your Dashboard</h2>
        <Link className="btn btn-success" to="/users">
          {" "}
          Employees
        </Link>
        <Link className="btn btn-danger" to="/">
          {" "}
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
