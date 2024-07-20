import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { List, Create, Edit } from "./Components/Restaurants";
// import Create from "./Components/Restaurants/Create";
// import Edit from "./Components/Restaurants/Edit";
import Header from "./Components/Layouts/Header";
import Footer from "./Components/Layouts/Footer";


function App() {
  return (
    <div className="App">
        <h1>Food Delight</h1>
        <Router>
            <Header />
                <Routes>
                    <Route name= 'Home' path="/" element={<List />} />
                    <Route name= 'Create' path="/create" element={<Create />} />
                    <Route name= 'Edit' path="/edit" element={<Edit />} />
                </Routes>
            <Footer />
        </Router>
        
  </div>
  );
}

export default App;
