import './App.css';
import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './components/Login/login'
import Sidebar from './components/Sidebar/Sidebar';
import Home from './components/Home/Home';
import ViewCategory from './components/Category/ViewCategory';
import AddProduct from './components/Product/AddProduct';
import ViewProduct from './components/Product/ViewProduct';
import AddCategory from "./components/Category/AddCategory"


const App = () => {
 

  return (
   <Router>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/sidebar' element={<Sidebar/>}/> 
       <Route path='/home' element={<Home/>}/> 
       <Route path='/addcategory' element={<AddCategory/>}/> 
       <Route path='/viewcategory' element={<ViewCategory/>}/> 
       <Route path='/addproduct' element={<AddProduct/>}/> 
       <Route path='/viewproduct' element={<ViewProduct/>}/> 
    

    </Routes>
   </Router>
  );
}

export default App;
