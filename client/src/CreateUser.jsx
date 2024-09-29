import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [designation, setDesignation] = useState("HR");
  const [gender, setGender] = useState("M");
  const [course, setCourse] = useState([]);
  const [image, setImage] = useState(null); // State for image upload
  const [createdate, setCreatedate] = useState(
    new Date().toISOString().slice(0, 10)
  ); // Default to today's date
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setCourse([...course, value]);
    } else {
      setCourse(course.filter((c) => c !== value));
    }
  };

  const Submit = (e) => {
    e.preventDefault();
    if (
      !name ||
      !email ||
      !age ||
      !designation ||
      !gender ||
      !course.length ||
      !image
    ) {
      enqueueSnackbar("Please fill out all fields", { variant: "error" });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("age", age);
    formData.append("designation", designation);
    formData.append("gender", gender);
    formData.append("course", course);
    formData.append("image", image); // Append the image file to formData
    formData.append("createdate", createdate); // Append createdate

    axios
      .post("http://localhost:3001/createUser", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      })
      .then((result) => {
        console.log(result);
        enqueueSnackbar("User created successfully!", { variant: "success" });
        navigate("/users");
      })
      .catch((err) => {
        enqueueSnackbar("Error: " + err.message, { variant: "error" });
        console.log(err);
      });
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <h2 className="text-center mb-4">Create Employee</h2>
        <Link to="/" className="btn btn-danger">
          {" "}
          Logout{" "}
        </Link>

        <form onSubmit={Submit}>
          <div className="mb-2">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter Email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label>Age</label>
            <input
              type="number"
              placeholder="Enter Age"
              className="form-control"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label>Designation</label>
            <select
              className="form-control"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            >
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <div className="mb-2">
            <label>Gender</label>
            <div>
              <input
                type="radio"
                value="M"
                checked={gender === "M"}
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Male
              <input
                type="radio"
                value="F"
                checked={gender === "F"}
                onChange={(e) => setGender(e.target.value)}
                className="ms-3"
              />{" "}
              Female
            </div>
          </div>
          <div className="mb-2">
            <label>Course</label>
            <div>
              <input
                type="checkbox"
                value="MCA"
                onChange={handleCheckboxChange}
              />{" "}
              MCA
              <input
                type="checkbox"
                value="BCA"
                onChange={handleCheckboxChange}
                className="ms-3"
              />{" "}
              BCA
              <input
                type="checkbox"
                value="BSC"
                onChange={handleCheckboxChange}
                className="ms-3"
              />{" "}
              BSC
            </div>
          </div>
          <div className="mb-2">
            <label>Created Date</label>
            <input
              type="date"
              className="form-control"
              value={createdate}
              onChange={(e) => setCreatedate(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label>Upload Image</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
