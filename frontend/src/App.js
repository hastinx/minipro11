import React, { useState } from 'react';
import './App.css';
import { Login } from './Login';
import { Register } from './Register';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import List from './pages/master/product/list';
import ProductToSell from './pages/transaction/product/product';
import ProductDetail from './pages/transaction/product/detail';
import { useSelector } from 'react-redux';
import MasterCategoryList from './pages/master/category/list';
import CategoryInsertForm from './pages/master/category/insertForm';

function App() {
  const user = useSelector(state => state.user)
  const [currentForm, setCurrentForm] = useState('login')
  const toggleForm = (formName) => {
    setCurrentForm(formName)
  }
  return (
    // <div className="App">
    //   {
    //     currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
    //   }
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/product/list" element={<ProductToSell />} />
        <Route path="/product/detail" element={<ProductDetail />} />

        <Route path="/master/product" element={<List />} />
        <Route path="/master/category" element={<MasterCategoryList />} />
        <Route path="/master/category/insert" element={<CategoryInsertForm />} />



      </Routes>
    </BrowserRouter>

  );
}

export default App;
