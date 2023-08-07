import React, { useRef, useState } from 'react'
import '../PriceList/priceList.css'
import LOGO from '../../assets/logo.jpeg'
import { MdAdd, MdClear } from 'react-icons/md'
import { BsDownload } from 'react-icons/bs'
import { useReactToPrint } from 'react-to-print'

export default function Invoice() {
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    particulars: '',
    price: '',
  })

  const componentPDF = useRef()

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    onAfterPrint: () => alert('Good job!'),
    print: false,
    fileName: 'invoice.pdf',
  })

  const onClose = () => {
    setOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setData([...data, formData])
    setFormData({ particulars: '', price: '' })
    onClose(true)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      time: Date.now(),
    })
  }

  const formatTimestamp = (timestamp) => {
    const dateObject = new Date(timestamp)
    return dateObject.toLocaleString()
  }

  const clearData = () => {
    const confirmClear = window.confirm(
      'Are you sure you want to clear the data?',
    )
    if (confirmClear) {
      setData([])
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="buttons">
        <div className="add__button" onClick={() => setOpen(true)}>
          <MdAdd size={25} />
        </div>
        {data.length > 0 && (
          <div className="download__button" onClick={generatePDF}>
            <BsDownload size={22} />
          </div>
        )}
        {data.length > 0 && (
          <div className="clear__button" onClick={clearData}>
            <MdClear size={25} />
          </div>
        )}
      </div>

      <div className="sheet__container">
        <div className="sheet" ref={componentPDF} style={{ width: '100%' }}>
          <div className="heading">
            <img src={LOGO} alt="logo" className="page__logo" />
            <p>Contact : +91 81 56 928 557 | +91 79 07 132 007</p>
            <div className="line"></div>
          </div>

          <div className="invoice__container">
            <table className="invoice__table">
              <thead className="invoice__heading">
                <tr>
                  <th>Date&Time</th>
                  <th>Particulars</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.time} className="invoice__data">
                    <td>{formatTimestamp(item.time)}</td>
                    <td>{item.particulars}</td>
                    <td>Rs. {item.price} /-</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {open && (
        <div className="dialog-container">
          <div className="dialog">
            <h3>Enter Invoice Details</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Particulars:</label>
                <input
                  type="text"
                  name="particulars"
                  value={formData.particulars}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Price:</label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="dialogue__btn">
                <button type="submit">Submit</button>
                <button type="button" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
