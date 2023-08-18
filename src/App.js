import React from 'react';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './component/Home/Home';
import PriceList from './component/PriceList/PriceList';
import ProductList from './component/Products/ProductList';
import Invoice from './component/Invoice/Invoice';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Home/>} />
        <Route path='/bill-with-price' element={<PriceList/>} />
        <Route path='/products' element={<ProductList/>} />
        <Route path='/invoice' element={<Invoice/>} />
        <Route path='/*' element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
