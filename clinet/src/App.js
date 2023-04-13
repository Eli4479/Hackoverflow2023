import React from "react";
import Grid from "./components/Grid";
import Navbar from "./components/Nav";
import Form from "./components/Form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="">
      {/* <Navbar />
      <Grid /> */}
      {/* <Form /> */}
      <Router>
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <Grid />
            </>
          } />
          <Route path="/form" element={<Form />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
