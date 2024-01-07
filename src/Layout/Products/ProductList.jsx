import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import "./productList.css";
import { BsDownload } from "react-icons/bs";
import { MdAdd, MdClear, MdOutlineClose } from "react-icons/md";
import Header from "../../component/Header/Header";

const ProductList = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    item: "",
    quantity: "",
    unit: "",
  });

  const componentPDF = useRef();

  useEffect(() => {
    const storedData = localStorage.getItem("products");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "unit") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        id: Date.now(),
      });
    }
  };

  const handleAdd = () => {
    setData([...data, formData]);
    setFormData({ item: "", quantity: "", unit: "" });
    onClose();
  };

  const handleEdit = (ID) => {
    const rawItems = data.find((item) => item.id === ID);
    setFormData(rawItems);
    setEditId(ID);
    setOpen(true);
  };

  const editItem = (editId) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === editId ? { ...formData, id: editId } : item
      )
    );
    setFormData({ item: "", quantity: "", unit: "", price: "" });
    setEditId(null);
    onClose(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      editItem(editId);
    } else {
      handleAdd();
    }
  };

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
  });

  const getDownload = () => {
    generatePDF();
  };

  const onClose = () => {
    setOpen(false);
    setFormData({ item: "", quantity: "", unit: "", price: "" });
    setEditId(null);
  };

  const clearData = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear the data?"
    );
    if (confirmClear) {
      localStorage.removeItem("products");
      setData([]);
    }
  };

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(data));
  }, [data]);

  return (
    <div className="home__container">
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

      <div className="product_list__container">
        <div className="sheet" ref={componentPDF} style={{ width: "100%" }}>
          <Header />
          <table className="table__container__products">
            <thead className="table__heads">
              <tr>
                <th>Sl no.</th>
                <th>Item</th>
                <th>Qty/unit</th>
              </tr>
            </thead>
            <tbody className="table__body">
              {data?.map((elem, i) => (
                <tr key={elem.id} onClick={() => handleEdit(elem.id)}>
                  <td>{i + 1}</td>
                  <td>{elem.item}</td>
                  <td>
                    {elem.quantity}&nbsp;{elem.unit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {open && (
        <div className="dialog-container">
          <div className="dialog">
            <div className="dialog_header">
              <h2>Enter Accessories</h2>
              <div onClick={onClose}>
                <MdOutlineClose
                  style={{ marginTop: "8px" }}
                  size={25}
                  color="lightcoral"
                />
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Item:</label>
                <input
                  type="text"
                  name="item"
                  placeholder="Enter item"
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
                  placeholder="Quantity"
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
                  <option value="Feet">Feet</option>
                  <option value="Meter">Meter</option>
                  <option value="Kg">Kg</option>
                  <option value="Litre">Litre</option>
                  <option value="Box">Box</option>
                </select>
              </div>

              <div className="dialogue__btn">
                <button type="submit">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
