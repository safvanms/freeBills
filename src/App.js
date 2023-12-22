import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Layout/Home/Home';
import ProductList from './Layout/Products/ProductList';
import Invoice from './Layout/Invoice/Invoice';
import PriceList from './Layout/PriceList/PriceList';


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/bill-with-price' element={<PriceList />} />
          <Route path='/products' element={<ProductList />} />
          <Route path='/invoice' element={<Invoice />} />
          <Route path='/*' element={<Home />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
