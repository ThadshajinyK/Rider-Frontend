import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [riders, setRiders] = useState([]);

  useEffect(() => {
    loadRiders();
  }, []);

  const loadRiders = async () => {
    const results = await axios.get("http://localhost:8080/riders");
    console.log(results.data);
    setRiders(results.data);
  };
  return (
    <div className="container">
      <div className="py-4">
        <Link className="btn btn-outline-success mb-4" to="/addrider">Add Rider</Link>
        
        <table class="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Position</th>
              <th scope="col">NRIC</th>
              <th scope="col">Status</th>
              {/* <th scope="col">Image</th> */}
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.position}</td>
                <td>{rider.nic}</td>
                <td>{rider.status ? (
                 <span class="badge text-bg-success">Success</span>
                ):(<span class="badge text-bg-danger">Not Active</span>)}</td>
                {/* <td>
  {rider.status ? (
    <span className="badge badge-success">Active</span>
  ) : (
    <span className="badge badge-danger">Not Active</span>
  )}
</td> */}
                {/* <td>
                  <img src={rider.image} alt="rider" />
                </td> */}
                <td>
                  <button className="btn btn-primary mx-2">View</button>
                  <Link className="btn btn-outline-secondary mx-2" to={`/editrider/${rider.id}`}>
                    Edit
                  </Link>
                  <button className="btn btn-danger mx-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
