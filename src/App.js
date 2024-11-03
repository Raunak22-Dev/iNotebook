import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NoteState } from "./context/notes/notesContext"; // Named import
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";

function App() {
  return (
    <NoteState>
      <div className="App">
        <Router>
          <Navbar />
          <div className="container ">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </Router>
      </div>
    </NoteState>
  );
}

export default App;

