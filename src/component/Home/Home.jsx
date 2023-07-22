import React, { useEffect , useState } from 'react'
import jsPDF from 'jspdf';
import './home.css'
import { BsDownload } from 'react-icons/bs'
import { MdAdd, MdClear } from 'react-icons/md'

const Home = () => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState([])
  const [formData, setFormData] = useState({
    item: '',
    unit: '',
    price: '',
  })

  

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

  
  
    const downloadPDF = () => {
    const isConfirmed = window.confirm('Do you want to download the PDF?');
    if (isConfirmed) {
      const pdf = new jsPDF('p', 'pt', 'a5','1px' );
      
      const pdfElement = document.getElementById('table-to-convert');
      pdf.html(pdfElement, {
        callback: () => {
          pdf.save('table.pdf');
        },
      });
    }
  };
  
  

  const onClose = () => {
    setOpen(false)
  }

  const clearData = () => {
    localStorage.removeItem('tableData')
    setData([])
  }

  useEffect(() => {
    localStorage.setItem('tableData', JSON.stringify(data))
  }, [data])


  return (
    <div className="home__container">
      <div className="buttons">
        <button className="add__button" onClick={() => setOpen(true)}>
          <MdAdd size={22} /> Add
        </button>
        {data.length>0&&<button className="download__button" onClick={downloadPDF}>
          <BsDownload size={20} />
        </button>}
       {data.length>0&& <button className="clear__button" onClick={clearData}>
          <MdClear size={20} style={{marginBottom:"1px"}} /> Clear all
        </button>}
      </div>

      <div className="sheet" id='table-to-convert'>
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

export default Home
