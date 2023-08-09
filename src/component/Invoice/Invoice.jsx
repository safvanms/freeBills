import React, { useRef, useState } from 'react'
import '../PriceList/priceList.css'
import LOGO from '../../assets/logo.jpeg'
import SIGN from '../../assets/sign.png'
import { MdAdd, MdClear } from 'react-icons/md'
import { BsDownload } from 'react-icons/bs'
import { useReactToPrint } from 'react-to-print'

export default function Invoice() {
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    particulars: '',
    price: '',
  })

  const componentPDF = useRef()

  const downloadPdf = useReactToPrint({
    content: () => componentPDF.current,
    print: false,
    fileName: 'invoice.pdf',
  })

  const onClose = () => {
    setOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setData([...data, formData])
    setFormData({ particulars: '', price: '', name: '' })
    onClose(true)
  }

  const handleChange = (e) => {
    if (e.target.name === 'gender') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      })
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        time: Date.now(),
      })
    }
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

  const calculateTotal = () => {
    return data.reduce((total, elem) => total + parseFloat(elem.price), 0)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="buttons">
        {data.length === 0 && (
          <div className="add__button" onClick={() => setOpen(true)}>
            <MdAdd size={25} />
          </div>
        )}
        {data.length > 0 && (
          <div className="download__button" onClick={downloadPdf}>
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
            <p className="license">
              {' '}
              License No : B1-143/19.20 &nbsp; MSME Reg No : KL09E0004583
            </p>
            <p className="contact">
              Contact : +91 81 56 928 557 | +91 79 07 132 007
            </p>
            <div className="line"></div>
          </div>
          {data &&
            data.map((item) => (
              <h5 style={{ margin: 0 }}>
                <span style={{ color: 'gray' }}>Customer : </span> {item.gender}{' '}
                {item.name}
              </h5>
            ))}
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
            <div className="invoice__footer">
              <div className="invoice__total__name">Total</div>
              <div className="invoice__total">Rs.{calculateTotal()}/-</div>
            </div>
          </div>

         { data.length !==0 && (<div className="invoice__signature">
            <p>Invoice issued by Empire Electricals.</p>
            <img src={SIGN} alt="sign" />
          </div>)}

          <p style={{ margin: '0px', fontSize: '10px' }}>
           <span>Thank you | Empire Electricals & Group of Technologies</span>
          </p>
        </div>
      </div>

      {open && (
        <div className="dialog-container">
          <div className="dialog">
            <h3>Enter Invoice Details</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Mr / Ms:</label>
                <select
                  value={formData.gender}
                  name="gender"
                  onChange={handleChange}
                  style={{ width: '50%', height: '30px' }}
                  required
                >
                  <option value="">Select</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Miss.">Miss.</option>
                  <option value="Mrs.">Mrs.</option>
                </select>
              </div>

              <div>
                <label>Customer Name:</label>
                <input
                  type="text"
                  name="name"
                  placeholder=" Enter customer's Name "
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Particulars:</label>
                <input
                  type="text"
                  name="particulars"
                  placeholder=" Cash received "
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
                  placeholder=" Enter Amount "
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
