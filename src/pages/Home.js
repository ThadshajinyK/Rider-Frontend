import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Home() {
  const [search, setSearch] = useState("");

  const [riders, setRiders] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadRiders();
  }, []);

  const loadRiders = async () => {
    try{
    const results = await axios.get("http://localhost:8080/riders");
    console.log(results.data);
    setRiders(results.data);
    } catch (error){
      console.error("Error fetching riders:", error);
    }
  };

  const deleteRider = async (id) => {
    try{
      await axios.delete(`http://localhost:8080/rider/${id}`);
      console.log(search);
      loadRiders();
    } catch (error){
      console.error("Error deleting rider:",error);
    }
    
  };
  return (
    <div className="container">
      <div className="py-4">
        <div className="mb-2">
          <form className="d-flex con" role="search">
            <input
              className="form-control m-2 "
              type="search"
              placeholder="Search rider"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* <button className="btn btn-secondary" type="submit">
              Search
            </button> */}
          </form>
        </div>

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
          {riders
              .filter((rider) => {
                const searchTermLower = search.toLowerCase();
                return (
                  rider.name.toLowerCase().includes(searchTermLower) ||
                  rider.email.toLowerCase().includes(searchTermLower) ||
                  rider.id.toString().includes(searchTermLower)
                );
              })
              .map((rider) => (
                <tr key={rider.id}>
                  <th scope="row">
                    {rider.id}
                  </th>
                  <td>{rider.name}</td>
                  <td>{rider.email}</td>
                  <td>{rider.position}</td>
                  <td>{rider.nic}</td>
                  <td>
                    {rider.status ? (
                      <span class="badge text-bg-success">Active</span>
                    ) : (
                      <span class="badge text-bg-danger">Not Active</span>
                    )}
                  </td>
                 
                  <td>
                    <Link
                      className="btn btn-primary mx-2"
                      to={`/viewrider/${rider.id}`}
                    >
                      View
                    </Link>
                    <Link
                      className="btn btn-outline-secondary mx-2"
                      to={`/editrider/${rider.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteRider(rider.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-end">
          <li class="page-item disabled">
            <a class="page-link">Previous</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              1
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              2
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              3
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
