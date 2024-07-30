import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookGallery from "../src/pages/BookGallery";
import Header from "../src/component/Header";
import Register from "../src/pages/Register";
import LogIn from "../src/pages/LogIn";
import Homepage from "../src/pages/Homepage";

function App() {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/bookgallery" element={<BookGallery />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
