import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import axios from "axios";

import { toast } from "react-toastify";
import { InvoiceForm } from "../../utils/services";



const CreateInvoice = () => {
  const { id } = useParams();

  const [name, setName] = useState("");

  const [vendorId, setVendorId] = useState("");

  const [contractname, setContractname] = useState("");

  const [contractId, setContractId] = useState("");

  const [lineItems, setLineItems] = useState([]);
  const [Total,setTotal] =useState(0)

  const fetchRowData = async () => {
    const response = await axios.get(
      `http://localhost:3001/view-contract/row/${id}`
    );

    const rowData = response.data;

    setName(rowData.VendorName);

    setVendorId(rowData.VendorId);

    setContractname(rowData.DocumentNo);

    setContractId(rowData.ContractId);

    const initialLineItems = rowData.lineItems.map((item) => ({
      ...item,

      editQuantity: "",

      editTotalAmount: "",

      itemId: item.itemId,
    }));

    setLineItems(initialLineItems);
  };

  useEffect(() => {
    if (id) {
      fetchRowData();
    }
  },[id]);

  
  const handleQuantityChange = (index, value) => {
    setLineItems((prevLineItems) => {
      const updatedLineItems = [...prevLineItems];
      const baseRate = updatedLineItems[index].Rate;
      const quantity = parseFloat(value);
      const totalAmount = isNaN(quantity)
        ? ""
        : (baseRate * quantity).toFixed(2);

       updatedLineItems[index] = {
        ...updatedLineItems[index],

        editQuantity: value,

        editTotalAmount: Number(totalAmount),
      };
      
      return updatedLineItems;
    });

    console.log(lineItems)



  };

  
  const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedLineItems = lineItems.map((item) => ({
        Item: item.itemId,
        Rate: item.Rate, Quantity: item.editQuantity,Amount: item.editTotalAmount,
        }));
        const formData = new FormData();
        formData.append("vendorId", vendorId);
        formData.append("contractId", contractId);
        formData.append("lineItems", JSON.stringify(updatedLineItems));
        const result = await InvoiceForm(formData);
        toast.success(result.res.message);
      };
      


       useEffect(()=>{
        const totalSum = lineItems.reduce((accumulator, currentExpense) => accumulator + currentExpense.editTotalAmount, 0);
        setTotal(totalSum)
       },[lineItems])
      

 
    return (
      <>
      <div className="card border-secondary mt-4">
        <div className="card-header">
          <h3>Invoice Form</h3>
        </div>

        <div className="card-body">
          <form>
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlfor="vendor" className="form-label">
                  Legal Name
                </label>

                <input
                  type="text"
                  name="vendor"
                  id="vendor"
                  value={name}
                  className="form-control"
                  disabled
                  />
              </div>

              <div className="col-md-4">
                <label htmlFor="contractname" className="form-label">
                  Contract Name
                </label>

                <input
                  type="text"
                  id="contractname"
                  value={contractname}
                  className="form-control"
                  name="contractname"
                  disabled
                />
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-4">
                <label htmlfor="pendingbill" className="form-label">
                  Pending Bill
                </label>

                <input
                  type="text"
                  name="pendingbill"
                  id="pendingbill"
                  className="form-control"
                  disabled
                />
              </div>

              <div className="col-md-4">
                <label htmlfor="totalbilled" className="form-label">
                  Total Billed
                </label>

                <input
                  type="text"
                  name="totalbilled"
                  id="totalbilled"
                  className="form-control"
                  disabled
                />
              </div>
            </div>

            <div className="table-responsive">
              <h5 className="mb-3">Line Information</h5>

              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th className="text-center">Item</th>

                    <th className="text-center">Base Rate</th>

                    <th className="text-center">Quantity</th>

                    <th className="text-center">Total Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {lineItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.ItemName}</td>

                      <td>{item.Rate}</td>

                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={item.editQuantity}
                          onChange={(e) =>
                            handleQuantityChange(index, e.target.value)
                          }
                          max={item.Quantity}
                          min={0}
                        />
                      </td>

                      <td>{item.editTotalAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="d-flex justify-content-end m-4">
                <p>Total Amount</p>
                 <p className="px-2">{Total} Rs</p>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-12">
                <button
                  type="submit"
                  className="btn btn-success float-end"
                  onClick={(e) => handleSubmit(e)}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateInvoice;
