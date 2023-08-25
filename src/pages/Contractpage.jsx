import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDropDown, fetchVendorlist } from "../redux/staff/ContractSlice";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL, ContractForm } from "../utils/services";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Helmet } from "react-helmet";

const Contractpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { vendors } = useSelector((state) => state?.contract?.dropdownVendor);
  const sortedVendors = vendors ? [...vendors].sort((a, b) => a.LegalName.localeCompare(b.LegalName)) : [];
  // const { items } = useSelector((state) => state.contract.dropdownItems);
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
  const [items, setItems] = useState([]);



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

  const MAX_FILE_SIZE = 2 * 1024 * 1024;

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

    if (!formState.attachDocuments && (!formState.files || formState.files.length === 0)) {
      errors.files = "Please attach a file !";
    }
    else if (formState.attachDocuments && (!formState.files || formState.files.length === 0)) {
      errors.files = "Please attach a file !";
    } else if (formState.files) {
      for (const file of formState.files) {
        if (!isValidFileType(file)) {
          errors.files = "Only PDF file is allowed !";
          break;
        }
        if (file.size > MAX_FILE_SIZE) {
          errors.files = "Maximum allowed file size is 2MB";
          break;
        }
      }
    }

    errors.lineItems = [];
    formState.lineItems.forEach((item, index) => {
      const lineItemErrors = {};

      if (!item.item) {
        lineItemErrors.item = "Item is required";
      }

      if (!item.baseRate) {
        lineItemErrors.baseRate = "Rate is required";
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
      formData.append("roleId", user?.roles[0].id);

      for (const file of formState.files) {
        formData.append("files", file);
      }
      const result = await ContractForm(formData);
      Swal.fire({
        position: 'center-center',
        icon: 'success',
        title: 'Successfully created Contract',
        showConfirmButton: false,
        timer: 2000
      })
      // toast.success(result.res.message);
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
    const updatedErrors = { ...errors };
    delete updatedErrors.files;

    if (files) {
      for (const file of files) {
        if (!isValidFileType(file)) {
          updatedErrors.files = "Only PDF file is allowed !";
          break;
        }
        if (file.size > MAX_FILE_SIZE) {
          updatedErrors.files = "Maximum allowed file size is 2MB";
          break;
        }
      }
    }

    setFormState((prevState) => ({
      ...prevState,
      files: Array.from(files),
    }));

    setErrors(updatedErrors);
  };

  const isValidFileType = (file) => {
    const allowedTypes = ['application/pdf'];
    return allowedTypes.includes(file.type);
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
          `${BASE_URL}/vendor-details/vendor/${value}`
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

      try {
        const newresponse = await axios.get(
          `${BASE_URL}/vendor-details/vendor/itemlist/${value}`
        );
        const rows = newresponse.data.sort((a, b) => a.itemname.localeCompare(b.itemname));
        setItems(rows);

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
    // dispatch(fetchDropDown());
    dispatch(fetchVendorlist());
  }, [dispatch]);




  return (
    <div>
      <Helmet>
        <title>Vendor Portal || Purchase Contract Form</title>
      </Helmet>
      <button onClick={() => navigate(-1)} className="back-btn">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.5881 6.60984C10.6496 6.67065 10.6984 6.74291 10.7317 6.82248C10.7651 6.90204 10.7822 6.98734 10.7822 7.07349C10.7822 7.15964 10.7651 7.24494 10.7317 7.32451C10.6984 7.40407 10.6496 7.47633 10.5881 7.53714L7.75673 10.3458L15.8401 10.3458C16.0151 10.3458 16.183 10.4147 16.3067 10.5375C16.4305 10.6602 16.5 10.8267 16.5 11.0003C16.5 11.1739 16.4305 11.3404 16.3067 11.4632C16.183 11.5859 16.0151 11.6549 15.8401 11.6549L7.75673 11.6549L10.5881 14.4646C10.7121 14.5876 10.7817 14.7544 10.7817 14.9283C10.7817 15.1022 10.7121 15.269 10.5881 15.3919C10.4642 15.5149 10.296 15.584 10.1207 15.584C9.9454 15.584 9.77727 15.5149 9.6533 15.3919L5.69408 11.4645C5.63256 11.4037 5.58375 11.3315 5.55045 11.2519C5.51714 11.1723 5.5 11.087 5.5 11.0009C5.5 10.9147 5.51714 10.8294 5.55045 10.7499C5.58375 10.6703 5.63256 10.598 5.69408 10.5372L9.6533 6.60984C9.7146 6.54882 9.78745 6.5004 9.86766 6.46736C9.94787 6.43433 10.0339 6.41732 10.1207 6.41732C10.2076 6.41732 10.2936 6.43433 10.3738 6.46736C10.454 6.5004 10.5268 6.54882 10.5881 6.60984Z" fill="black" />
          <circle cx="11" cy="11" r="10.5" stroke="black" />
        </svg>
      </button>
      <div className="card border-secondary mt-4">
        <div className="card-header">
          <h3>Purchase Contract</h3>
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

                  {sortedVendors &&
                    sortedVendors?.map((item) => (
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
                  className={`form-control ${errors.startDate ? "is-invalid" : ""
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
                  className={`form-control ${errors.endDate ? "is-invalid" : ""
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
              {/* <div className="col-md-4">
                <label htmlFor="department" className="form-label">
                  Department
                </label>

                <select
                  id="department"
                  className="form-select"
                  name="vendor"
                >
                  <option value="">Select</option>
                </select>
              </div> */}

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
              <h5 className="mb-3">Item Description</h5>
              <div id="MyTables">
                <table className="table mt-3">
                  <thead className="table-heads">
                    <tr>
                      <th className="text-center">Item</th>
                      <th className="text-center">Rate</th>
                      <th className="text-center">Quantity</th>
                      <th className="text-center">Amount</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody className="table-theme-1">
                    {formState.lineItems.map((item, index) => (
                      <tr key={index}>
                        <td style={{ width: "300px" }}>
                          <select
                            className={`form-select ${errors.lineItems &&
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
                            {/* {items &&
                              items.map((item) => (
                                <option key={item.Id} value={item.id}>
                                  {item.Name}
                                </option>
                              ))} */}
                            {items.map((item) => (
                              <option key={item.itemId} value={item.itemId}>
                                {item.itemname}
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

                        <td style={{ width: "300px" }}>
                          <input
                            type="text"
                            className={`form-control ${errors.lineItems &&
                              errors.lineItems[index] &&
                              errors.lineItems[index].baseRate
                              ? "is-invalid"
                              : ""
                              } text-end`}
                            name="baseRate"
                            autocomplete="off"
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

                        <td style={{ width: "300px" }}>
                          <input
                            type="text"
                            className={`form-control ${errors.lineItems &&
                              errors.lineItems[index] &&
                              errors.lineItems[index].quantity
                              ? "is-invalid"
                              : ""
                              } text-end`}
                            name="quantity"
                            autocomplete="off"
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

                        <td style={{ width: "300px" }}>
                          <input
                            type="text"
                            className="form-control text-end"
                            name="totalAmount"
                            value={item.totalAmount}
                            // onChange={(e) => handleItemChange(e, index)}
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
            </div>

            <div className="row mb-3 mt-2">
              <div className="col-md-12">
                <button
                  type="button"
                  className="addIcon float-end"
                  onClick={handleAddItem}
                >
                  +
                </button>
              </div>
            </div>

            <div className="row mb-4 justify-content-end">
              <div className="col-md-3">
                <label htmlFor="finalTotalAmount" className="form-label">
                  Total Amount
                </label>

                <input
                  type="text"
                  id="finalTotalAmount"
                  className="form-control text-end"
                  name="finalTotalAmount"
                  value={`${finalTotalAmount && 'INR '}${finalTotalAmount}`}
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
