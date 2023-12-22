import React, { useRef, useState } from 'react'
import '../PriceList/priceList.css'
import SIGN from '../../assets/sign.png'
import { MdAdd, MdClear, MdOutlineClose } from 'react-icons/md'
import { BsDownload } from 'react-icons/bs'
import { useReactToPrint } from 'react-to-print'
import { PASSWORD } from '../../credentials'
import Header from '../../component/Header/Header'

export default function Invoice() {
  const [data, setData] = useState([])
  const [time, setTime] = useState(null)
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    particulars: '',
    price: '',
    advancePrice: '',
  })

  const componentPDF = useRef()

  const downloadPdf = useReactToPrint({
    content: () => componentPDF.current,
    print: false,
    fileName: 'invoice.pdf',
  })

  const getDownload = () => {
    const password = prompt('Enter your password ');
    if ( password === PASSWORD) {
      downloadPdf()
    } else {
      alert('Wrong Password , try again');
    }
  };


  const onClose = () => {
    setOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setData([...data, formData])
    setFormData({ particulars: '', price: '', name: '' })
    setTime(formData.time)
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
    const options = {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    }

    const formattedDate = dateObject.toLocaleString('en-US', options)
    return formattedDate.replace(',', '')
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
    let advance = data.reduce(
      (sum, item) => sum + parseFloat(item.advancePrice || 0),
      0,
    )
    let totalPrice = data.reduce(
      (sum, item) => sum + parseFloat(item.price || 0),
      0,
    )
    return totalPrice - advance
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="buttons">
        <div className="add__button" onClick={() => setOpen(true)}>
          <MdAdd size={25} />
        </div>
        {data.length > 0 && (
          <div className="download__button" onClick={getDownload}>
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
         
         <Header/>

          <div className="name_time_place">
            <div>
              {data &&
                data.map(
                  (item) =>
                    item.name && (
                      <h5 style={{ margin: 0 }}>
                        <span style={{ color: 'gray' }}>To, </span>{' '}
                        {item.gender} {item.name}
                      </h5>
                    ),
                )}
            </div>
            {data.length !== 0 && (
              <div>
                <>On {formatTimestamp(time)}</>
              </div>
            )}
          </div>

          <div className="invoice__container">
            <table className="invoice__table">
              <thead className="invoice__heading">
                <tr>
                  <th>Sl.no</th>
                  <th>Particulars</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, i) => (
                  <tr key={item.time} className="invoice__data">
                    <td>{i + 1}</td>
                    <td style={item.advancePrice ? { color: "grey" } : null}>{item.particulars}</td>
                    <td>Rs. {item.price || item.advancePrice} /-</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="invoice__footer">
              <div className="invoice__total__name">Grand Total :</div>
              <div className="invoice__total">Rs.{calculateTotal()}/-</div>
            </div>
          </div>

          {data.length !== 0 && (
            <div className="invoice__signature">
              <p>Invoice issued by Empire Electricals.</p>
              <img src={SIGN} alt="sign" />
            </div>
          )}

          <p style={{ margin: '0px', fontSize: '10px' }}>
            <span>Thank you | Empire Electricals & Group of Technologies</span>
          </p>
        </div>
      </div>

      {open && (
        <div className="dialog-container">
          <div className="dialog">
            <div className="dialog_header">
              <h2>Enter Invoice Details</h2>
              <div onClick={onClose}>
                <MdOutlineClose
                  style={{ marginTop: '8px' }}
                  size={25}
                  color="lightcoral"
                />
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              {data.length !== 0 ? (
                data.map((name) => {
                  return (
                    !name && (
                      <>
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
                      </>
                    )
                  )
                })
              ) : (
                <>
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
                </>
              )}

              <div>
                <label>Particulars:</label>
                <input
                  type="text"
                  name="particulars"
                  placeholder=" Cash received / advance received "
                  value={formData.particulars}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Price:</label>
                <input
                  className={formData.advancePrice && 'disabled_input'}
                  type="number"
                  name="price"
                  step="0.01"
                  placeholder=" Enter Amount "
                  value={formData.price}
                  onChange={handleChange}
                  disabled={formData.advancePrice}
                />
              </div>

              <div>
                <label> Enter Advance:</label>
                <input
                  className={formData.price && 'disabled_input'}
                  type="number"
                  name="advancePrice"
                  step="0.01"
                  placeholder=" Enter Advance amount "
                  value={formData.advancePrice}
                  onChange={handleChange}
                  disabled={formData.price}
                  style={{ borderColor: 'red' }}
                />
              </div>

              <div className="dialogue__btn">
                <button type="submit">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
