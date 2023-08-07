import React, { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import './priceList.css'
import { BsDownload } from 'react-icons/bs'
import { MdAdd, MdClear } from 'react-icons/md'
import LOGO from '../../assets/logo.jpeg'


const PriceList = () => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState([])
  const [formData, setFormData] = useState({
    item: '',
    quantity: '',
    unit: '',
    price: '',
  })

  const componentPDF = useRef()

  useEffect(() => {
    const storedData = localStorage.getItem('tableData')
    if (storedData) {
      setData(JSON.parse(storedData))
    }
  }, [])

  const handleChange = (e) => {
    if (e.target.name === 'unit') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      })
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        id: Date.now().toString(),
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setData([...data, formData])
    setFormData({ item: '',quantity:'', unit: '', price: '' })
    onClose()
  }

  const pageStyle = {
    width: '100%',
  }

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    onAfterPrint: () => alert('Good job!'),
    pageStyle: pageStyle,
    print: false ,
    fileName: 'empire.pdf', 
  });

  const calculateTotal = () => {
    return data.reduce((total, elem) => total + parseFloat(elem.price), 0)
  }

  const onClose = () => {
    setOpen(false)
  }

  const clearData = () => {
    const confirmClear = window.confirm(
      'Are you sure you want to clear the data?',
    )
    if (confirmClear) {
      localStorage.removeItem('tableData')
      setData([])
    }
  }

  useEffect(() => {
    localStorage.setItem('tableData', JSON.stringify(data))
  }, [data])



  return (
    <div className="home__container">
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
        <div className="sheet"  ref={componentPDF} style={{ width: '100%' }}>
          <div className="heading">
            <img src={LOGO} alt="logo" className="page__logo" />
            <p>Contact : +91 81 56 928 557 | +91 79 07 132 007</p>
            <div className="line"></div>
          </div>

          <table className="table__container">
            <thead className="table__heads">
              <tr>
                <th>Sl no.</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody className="table__body">
              {data?.map((elem, i) => (
                <tr key={elem.id}>
                  <td>{i + 1}</td>
                  <td>{elem.item}</td>
                  <td>{elem.quantity} {elem.unit}</td>
                  <td>{elem.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h5 className="total__sec" style={{}}>
            Grand Total : {calculateTotal()} /-
          </h5>
        </div>
      </div>

      {open && (
        <div className="dialog-container">
          <div className="dialog">
            <h3>Enter Item Details</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Item:</label>
                <input
                  type="text"
                  name="item"
                  value={formData.item}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Quantity:</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Unit:</label>
                <select
                  value={formData.unit}
                  name="unit"
                  onChange={handleChange}
                >
                  <option value="">Select unit</option>
                  <option value="Piece">Piece</option>
                  <option value="Meter">Meter</option>
                </select>
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

export default PriceList
