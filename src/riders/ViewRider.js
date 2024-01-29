import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";


export default function ViewRider() {
  const [rider, setRider] = useState({
    name: "",
    email: "",
    position: "",
    nic: "",
    status: "", // active or not active
    image: null,
  });

  const { id } = useParams();

  useEffect(() => {
    loadRider();
  }, []);

  const loadRider = async () => {
    const result = await axios.get(`http://localhost:8080/rider/${id}`);
    setRider(result.data);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          {/* Rider form header */}
          <div className="offset-md-3 col-md-6 border rounded p-1 mt-4 shadow">
            <h1 className="text-center m-4">Rider Details</h1>
            {/* <img src="/user-profile.png" alt="User image"></img> */}

            {/* Cards */}
            <div className="card">
              <div className="card-header">Details of Rider id: {rider.id}
            
              </div>

              <ul className="list-group list-group-flush">
                <li className="list-group-item text-start">
                  <b>Name: </b>
                  {rider.name}
                </li>
                <li className="list-group-item text-start">
                  <b>Email: </b>
                  {rider.email}
                </li>
                <li className="list-group-item text-start">
                  <b>NIC: </b>
                  {rider.nic}
                </li>
                <li className="list-group-item text-start">
                  <b>Position: </b>
                  {rider.email.position}
                </li>
                <li className="list-group-item text-start">
                  <b>Status: </b>
                  {rider.status}
                </li>
                {/* <li className="list-group-item">
    <b>Image: </b>
    {rider.image}
</li> */}
              </ul>
            </div>
            <Link className="btn btn-primary my-2" to={"/"}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
