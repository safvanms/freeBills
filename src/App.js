import React from 'react';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './component/Home/Home';
import PriceList from './component/PriceList/PriceList';
import ProductList from './component/Products/ProductList';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' index element={<Home/>} />
        <Route path='/bill-with-price' element={<PriceList/>} />
        <Route path='/products' element={<ProductList/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
