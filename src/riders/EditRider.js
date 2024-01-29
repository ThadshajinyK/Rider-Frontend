import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EdidRider() {
  let navigate = useNavigate();

  const{id}=useParams();

  const [rider, setRider] = useState({
    name: "",
    email: "",
    position: "",
    nic: "",
    status: "", // active or not active
    // image: null,
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  const { name, email, position, nic, status} = rider;
  // const { name, email, position, nic, status, image } = rider;

  const onInputChange = (e) => {
    setRider({ ...rider, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    // Validate name
    if (!name.trim()) {
      setAlertMessage("Name is required");
      setAlertType("danger");
      setShowAlert(true);
      return false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setAlertMessage("Valid email address is required");
      setAlertType("danger");
      setShowAlert(true);
      return false;
    }

    // Validate position
    if (!position.trim()) {
      setAlertMessage("Position is required");
      setAlertType("danger");
      setShowAlert(true);
      return false;
    }

    // Validate NIC
    const nicRegex = /^[0-9]{9}[vVxX]$/;
    if (!nic.trim() || !nicRegex.test(nic)) {
      setAlertMessage("Valid NIC number is required");
      setAlertType("danger");
      setShowAlert(true);
      return false;
    }

    // Validate status
    if (!status) {
      setAlertMessage("Status is required");
      setAlertType("danger");
      setShowAlert(true);
      return false;
    }

    // Validate image
    // if (!image) {
    //   setAlertMessage("Image is required");
    //   setAlertType("danger");
    //   setShowAlert(true);
    //   return false;
    // }

    return true;
  };

  // const onFileChange = (e) => {
  //   setRider({ ...rider, image: e.target.files[0] });
  // };

  useEffect(() => {
    loadRider();
  }, []);
  
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await axios.put(`http://localhost:8080/rider/${id}`, rider);
      setAlertMessage("Rider updated successfully");
      setAlertType("success");
      setShowAlert(true);
      navigate("/");
    } catch (error) {
      console.error("Error updating rider:", error);
      setAlertMessage("Error updating rider");
      setAlertType("danger");
      setShowAlert(true);
    }
  };

  const loadRider= async() => {
   try {
      const result = await axios.get(`http://localhost:8080/rider/${id}`);
      setRider(result.data);
    } catch (error) {
      console.error("Error loading rider:", error);
      setAlertMessage("Error loading rider");
      setAlertType("danger");
      setShowAlert(true);
    }
  };

  return (
    <div className="container">
      <div className="row">
        {/* Rider form header */}
        <div className="offset-md-3 col-md-6 border rounded p-1 mt-2 shadow">
          <h2 className="text-center m-4">Edit Rider</h2>
          {/* name */}
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label text-start">
                Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Rider name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            {/* email */}
            <div className="mb-3">
              <label htmlFor="Name" className="form-label text-start">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter rider's email address"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            {/* Position */}
            <div className="mb-3">
              <label htmlFor="Name" className="form-label text-start">
                Position
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Rider name"
                name="position"
                value={position}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            {/* NIC */}
            <div className="mb-3">
              <label htmlFor="Name" className="form-label text-start">
                NRIC
              </label>
              <input
                type="{text}"
                className="form-control"
                placeholder="Enter NIC number"
                name="nic"
                value={nic}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            {/*  status - active or not active*/}
            <div className="mb-3">
              <label htmlFor="Name" className="form-label text-start">
                Status
              </label>
              <select
                className="form-select form-select-md"
                aria-label="Small select example"
                value={status}
                onChange={(e) => onInputChange(e)}
              >
                <option value="" selected>
                  Choose...
                </option>
                <option value="true">Active</option>
                <option value="false">Not Active</option>
              </select>
            </div>

            {/* Upload picture */}
            {/* <label htmlFor="Name" className="form-label text-start">
              Image
            </label>
            <div className="input-group mb-3">
              <input
                type="file"
                className="form-control"
                id="image"
                onChange={(e) => onFileChange(e)}
              />
              <label className="input-group-text" for="inputGroupFile02">
                Upload
              </label>
            </div> */}

            <button className="btn btn-outline-success m-3" type="submit">
              Update
            </button>
            <Link className="btn btn-outline-danger m-3" to="/">
              Cancel
            </Link>
            {showAlert && (
        <div className={`alert alert-${alertType}`} role="alert">
          {alertMessage}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setShowAlert(false)}
          ></button>
        </div>
      )}
          </form>
        </div>
      </div>
    </div>
  );
}
