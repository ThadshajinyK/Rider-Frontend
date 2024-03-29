import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddRider from "./riders/AddRider";
import EdidRider from "./riders/EditRider";
import ViewRider from "./riders/ViewRider";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addrider" element={<AddRider/>} />
          <Route exact path="/editrider/:id" element={<EdidRider/>}/>
          <Route exact path="/viewrider/:id" element={<ViewRider/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
