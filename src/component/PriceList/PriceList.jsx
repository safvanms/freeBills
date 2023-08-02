import React, { useEffect , useRef, useState } from 'react'
import {useReactToPrint} from 'react-to-print'
import './priceList.css'
import { BsDownload } from 'react-icons/bs'
import { MdAdd, MdClear } from 'react-icons/md'
import LOGO from '../../assets/logo.jpeg'


const PriceList = () => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState([])
  const [formData, setFormData] = useState({
    item: '',
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      id: Date.now().toString(),
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setData([...data, formData])
    setFormData({ item: '', unit: '', price: '' })
    onClose()
  }

  const generatePDF = useReactToPrint({
    content: ()=>componentPDF.current,
    onAfterPrint: ()=>alert('Saved as Pdf ')
  })
  
  const calculateTotal = () => {
    return data.reduce((total, elem) => total + parseFloat(elem.price), 0);
  };

  const onClose = () => {
    setOpen(false)
  }

  const clearData = () => {
    const confirmClear = window.confirm('Are you sure you want to clear the data?');
    if (confirmClear) {
      localStorage.removeItem('tableData');
      setData([]);
    }
  };

  useEffect(() => {
    localStorage.setItem('tableData', JSON.stringify(data))
  }, [data])


  return (
    <div className="home__container">

      <div className="buttons">
        <div className="add__button" onClick={() => setOpen(true)}>
          <MdAdd size={25} />
        </div>
        {data.length>0&&<div className="download__button" onClick={generatePDF}>
          <BsDownload size={22} />
        </div>}
       {data.length>0&& <div className="clear__button" onClick={clearData}>
          <MdClear size={25}  />
        </div>}
      </div>

      <div className="sheet" ref={componentPDF} style={{width:"100%"}}>
      <div className="heading">
          <img src={LOGO} alt="logo" className="page__logo" />
          <p style={{margin:0,fontSize:'9px'}}>Contact : +91 81 56 928 557 |  +91 79 07 132 007</p>
          <div className='line' ></div>
        </div>

        <table  className="table__container">
          <thead className="table__heads">
            <tr>
              <th>Sl no.</th>
              <th>Item</th>
              <th>Unit</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {data?.map((elem, i) => (
              <tr>
                <td>{i + 1}</td>
                <td>{elem.item}</td>
                <td>{elem.unit}</td>
                <td>{elem.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h5 className='total__sec' style={{}}>Grand Total : {calculateTotal()} /-</h5>
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
                <label>Unit:</label>
                <input
                  type="number"
                  name="unit"
                  value={formData.unit}
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
              <div className='dialogue__btn'>
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
