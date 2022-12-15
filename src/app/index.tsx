import React from "react";
import { Route, Routes } from "react-router-dom";
import '../styles.scss';
import { Authentication } from './Components/Authentication'
function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Authentication />} />
    </Routes> )

}


export default App;
