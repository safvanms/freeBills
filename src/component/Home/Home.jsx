import React from 'react'
import './home.css'
import LOGO from '../../assets/logo.jpeg'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="home">
      <img src={LOGO} alt="logo" className="home__logo" />
      <div className="home__buttons">
        <Link to="/products" style={{ textDecoration: 'none' }}>
          <div className="products__page"> Accessories </div>
        </Link>
        <Link to="/bill-with-price" style={{ textDecoration: 'none' }}>
          <div className="bill__page"> Generate Bill </div>
        </Link>
        <Link to="/invoice" style={{ textDecoration: 'none' }}>
          <div className="invoice__page"> Invoice </div>
        </Link>
      </div>
    </div>
  )
}
