import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

const Users = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001")
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/deleteUser/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
        enqueueSnackbar("User deleted successfully!", { variant: "success" });
      })
      .catch((err) => {
        enqueueSnackbar("Error: " + err.message, { variant: "error" });
        console.log(err);
      });
  };
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <h2 className="text-center mb-4">Employee List</h2>
        <Link to="/create" className="btn btn-success">
          {" "}
          Add{" "}
        </Link>
        <Link to="/" className="btn btn-danger">
          {" "}
          Logout{" "}
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Courses</th>
              <th>Create Date</th>
              <th>File</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>{user.designation}</td>
                  <td>{user.gender}</td>
                  <td>{user.course.join(", ")}</td>
                  <td>{new Date(user.createdate).toLocaleDateString()}</td>{" "}
                  {/* Format createdate */}
                  <td>{user.image}</td> {/* Display image path */}
                  <td>
                    <Link
                      to={`/update/${user._id}`}
                      className="btn btn-success"
                    >
                      Update
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
