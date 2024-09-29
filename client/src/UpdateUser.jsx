import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";

const UpdateUser = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [designation, setDesignation] = useState("HR");
  const [gender, setGender] = useState("M");
  const [course, setCourse] = useState([]);
  const [createdate, setCreatedate] = useState(""); // Keep as string for display
  const [image, setImage] = useState(null); // State for image upload
  const [currentImage, setCurrentImage] = useState(""); // State for displaying current image path

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios
      .get("http://localhost:3001/getUser/" + id)
      .then((result) => {
        setName(result.data.name);
        setEmail(result.data.email);
        setAge(result.data.age);
        setDesignation(result.data.designation);
        setGender(result.data.gender);
        setCourse(result.data.course);
        setCreatedate(
          new Date(result.data.createdate).toISOString().slice(0, 10)
        ); // Convert createdate to YYYY-MM-DD
        setCurrentImage(result.data.image); // Set current image path
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setCourse([...course, value]);
    } else {
      setCourse(course.filter((c) => c !== value));
    }
  };

  const Update = (e) => {
    e.preventDefault();
    if (!name || !email || !age || !designation || !gender || !course.length) {
      enqueueSnackbar("Please fill out all fields", { variant: "error" });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("age", age);
    formData.append("designation", designation);
    formData.append("gender", gender);
    formData.append("course", JSON.stringify(course)); // Convert array to string for backend
    formData.append("createdate", createdate);
    if (image) {
      formData.append("image", image); // Append image if uploaded
    }

    axios
      .put("http://localhost:3001/updateUser/" + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the header for form data
        },
      })
      .then((result) => {
        console.log(result);
        enqueueSnackbar("User updated successfully!", { variant: "success" });
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
        <h2 className="text-center mb-4">Edit Employee</h2>
        <Link to="/" className="btn btn-danger">
          {" "}
          Logout{" "}
        </Link>
        <form onSubmit={Update}>
          <div className="mb-2">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label>Age</label>
            <input
              type="number"
              placeholder="Enter Age"
              className="form-control"
              value={age}
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
                checked={course.includes("MCA")}
                onChange={handleCheckboxChange}
              />{" "}
              MCA
              <input
                type="checkbox"
                value="BCA"
                checked={course.includes("BCA")}
                onChange={handleCheckboxChange}
                className="ms-3"
              />{" "}
              BCA
              <input
                type="checkbox"
                value="BSC"
                checked={course.includes("BSC")}
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
            {/* Display current createdate */}
            {/* <div className="mt-2">Current Created Date: {createdate}</div> */}
          </div>
          <div className="mb-2">
            <label>Current File</label>
            <div>{currentImage}</div> {/* Display current image path */}
            <label>Upload Image</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
