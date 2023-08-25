import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InvoiceForm, getInvoice } from "../../utils/services";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import Spinner from "../../component/common/Spinner";

const CreateInvoice = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [InvoiceItem, setInvoiceItems] = useState({});
  const [finalTotalAmount, setFinalTotalAmount] = useState("");
  const [loader,setLoader] =useState(false)
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState({
    cgst: '',
    sgst: '',
    utgst: '',
    igst: '',
    taxSubTotal: '',
    total: ''
  });
  const [taxError, setTaxError] = useState(false);
  const [subtotalError, setSubtotalError] = useState(false);
  const [attachDocuments, setAttachDocuments] = useState(false);

  const [referenceNo, setReferenceNo] = useState('');
  const [referenceError, setReferenceError] = useState(false);

  const [Files, setFiles] = useState([]);
  const [fileError, setFileError] = useState(false);


  const [dueDate, setDueDate] = useState('');
  const [dueDateError, setDueDateError] = useState(false);


  const handleDateChange = (event) => {
    const date = event.target.value;
    setDueDate(date);
    setDueDateError(false)
  };

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  const newDate = currentDate.toISOString().split('T')[0];

  const handleReferenceChange = (event) => {
    const { value } = event.target;

    const alphanumericValid = /^[a-zA-Z0-9\s]+$/;

    if (value === '' || alphanumericValid.test(value)) {
      setReferenceNo(value);
      setReferenceError(false)
    }

  }

  useEffect(() => {
    const calculateFinalTotalAmount = () => {
      if (InvoiceItem.lines && InvoiceItem.lines.length > 0) {
        const total = InvoiceItem.lines.reduce(
          (acc, item) => acc + parseFloat(item.totalAmount || 0),
          0
        );
        setFinalTotalAmount(total.toFixed(2));
        setSubtotalError(false);
      } else {
        setFinalTotalAmount(0);
      }
    };

    calculateFinalTotalAmount();
  }, [InvoiceItem.lines]);


  const handleChange = (e) => {
    const { name, value } = e.target;

    const isValid = !isNaN(value) && value >= 0 && value <= 100;
    const hasValidDecimal = /^(\d{0,3})(\.\d{0,2})?$/.test(value);

    if (isValid && hasValidDecimal) {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    setTaxError(false);
  }

  useEffect(() => {

    const cgst = !isNaN(parseFloat(data.cgst)) ? parseFloat(data.cgst) : 0;
    const sgst = !isNaN(parseFloat(data.sgst)) ? parseFloat(data.sgst) : 0;
    const utgst = !isNaN(parseFloat(data.utgst)) ? parseFloat(data.utgst) : 0;
    const igst = !isNaN(parseFloat(data.igst)) ? parseFloat(data.igst) : 0;

    let taxSubTotal = 0;

    taxSubTotal = (cgst + sgst + utgst + igst) * parseFloat(finalTotalAmount) / 100;
    console.log('taxSubTotal is', taxSubTotal)

    const total = taxSubTotal + parseFloat(finalTotalAmount);

    setData((prevData) => ({
      ...prevData,
      taxSubTotal: taxSubTotal.toFixed(2),
      total: total.toFixed(2),
    }));
  }, [data.cgst, data.sgst, data.utgst, data.igst, finalTotalAmount]);


  const fetchData = async () => {
    setLoader(true)
    const result = await getInvoice(id);
    setLoader(false)
    setInvoiceItems(result.res);
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  const handleQuantityChange = (index, newQuantity, maxValue) => {

    if (maxValue >= newQuantity) {
      const updatedLines = [...InvoiceItem.lines];
      const rate = updatedLines[index].rate;
      const quantity = parseInt(newQuantity);
      const totalAmount = rate * quantity;
      updatedLines[index].quantity = quantity;
      updatedLines[index].totalAmount = isNaN(totalAmount) ? 0 : totalAmount.toFixed(2);

      setInvoiceItems((prevState) => ({
        ...prevState,
        lines: updatedLines,
      }));
    }
  };

  const handleFileInputChange = (event) => {
    // const Files = Array.from(event.target.files);
    // setFiles(Files);
    const selectedFiles = Array.from(event.target.files);
    setFileError(false);

    const invalidFiles = selectedFiles.filter((file) => {
      const fileType = file.type;
      const fileSize = file.size / 1024 / 1024;
      return fileType !== "application/pdf" || fileSize > 2;
    });

    if (invalidFiles.length > 0) {
      setFileError(true);
    } else {
      setFiles(selectedFiles);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.role === 'Vendor') {
      if (!referenceNo) {
        setReferenceError(true);
        return;
      }
    }

    if (!dueDate) {
      setDueDateError(true);
      return;
    }

    if (parseFloat(finalTotalAmount) === 0) {
      setSubtotalError(true);
      return;
    }

    if (!data.cgst && !data.sgst && !data.utgst && !data.igst) {
      setTaxError(true);
      return;
    }

    if (Files.length === 0) {
      setFileError(true);
      return;
    }

    // if (user.role === "Vendor") {
    // }


    else {

      const formData = new FormData();
      formData.append("vendorId", InvoiceItem.vendorId);
      formData.append("contractId", InvoiceItem.contractId);
      formData.append("finalTotalAmount", finalTotalAmount);
      formData.append("transactionId", user?.transactions[1].id);
      formData.append("roleId", user?.roles[0].id);
      formData.append("cgst", data.cgst);
      formData.append("sgst", data.sgst);
      formData.append("igst", data.igst);
      formData.append("utgst", data.utgst);
      formData.append("taxSubTotal", data.taxSubTotal);
      formData.append("total", data.total);
      formData.append("dueDate", dueDate);
      formData.append("refNo", referenceNo);


      const RemoveZeroLine = InvoiceItem.lines.filter((item) => item.remainingQunatity != 0 && item.quantity > 0)

      const updatedLines = RemoveZeroLine.map((row) => ({
        itemId: row.itemId,
        rate: row.rate,
        quantity: row.quantity,
        totalAmount: row.totalAmount,
      }));

      formData.append("lines", JSON.stringify(updatedLines));

      Files.forEach((file) => {
        formData.append("files", file);
      });

      const result = await InvoiceForm(formData);
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Bill Created Successfully!",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate("/invoice-list");
    }
  };

  return (
    <>
      <Helmet>
        <title>Vendor Portal || Bill Creation</title>
      </Helmet>
      <button onClick={() => navigate(-1)} className="back-btn">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.5881 6.60984C10.6496 6.67065 10.6984 6.74291 10.7317 6.82248C10.7651 6.90204 10.7822 6.98734 10.7822 7.07349C10.7822 7.15964 10.7651 7.24494 10.7317 7.32451C10.6984 7.40407 10.6496 7.47633 10.5881 7.53714L7.75673 10.3458L15.8401 10.3458C16.0151 10.3458 16.183 10.4147 16.3067 10.5375C16.4305 10.6602 16.5 10.8267 16.5 11.0003C16.5 11.1739 16.4305 11.3404 16.3067 11.4632C16.183 11.5859 16.0151 11.6549 15.8401 11.6549L7.75673 11.6549L10.5881 14.4646C10.7121 14.5876 10.7817 14.7544 10.7817 14.9283C10.7817 15.1022 10.7121 15.269 10.5881 15.3919C10.4642 15.5149 10.296 15.584 10.1207 15.584C9.9454 15.584 9.77727 15.5149 9.6533 15.3919L5.69408 11.4645C5.63256 11.4037 5.58375 11.3315 5.55045 11.2519C5.51714 11.1723 5.5 11.087 5.5 11.0009C5.5 10.9147 5.51714 10.8294 5.55045 10.7499C5.58375 10.6703 5.63256 10.598 5.69408 10.5372L9.6533 6.60984C9.7146 6.54882 9.78745 6.5004 9.86766 6.46736C9.94787 6.43433 10.0339 6.41732 10.1207 6.41732C10.2076 6.41732 10.2936 6.43433 10.3738 6.46736C10.454 6.5004 10.5268 6.54882 10.5881 6.60984Z" fill="black" />
          <circle cx="11" cy="11" r="10.5" stroke="black" />
        </svg>
      </button>
      {
        loader ?
        <Spinner />
        :
        <>
         <div className="card border-secondary mt-4">
        <div className="card-header">
          <h3>Bill</h3>
        </div>

        <div className="card-body">
          <form>
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="vendor" className="form-label">
                  Legal Name
                </label>

                <input
                  type="text"
                  name="vendor"
                  id="vendor"
                  value={InvoiceItem?.vendorName}
                  className="form-control"
                  disabled
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="contractname" className="form-label">
                  Purchase Contract
                </label>

                <input
                  type="text"
                  id="contractname"
                  value={InvoiceItem?.documentNo}
                  className="form-control"
                  name="contractname"
                  disabled
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="refNo" className="form-label">
                  Reference No.
                </label>

                <input
                  type="text"
                  id="refNo"
                  placeholder="Please enter reference no."
                  className="form-control"
                  name="refNo"
                  value={referenceNo}
                  onChange={handleReferenceChange}
                  autoComplete="off"

                />
                {referenceError && (
                  <div className="text-danger mt-1">Please provide a Reference No</div>
                )}
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-4">
                <label htmlFor="pendingbill" className="form-label">
                  Total
                </label>

                <input
                  type="text"
                  name="pendingbill"
                  id="pendingbill"
                  value={`INR ${InvoiceItem?.contractTotal?.toFixed(2)}`}
                  className="form-control"
                  disabled
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="totalbilled" className="form-label">
                  Total Billed
                </label>

                <input
                  type="text"
                  name="totalbilled"
                  id="totalbilled"
                  value={`INR ${InvoiceItem?.totalInvoicedAmount?.toFixed(2)}`}
                  className="form-control"
                  disabled
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="dueDate" className="form-label">
                  Due Date
                </label>

                <input
                  type="date"
                  name="dueDate"
                  id="dueDate"
                  value={dueDate}
                  onChange={handleDateChange}
                  className="form-control"
                  min={newDate}

                />
                {dueDateError && (
                  <div className="text-danger mt-1">Please select Due Date</div>
                )}
              </div>
            </div>

            <div className="perchase-terms-tabel table-responsive mb-4">
              <h5 className="mb-3">Items</h5>

              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th className="text-left">Item</th>
                    <th className="text-end">Rate</th>
                    <th className="text-end">Quantity</th>
                    <th className="text-end">Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {InvoiceItem?.lines?.map((row, index) => (
                    <tr key={index}>
                      <td style={{ width: "200px" }}>{row.itemName}</td>
                      <td style={{ width: "200px" }} className="text-end">INR {row.rate?.toFixed(2)}</td>

                      <td style={{ width: "200px" }}>
                        <input
                          type="number"
                          className="form-control text-end"
                          name={`quantity_${index}`}
                          value={row.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              index,
                              e.target.value,
                              row.remainingQunatity
                            )
                          }
                          placeholder={`max ${row.remainingQunatity} `}
                          max={row.remainingQunatity}
                          min={0}
                          disabled={row.remainingQunatity == 0}
                        />
                      </td>

                      <td style={{ width: "200px" }} className="text-end">{row.totalAmount && "INR "} {row.totalAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="row mb-3">
              <div className="col-12">
                <div className="d-flex justify-content-end">
                  <div className="d-flex align-items-center mt-4">
                    <h6 className="px-4">Sub Total</h6>
                    <span>:</span>
                    <div className="px-4">
                      <input className="form-control text-end" type="text" id="finalTotalAmount" value={`INR ${finalTotalAmount}`} disabled />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {subtotalError && (
              <div className="text-danger text-end px-4 mb-4">Subtotal can't be zero</div>
            )}

            <div className="row mb-3">
              <div className="col-md-12">
                <div className="d-flex justify-content-end">
                  <div className="d-flex align-items-center">
                    <h6 className="px-4">CGST%</h6>
                    <span>:</span>
                    <div className="px-4">
                      <input
                        type="text"
                        className="form-control text-end"
                        id="cgst"
                        name="cgst"
                        value={data.cgst}
                        onChange={handleChange}
                        disabled={data.utgst || data.igst}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-12">
                <div className="d-flex justify-content-end">
                  <div className="d-flex align-items-center">
                    <h6 className="px-4">SGST%</h6>
                    <span>:</span>
                    <div className="px-4">
                      <input
                        type="text"
                        className="form-control text-end"
                        id="sgst"
                        name="sgst"
                        value={data.sgst}
                        onChange={handleChange}
                        disabled={data.utgst || data.igst}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-12">
                <div className="d-flex justify-content-end">
                  <div className="d-flex align-items-center">
                    <h6 className="px-4">UTGST%</h6>
                    <span>:</span>
                    <div className="px-4">
                      <input
                        type="text"
                        className="form-control text-end"
                        id="utgst"
                        name="utgst"
                        value={data.utgst}
                        onChange={handleChange}
                        disabled={data.cgst || data.sgst || data.igst}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-12">
                <div className="d-flex justify-content-end">
                  <div className="d-flex align-items-center">
                    <h6 className="px-4">IGST%</h6>
                    <span>:</span>
                    <div className="px-4">
                      <input
                        type="text"
                        className="form-control text-end"
                        id="igst"
                        name="igst"
                        value={data.igst}
                        onChange={handleChange}
                        disabled={data.cgst || data.sgst || data.utgst}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {taxError && (
              <div className="text-danger text-end px-4 mb-4">
                One of the GST Field is required
              </div>
            )}

            <div className="row mb-4">
              <div className="col-md-12">
                <div className="d-flex justify-content-end">
                  <div className="d-flex align-items-center">
                    <h6 className="px-4">GST Total</h6>
                    <span>:</span>
                    <div className="px-4">
                      <input
                        type="text"
                        className="form-control text-end"
                        id="taxSubTotal"
                        name="taxSubTotal"
                        value={`INR ${data.taxSubTotal}`}
                        // onChange={handleChange}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-12">
                <div className="d-flex justify-content-end">
                  <div className="d-flex align-items-center">
                    <h6 className="px-4">Total</h6>
                    <span>:</span>
                    <div className="px-4">
                      <input
                        type="text"
                        className="form-control text-end"
                        id="total"
                        name="total"
                        value={`INR ${data.total}`}
                        // onChange={handleChange}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-12">
                <input
                  type="checkbox"
                  id="attachDocuments"
                  className="form-check-input"
                  name="attachDocuments"
                  checked={attachDocuments}
                  onChange={(e) => setAttachDocuments(e.target.checked)}
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
                    accept=".pdf"
                    className="form-control"
                    disabled={!attachDocuments}
                    onChange={handleFileInputChange}
                    multiple
                  />
                </div>

                {fileError && (
                  <div className="text-danger">
                    Please attach a PDF file (upto 2MB)
                  </div>
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
        </>
      }
     
    </>
  );
};

export default CreateInvoice;
