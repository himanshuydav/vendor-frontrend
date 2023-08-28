import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { BASE_URL, EditBillForm, invoiceView } from "../../utils/services";
import { FaTrash } from "react-icons/fa";
// import { useSelector, useDispatch } from "react-redux";
// import Swal from "sweetalert2";
import moment from "moment";
import downloadicon from "../../assets/images/download.png"
import Spinner from "./Spinner";
import { toast } from "react-hot-toast";
// import { async } from "q";


const EditBill = () => {
    const { id } = useParams();
    //     const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const user = JSON.parse(localStorage.getItem("user"));
    const [VendorName, setVendorName] = useState();
    const [InvoiceId, setInvoiceId] = useState();
    const [DocumentNo, setDocumentNo] = useState();
    const [Cgst, setCgst] = useState();
    const [Sgst, setSgst] = useState();
    const [UTgst, setUTgst] = useState();
    const [Igst, setIgst] = useState();
    const [TaxSubtotal, setTaxSubtotal] = useState();
    const [Total, setTotal] = useState();
    const [RefNo, setRefNo] = useState();
    const [DueDate, setDueDate] = useState();
    const [ContractTotal, setContractTotal] = useState();
    const [InvoiceTotal, setInvoiceTotal] = useState();
    const [lineItems, setLineItems] = useState([]);
    const [TotalInvoicedAmount, setTotalInvoicedAmount] = useState();
    const [deletedFileIds, setDeletedFileIds] = useState([]);
    const [Files, setFiles] = useState([]);
    const [attachDocuments, setAttachDocuments] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);


    const handleVendorView = async (id) => {
        setLoading(true)
        const result = await invoiceView(id);
        setLoading(false)
        console.log(result);
        setInvoiceId(result.res.Id);
        setVendorName(result.res.VendorName);
        setDocumentNo(result.res.DocumentNo);
        setContractTotal(result.res.ContractTotal)
        setTotalInvoicedAmount(result.res.TotalInvoicedAmount)
        setRefNo(result.res.RefNo)
        setDueDate(moment(result.res.DueDate).format().slice(0, 10));
        setInvoiceTotal(result.res.InvoiceTotal)
        setLineItems(result.res.lineItems);
        setFiles(result.res.files);
        setSgst(result.res.Sgst);
        setCgst(result.res.Cgst);
        setUTgst(result.res.UTgst);
        setIgst(result.res.Igst)
        setTaxSubtotal(result.res.TaxSubtotal)
        setTotal(result.res.Total)
    };

    useEffect(() => {
        if (id) {
            handleVendorView(id);
        }
    }, [id]);

    const handleQuantityChange = (index, newQuantity, maxValue) => {


        if (maxValue >= newQuantity) {
            const updatedLines = [...lineItems];
            const rate = updatedLines[index].Rate;
            const quantity = !isNaN(parseInt(newQuantity)) ? parseInt(newQuantity) : "";
            const totalAmount = rate * quantity;
            console.log("totalAmount", totalAmount)
            updatedLines[index].Quantity = quantity;
            updatedLines[index].Amount = totalAmount.toFixed(2);
            setLineItems(updatedLines);
        }
    };

    useEffect(() => {
        const calculateAmount = () => {
            const total = lineItems.reduce(
                (acc, item) => acc + parseFloat(item.Amount || 0),
                0
            );

            setInvoiceTotal(total.toFixed(2));
        };

        calculateAmount();
    }, [lineItems]);

    const handleChange = (e, newfield) => {
        const { value } = e.target;

        if (!isNaN(value) && value >= 0 && value <= 100) {
            if (newfield === 'Cgst') {
                setCgst(value);
            } else if (newfield === 'Sgst') {
                setSgst(value);
            }
            else if (newfield === 'Utgst') {
                setUTgst(value);
            }
            else if (newfield === 'Igst') {
                setIgst(value);
            }
        }
    }

    useEffect(() => {

        const cgst = !isNaN(parseFloat(Cgst)) ? parseFloat(Cgst) : 0;
        const sgst = !isNaN(parseFloat(Sgst)) ? parseFloat(Sgst) : 0;
        const utgst = !isNaN(parseFloat(UTgst)) ? parseFloat(UTgst) : 0;
        const igst = !isNaN(parseFloat(Igst)) ? parseFloat(Igst) : 0;

        let taxSubTotal = 0;

        taxSubTotal = (cgst + sgst + utgst + igst) * parseFloat(InvoiceTotal) / 100;
        console.log('taxSubTotal is', taxSubTotal)

        const total = taxSubTotal + parseFloat(InvoiceTotal);

        setTaxSubtotal(taxSubTotal.toFixed(2));
        setTotal(total.toFixed(2));

    }, [Cgst, Sgst, UTgst, Igst, InvoiceTotal]);

    const handleRemoveFile = (index, event) => {
        event.preventDefault();

        const updatedFiles = [...Files];
        const deletedFileId = updatedFiles[index].FileId;
        console.log("hi", deletedFileId)

        updatedFiles.splice(index, 1);

        setFiles(updatedFiles);
        setDeletedFileIds((prevDeletedIds) => [...prevDeletedIds, deletedFileId]);

    };

    const handleFileInputChange = (event) => {
        const selectedFilesArray = Array.from(event.target.files);
        console.log("selectedFilesArray", selectedFilesArray)
        setSelectedFiles(selectedFilesArray);
    };

    const handleDueDateChange = (e) => {
        setDueDate(e.target.value);
    };

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    const formattedDate = currentDate.toISOString().split('T')[0];


    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("invoiceId", InvoiceId)
            formData.append("invoiceTotal", InvoiceTotal)
            formData.append("DueDate", DueDate);
            formData.append("transactionId", user?.transactions[1].id);
            formData.append("ReferenceNumber", RefNo)
            formData.append("roleId", user?.roles[0].id);
            formData.append("cgst", Cgst);
            formData.append("sgst", Sgst);
            formData.append("igst", Igst);
            formData.append("utgst", UTgst);
            formData.append("taxSubTotal", TaxSubtotal);
            formData.append("total", Total);


            const updatedLines = lineItems.map((row) => ({
                invoiceLineId: row.InvoiceLineId,
                itemId: row.ItemId,
                rate: row.Rate,
                quantity: row.Quantity,
                amount: row.Amount,
            }));

            console.log("new", updatedLines)
            formData.append("lineItems", JSON.stringify(updatedLines));
            formData.append("deletedFileIds", JSON.stringify(deletedFileIds));

            selectedFiles.forEach((file) => {
                formData.append("files", file);
            });

            const result = await EditBillForm(formData);
            toast.success('Updated Successfully')
            navigate("/invoice-list");
        } catch (error) {
            console.log(error);
        }
    };

    return (



        <div className="card border-secondary mt-4">
            {
                loading ? <Spinner />
                    :
                    <>
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
                                            value={VendorName}
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
                                            value={DocumentNo}
                                            className="form-control"
                                            name="contractname"
                                            disabled
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="reference" className="form-label">
                                            Reference No.
                                        </label>

                                        <input
                                            type="text"
                                            id="reference"
                                            className="form-control"
                                            name="reference"
                                            value={RefNo}
                                            onChange={(e) => {
                                                setRefNo(e.target.value)
                                            }}
                                        />
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
                                            value={`INR ${ContractTotal?.toFixed(2)}`}
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
                                            value={`INR ${TotalInvoicedAmount?.toFixed(2)}`}
                                            className="form-control"
                                            disabled
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor="due-date" className="form-label">
                                            Due Date
                                        </label>

                                        <input
                                            type="date"
                                            name="due-date"
                                            id="due-date"
                                            className="form-control"
                                            value={DueDate}
                                            onChange={handleDueDateChange}
                                            min={formattedDate}
                                        />
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
                                            {lineItems?.map((row, index) => (
                                                <tr key={index}>
                                                    <td style={{ width: "200px" }}>{row.ItemName}</td>
                                                    <td style={{ width: "200px" }} className="text-end">INR {row.Rate?.toFixed(2)}</td>

                                                    <td style={{ width: "200px" }}>
                                                        <input
                                                            type="number"
                                                            className="form-control text-end"
                                                            name={`quantity_${index}`}
                                                            value={row.Quantity}
                                                            onChange={(e) =>
                                                                handleQuantityChange(
                                                                    index,
                                                                    e.target.value,
                                                                    row.remainingQuantity
                                                                )
                                                            }
                                                            placeholder={`max ${row.remainingQuantity} `}
                                                            max={row.remainingQuantity}
                                                            min={0}
                                                        // disabled={row.remainingQunatity == 0}
                                                        />
                                                    </td>

                                                    <td style={{ width: "200px" }} className="text-end">{row.Amount && "INR "} {row.Amount}</td>
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
                                                    <input className="form-control text-end" type="text" id="finalTotalAmount" value={`INR ${InvoiceTotal}`} disabled />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

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
                                                        value={Cgst}
                                                        onChange={(e) => handleChange(e, 'Cgst')}
                                                        disabled={UTgst || Igst}
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
                                                        value={Sgst}
                                                        onChange={(e) => handleChange(e, 'Sgst')}
                                                        disabled={UTgst || Igst}
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
                                                        value={UTgst}
                                                        onChange={(e) => handleChange(e, 'Utgst')}
                                                        disabled={Cgst || Sgst || Igst}
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
                                                        value={Igst}
                                                        onChange={(e) => handleChange(e, 'Igst')}
                                                        disabled={Cgst || Sgst || UTgst}
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
                                                <h6 className="px-4">Tax Subtotal</h6>
                                                <span>:</span>
                                                <div className="px-4">
                                                    <input
                                                        type="text"
                                                        className="form-control text-end"
                                                        id="taxSubTotal"
                                                        name="taxSubTotal"
                                                        value={`INR ${TaxSubtotal}`}
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
                                                        value={`INR ${Total}`}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="perchase-terms-tabel table-responsive mb-4">
                                    <h5 className="mb-3">Files</h5>

                                    <table className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th className="text-left">File Name</th>
                                                <th className="text-left">File Type</th>
                                                <th className="text-left">Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {Files?.map((row, index) => (
                                                <tr key={index}>
                                                    <td className="text-left">{row.FileName}</td>
                                                    <td className="text-left">Pdf</td>
                                                    <td className="text-left d-flex align-items-center">
                                                        <a
                                                            href={`${BASE_URL}/file/invoice/${row.FileId}`}
                                                        >
                                                            <img src={downloadicon} alt="" className='tableimg' />

                                                        </a>
                                                        <div className="ms-2">
                                                            <button className="btn btn-sm" onClick={(e) => handleRemoveFile(index, e)}>
                                                                <FaTrash size={20} />
                                                            </button>
                                                        </div>

                                                    </td>


                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
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
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-12">
                                        <button
                                            type="submit"
                                            className="btn btn-success float-end"
                                            onClick={(e) => handleEditSubmit(e)}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>



                            </form>
                        </div>
                    </>
            }
        </div>



    )


};

export default EditBill;
