import React from 'react'
import './header.css'
import LOGO from '../../assets/logo.jpeg'

export default function Header() {
  return (
    <div className="heading">
      <img src={LOGO} alt="logo" className="page__logo" />
      <p className="license">
        {' '}
        License No : B1-143/19.20 &nbsp; MSME Reg No : KL09E0004583
      </p>
      <p className="contact">Contact : +91 81 56 928 557 | +91 79 07 132 007</p>
      <div className="line"></div>
    </div>
  )
}
