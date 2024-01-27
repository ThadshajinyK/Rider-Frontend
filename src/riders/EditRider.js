import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EdidRider() {
  let navigate = useNavigate();

  const{id}=useParams()

  const [rider, setRider] = useState({
    name: "",
    email: "",
    position: "",
    nic: "",
    status: "", // active or not active
    image: null,
  });

  const { name, email, position, nic, status, image } = rider;
  const onInputChange = (e) => {
    setRider({ ...rider, [e.target.name]: e.target.value });
  };



  const onFileChange = (e) => {
    setRider({ ...rider, image: e.target.files[0] });
  };

  useEffect(() => {
    loadRiders();
  }, []);
  
  async function onSubmit(e) {
        e.preventDefault();

        await axios.put(`http://localhost:8080/rider/${id}`, rider);
        navigate("/");
    }

  const loadRiders= async() => {
    const result= axios.get(`http://localhost:8080/rider/${id}`);
    setRider(result.data)
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
            <label htmlFor="Name" className="form-label text-start">
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
            </div>

            <button className="btn btn-outline-success m-3" type="submit">
              Submit
            </button>
            <Link className="btn btn-outline-danger m-3" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
