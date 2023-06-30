import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDropDown, fetchVendorlist } from "../redux/staff/ContractSlice";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ContractForm } from "../utils/services";
import { toast } from "react-toastify";

const Contractpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { vendors } = useSelector((state) => state?.contract?.dropdownVendor);
  const { items } = useSelector((state) => state.contract.dropdownItems);
  const [errors, setErrors] = useState({});
  const [formState, setFormState] = useState({
    vendor: "",
    startDate: "",
    endDate: "",
    lineItems: [{}],
    attachDocuments: false,
    files: [],
  });
  const [finalTotalAmount, setFinalTotalAmount] = useState(0);
  const user = JSON.parse(localStorage.getItem('user'));


   useEffect(() => {
     const calculateFinalTotalAmount = () => {
       const total = formState.lineItems.reduce(
        (acc, item) => acc + parseFloat(item.totalAmount || 0),
        0
      );

      setFinalTotalAmount(total.toFixed(2));
     };

    calculateFinalTotalAmount();
  }, [formState.lineItems]);

  const validateForm = () => {
    let errors = {};

    if (!formState.vendor) {
      errors.vendor = "Vendor is required";
    }

    if (!formState.startDate) {
      errors.startDate = "Start Date is required";
    }

    if (!formState.endDate) {
      errors.endDate = "End Date is required";
    }

    errors.lineItems = [];
    formState.lineItems.forEach((item, index) => {
      const lineItemErrors = {};

      if (!item.item) {
        lineItemErrors.item = "Item is required";
      }

      if (!item.baseRate) {
        lineItemErrors.baseRate = "Base rate is required";
      }

      if (!item.quantity) {
        lineItemErrors.quantity = "Quantity is required";
      }

      if (Object.keys(lineItemErrors).length > 0) {
        errors.lineItems[index] = lineItemErrors;
      }

      return lineItemErrors;
    });

    if (errors.lineItems.length === 0) {
      delete errors.lineItems;
    }

    if (
      formState.attachDocuments &&
      (!formState.files || formState.files.length === 0)
    ) {
      errors.files = "Please attach file";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      const formData = new FormData();
      formData.append("vendor", formState.vendor);
      formData.append("startDate", formState.startDate);
      formData.append("endDate", formState.endDate);
      formData.append("attachDocuments", formState.attachDocuments);
      formData.append("lineItems", JSON.stringify(formState.lineItems));
      formData.append("finalTotalAmount", finalTotalAmount);
      formData.append("transactionId", user?.transactions[2]?.id);
      formData.append("roleId",user?.roles[0].id);

      for (const file of formState.files) {
        formData.append("files", file);
      }
      const result = await ContractForm(formData);
      toast.success(result.res.message);
      navigate("/contract-listing");

      //   dispatch(formDetails(formData));

      //   openModal()
    }
  };

  const currentDate = new Date().toISOString().split("T")[0];
  const minEndDate = formState.startDate
    ? new Date(formState.startDate)
    : new Date();

  minEndDate.setDate(minEndDate.getDate() + 1);

  const setEndDate = minEndDate.toISOString().split("T")[0];
  const isDisabled = !formState.startDate;

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    setFormState((prevState) => ({
      ...prevState,
      files: Array.from(files),
    }));

    const updatedErrors = { ...errors };
    delete updatedErrors.files;
    setErrors(updatedErrors);
  };

  const [terms, setTerms] = useState("");
  const [subsidiary, setSubsidiary] = useState("");

  const handleInputChange = async (e) => {
    const { name, value, type, checked } = e.target;

    const inputValue = type === "checkbox" ? checked : value;

    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[name];
      return updatedErrors;
    });

    setFormState((prevState) => ({
      ...prevState,
      [name]: inputValue,
    }));

    if (name === "vendor") {
      try {
        const response = await axios.get(
          `http://localhost:3001/vendor-details/vendor/${value}`
        );
        const rows = response.data;
        console.log(rows);
        if (rows.length > 0) {
          const firstRow = rows[0];
          setTerms(firstRow.Term);
          setSubsidiary(firstRow.Name);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleItemChange = (e, index) => {
    const { name, value } = e.target;

    let newValue;
    if (name === "baseRate") {
      newValue = value.replace(/[^0-9.]/g, "");

      const dotindex = newValue.indexOf(".");

      if (dotindex !== -1 && newValue.length - dotindex > 3) {
        newValue = newValue.slice(0, dotindex + 3);
      }
    } else if (name === "quantity") {
      newValue = value.replace(/[^0-9]/g, "");
    } else {
      newValue = value;
    }

    const updatedLineItems = [...formState.lineItems];
    updatedLineItems[index] = {
      ...updatedLineItems[index],
      [name]: newValue,
    };

    const baseRate = parseFloat(updatedLineItems[index].baseRate);
    const quantity = parseFloat(updatedLineItems[index].quantity);
    const totalAmount =
      isNaN(baseRate) || isNaN(quantity)
        ? ""
        : (baseRate * quantity).toFixed(2);

    updatedLineItems[index].totalAmount = totalAmount;

    setFormState((prevState) => ({
      ...prevState,
      lineItems: updatedLineItems,
    }));

    const updatedErrors = { ...errors };
    if (updatedErrors.lineItems && updatedErrors.lineItems[index]) {
      delete updatedErrors.lineItems[index][name];
    }

    setErrors(updatedErrors);
  };

  const handleRemoveItem = (index, event) => {
    event.preventDefault();

    if (formState.lineItems.length === 1) {
      alert("Atlest one item should be there");
      return;
    }

    const updatedLineItems = [...formState.lineItems];
    updatedLineItems.splice(index, 1);

    const updatedErrors = { ...errors };
    if (updatedErrors.lineItems && updatedErrors.lineItems.length > index) {
      updatedErrors.lineItems.splice(index, 1);
    }

    setFormState((prevState) => ({
      ...prevState,
      lineItems: updatedLineItems,
    }));

    setErrors(updatedErrors);
  };

  const handleAddItem = () => {
    const newItem = {
      item: "",
      baseRate: "",
      quantity: "",
      totalAmount: "",
    };
    setFormState((prevState) => ({
      ...prevState,
      lineItems: [...prevState.lineItems, newItem],
    }));
  };

  useEffect(() => {
    dispatch(fetchDropDown());
    dispatch(fetchVendorlist());
  }, [dispatch]);


 

  return (
    <div>
      <div className="card border-secondary mt-4">
        <div className="card-header">
          <h3>Contract Form</h3>
        </div>

        <div className="card-body">
          <form>
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="vendor" className="form-label">
                  Vendor
                </label>

                <select
                  id="vendor"
                  className={`form-select ${errors.vendor ? "is-invalid" : ""}`}
                  name="vendor"
                  value={formState.vendor}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>

                  {vendors &&
                    vendors?.map((item) => (
                      <option key={item.Id} value={item.id}>
                        {item.LegalName}
                      </option>
                    ))}
                </select>

                {errors.vendor && (
                  <div className="invalid-feedback">{errors.vendor}</div>
                )}
              </div>

              <div className="col-md-4">
                <label htmlFor="startDate" className="form-label">
                  Start Date
                </label>

                <input
                  type="date"
                  id="startDate"
                  className={`form-control ${
                    errors.startDate ? "is-invalid" : ""
                  }`}
                  name="startDate"
                  min={currentDate}
                  value={formState.startDate}
                  onChange={handleInputChange}
                />

                {errors.startDate && (
                  <div className="invalid-feedback">{errors.startDate}</div>
                )}
              </div>

              <div className="col-md-4">
                <label htmlFor="endDate" className="form-label">
                  End Date
                </label>

                <input
                  type="date"
                  id="endDate"
                  className={`form-control ${
                    errors.endDate ? "is-invalid" : ""
                  }`}
                  name="endDate"
                  min={setEndDate}
                  value={formState.endDate}
                  onChange={handleInputChange}
                  disabled={isDisabled}
                />

                {errors.endDate && (
                  <div className="invalid-feedback">{errors.endDate}</div>
                )}
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-4">
                <label htmlFor="terms" className="form-label">
                  Terms
                </label>
                <input
                  type="text"
                  id="terms"
                  className="form-control"
                  name="terms"
                  value={terms}
                  disabled
                ></input>
              </div>

              <div className="col-md-4">
                <label htmlFor="subsidiary" className="form-label">
                  Subsidiary
                </label>
                <input
                  type="text"
                  id="subsidiary"
                  className="form-control"
                  name="subsidiary"
                  value={subsidiary}
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
                    <th className="text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {formState.lineItems.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <select
                          className={`form-select ${
                            errors.lineItems &&
                            errors.lineItems[index] &&
                            errors.lineItems[index].item
                              ? "is-invalid"
                              : ""
                          }`}
                          name="item"
                          value={item.item}
                          onChange={(e) => handleItemChange(e, index)}
                          required
                        >
                          <option value="">Select</option>
                          {items &&
                            items.map((item) => (
                              <option key={item.Id} value={item.id}>
                                {item.Name}
                              </option>
                            ))}
                        </select>

                        {errors.lineItems &&
                          errors.lineItems[index] &&
                          errors.lineItems[index].item && (
                            <div className="invalid-feedback">
                              {errors.lineItems[index].item}
                            </div>
                          )}
                      </td>

                      <td>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.lineItems &&
                            errors.lineItems[index] &&
                            errors.lineItems[index].baseRate
                              ? "is-invalid"
                              : ""
                          }`}
                          name="baseRate"
                          value={item.baseRate}
                          onChange={(e) => handleItemChange(e, index)}
                          required
                        />

                        {errors.lineItems &&
                          errors.lineItems[index] &&
                          errors.lineItems[index].baseRate && (
                            <div className="invalid-feedback">
                              {errors.lineItems[index].baseRate}
                            </div>
                          )}
                      </td>

                      <td>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.lineItems &&
                            errors.lineItems[index] &&
                            errors.lineItems[index].quantity
                              ? "is-invalid"
                              : ""
                          }`}
                          name="quantity"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(e, index)}
                          required
                        />

                        {errors.lineItems &&
                          errors.lineItems[index] &&
                          errors.lineItems[index].quantity && (
                            <div className="invalid-feedback">
                              {errors.lineItems[index].quantity}
                            </div>
                          )}
                      </td>

                      <td>
                        <input
                          type="text"
                          className="form-control"
                          name="totalAmount"
                          value={item.totalAmount}
                          onChange={(e) => handleItemChange(e, index)}
                          disabled
                          // required
                        />
                      </td>

                      <td>
                        <button
                          className="btn btn-sm"
                          onClick={(e) => handleRemoveItem(index, e)}
                        >
                          <FaTrash size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="row mb-3 mt-2">
              <div className="col-md-12">
                <button
                  type="button"
                  className="btn btn-success float-end"
                  onClick={handleAddItem}
                >
                  Add Item
                </button>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-3">
                <label htmlFor="finalTotalAmount" className="form-label">
                  Final Total Amount
                </label>

                <input
                  type="text"
                  id="finalTotalAmount"
                  className="form-control"
                  name="finalTotalAmount"
                  value={finalTotalAmount}
                  disabled
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-12">
                <input
                  type="checkbox"
                  id="attachDocuments"
                  className="form-check-input"
                  name="attachDocuments"
                  checked={formState.attachDocuments}
                  onChange={handleInputChange}
                />

                <label
                  htmlFor="attachDocuments"
                  className="form-check-label ms-2"
                >
                  Check for attach documents
                </label>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-4">
                <div className="input-group">
                  <input
                    type="file"
                    id="fileInput"
                    className="form-control"
                    name="files"
                    disabled={!formState.attachDocuments}
                    onChange={handleFileInputChange}
                    multiple
                  />
                </div>

                {errors.files && (
                  <div className="text-danger">{errors.files}</div>
                )}
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
    </div>
  );
};

export default Contractpage;
