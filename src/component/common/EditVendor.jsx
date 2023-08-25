import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL, EditContractForm, vendorView } from "../../utils/services";
import { fetchDropDown } from "../../redux/staff/ContractSlice";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import moment from "moment";
import { FaTrash } from "react-icons/fa";
import downloadicon from "../../assets/images/download.png"
import { async } from "q";
import Spinner from "./Spinner";


const EditVendor = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const [VendorName, setVendorName] = useState();
    const [ContractId, setContractId] = useState();
    const [StartDate, setStartDate] = useState();
    const [EndDate, setEndDate] = useState();
    const [Term, setTerm] = useState();
    const [Subsidiary, setSubsidiary] = useState();
    const [TotalAmount, setTotalAmount] = useState();
    const [lineItems, setLineItems] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);
    const [deletedRowIds, setDeletedRowIds] = useState([]);
    const [deletedFileIds, setDeletedFileIds] = useState([]);
    const [Files, setFiles] = useState([]);
    const [attachDocuments, setAttachDocuments] = useState(false);
    const [VendorId, setVendorId] = useState();
    const [items, setItems] = useState([]);
    // for new files
    const [selectedFiles, setSelectedFiles] = useState([]);



    // const { items } = useSelector((state) => state.contract.dropdownItems);

    useEffect(() => {
        dispatch(fetchDropDown());
    }, [dispatch]);

    // const [finalTotalAmount, setFinalTotalAmount] = useState(0);


    const handleVendorView = async (id) => {
        setLoading(true)
        const result = await vendorView(id);
        setLoading(false)
        setVendorName(result.res.VendorName);
        setContractId(result.res.ContractId);
        setStartDate(moment(result.res.StartDate).format().slice(0, 10));
        setEndDate(moment(result.res.EndDate).format().slice(0, 10));
        setTerm(result.res.Term);
        setSubsidiary(result.res.Subsidiary);
        setTotalAmount(result.res.ContractTotal)
        setLineItems(result.res.lineItems);
        setFiles(result.res.files);
        setVendorId(result.res.VendorId);
    };

    useEffect(() => {
        if (id) {
            handleVendorView(id);
        }
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            if (VendorId) {

                try {
                    const newresponse = await axios.get(
                        `${BASE_URL}/vendor-details/vendor/itemlist/${VendorId}`
                    );
                    const rows = newresponse.data.sort((a, b) => a.itemname.localeCompare(b.itemname));
                    console.log(rows);
                    setItems(rows);
                } catch (error) {
                    console.log(error);
                }
            }
        };

        fetchData();
    }, [VendorId]);



    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
        setIsDisabled(false);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const handleLineItemChange = (index, field, value) => {
        const updatedLineItems = [...lineItems];

        let newValue;
        if (field === "Quantity") {

            newValue = value.replace(/[^0-9]/g, "");
            console.log("newValue of quantity", newValue);
        } else if (field === "Rate") {

            newValue = value.replace(/[^0-9.]/g, "");
            console.log("newValue of rate", newValue);

            const dotIndex = newValue.indexOf(".");

            if (dotIndex !== -1 && newValue.length - dotIndex > 3) {
                newValue = newValue.slice(0, dotIndex + 3);
                console.log("newValue of rate1", newValue);
            }
        } else {
            newValue = value;
        }

        updatedLineItems[index][field] = newValue;

        updatedLineItems.forEach((row) => {
            // row.Amount = (row.Quantity * row.Rate).toFixed(2);
            row.Amount = isNaN(row.Quantity) || isNaN(row.Rate) ? "" : (row.Quantity * row.Rate).toFixed(2);
        });

        setLineItems(updatedLineItems);
        // console.log(updatedLineItems)
    };

    const handleRemoveItem = (index, event) => {
        event.preventDefault();

        if (lineItems.length === 1) {
            alert("At least one item should be there");
            return;
        }

        const updatedLineItems = [...lineItems];
        const deletedRowId = updatedLineItems[index].id;
        console.log("hi", deletedRowId)
        updatedLineItems.splice(index, 1);

        setLineItems(updatedLineItems);
        setDeletedRowIds((prevDeletedIds) => [...prevDeletedIds, deletedRowId]);
    };

    const handleAddItem = () => {

        const newItem = {
            id: "",
            itemId: "",
            rate: "",
            quantity: "",
            amount: "",

        };

        const updatedLineItems = [...lineItems, newItem];
        setLineItems(updatedLineItems);
        console.log("hi", updatedLineItems)
    };

    const handleRemoveFile = (index) => {


        const updatedFiles = [...Files];
        const deletedFileId = updatedFiles[index].FileId;
        console.log("hi", deletedFileId)

        updatedFiles.splice(index, 1);

        setFiles(updatedFiles);
        setDeletedFileIds((prevDeletedIds) => [...prevDeletedIds, deletedFileId]);
        console.log("hi", updatedFiles)
    };

    const handleFileInputChange = (event) => {
        const selectedFilesArray = Array.from(event.target.files);
        setSelectedFiles(selectedFilesArray);
    };

    useEffect(() => {
        const calculateTotalAmount = () => {
            const total = lineItems.reduce(
                (acc, item) => acc + parseFloat(item.Amount || 0),
                0
            );

            setTotalAmount(total.toFixed(2));
        };

        calculateTotalAmount();
    }, [lineItems]);


    const currentDate = new Date().toISOString().split("T")[0];
    const minEndDate = StartDate
        ? new Date(StartDate)
        : new Date();

    minEndDate.setDate(minEndDate.getDate() + 1);

    const fixEndDate = minEndDate.toISOString().split("T")[0];


    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("contractId", ContractId)
            formData.append("startDate", StartDate);
            formData.append("endDate", EndDate);
            formData.append("totalAmount", TotalAmount)
            formData.append("transactionId", user?.transactions[2].id);
            formData.append("roleId", user?.roles[0].id);
            // const nonDeletedItems = lineItems.filter(
            //     (row) => !deletedItemIds.includes(row.ItemId)
            // );
            const updatedLines = lineItems.map((row) => ({
                id: row.id,
                itemId: row.ItemId,
                rate: row.Rate,
                quantity: row.Quantity,
                amount: row.Amount,
            }));
            // console.log("new", updatedLines)
            formData.append("lineItems", JSON.stringify(updatedLines));
            formData.append("deletedRowIds", JSON.stringify(deletedRowIds));
            formData.append("deletedFileIds", JSON.stringify(deletedFileIds));

            // Files.forEach((file) => {
            //     formData.append("oldfiles", file);
            // });

            selectedFiles.forEach((file) => {
                formData.append("files", file);
            });

            // for (const file of selectedFiles) {
            //     formData.append("files", file);
            // }

            const result = await EditContractForm(formData);
            navigate("/contract-listing");
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
                            <h3>Purchase Contract</h3>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <label htmlFor="vendor" className="form-label">
                                            Vendor
                                        </label>
                                        <input
                                            type="text"
                                            id="vendor"
                                            className="form-control"
                                            name="vendor"
                                            value={VendorName}
                                            disabled
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor="startDate" className="form-label">
                                            Start Date
                                        </label>

                                        <input
                                            type="date"
                                            id="startDate"
                                            className="form-control"
                                            name="StartDate"
                                            min={currentDate}
                                            value={StartDate}
                                            onChange={handleStartDateChange}
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor="endDate" className="form-label">
                                            End Date
                                        </label>

                                        <input
                                            type="date"
                                            id="endDate"
                                            className="form-control"
                                            name="endDate"
                                            min={fixEndDate}
                                            value={EndDate}
                                            onChange={handleEndDateChange}
                                            disabled={isDisabled}
                                        />
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
                                            value={Term}
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
                                            value={Subsidiary}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <h5 className="mb-3">Item Desciption</h5>
                                    <div id="MyTables">
                                        <table className="table mt-3">
                                            <thead className="table-heads">
                                                <tr>
                                                    <th className="text-center">Item</th>
                                                    <th className="text-center">Rate</th>
                                                    <th className="text-center">Quantity</th>
                                                    <th className="text-center">Total</th>
                                                    <th className="text-center">Action</th>
                                                </tr>
                                            </thead>

                                            <tbody className="table-theme-1">
                                                {lineItems.map((row, index) => (
                                                    <tr key={index}>
                                                        <td style={{ width: "300px" }}>
                                                            <select
                                                                className="form-select"
                                                                value={row.ItemId}
                                                                onChange={(e) => handleLineItemChange(index, "ItemId", e.target.value)}
                                                            >
                                                                <option value="">Select</option>
                                                                {items.map((item) => (
                                                                    <option key={item.itemId} value={item.itemId}>
                                                                        {item.itemname}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </td>
                                                        <td style={{ width: "300px" }}>
                                                            <input
                                                                type="text"
                                                                className="form-control text-end"
                                                                autocomplete="off"
                                                                value={row.Rate}
                                                                onChange={(e) => handleLineItemChange(index, "Rate", e.target.value)}
                                                            />
                                                        </td>
                                                        <td style={{ width: "300px" }}>
                                                            <input
                                                                type="text"
                                                                className="form-control text-end"
                                                                autoComplete="off"
                                                                value={row.Quantity}
                                                                onChange={(e) => handleLineItemChange(index, "Quantity", e.target.value)}
                                                            />
                                                        </td>

                                                        <td style={{ width: "300px" }}>
                                                            <input
                                                                type="text"
                                                                className="form-control text-end"
                                                                autoComplete="off"
                                                                value={row.Amount}
                                                                onChange={(e) => handleLineItemChange(index, "Amount", e.target.value)}
                                                                disabled
                                                            /></td>

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
                                <div className="row mb-3 justify-content-end">
                                    <div className="col-md-3">
                                        <label htmlFor="finalTotalAmount" className="form-label">
                                            Total Amount
                                        </label>

                                        <input
                                            type="text"
                                            id="finalTotalAmount"
                                            className="form-control text-end"
                                            name="finalTotalAmount"
                                            value={`${TotalAmount && 'INR'} ${TotalAmount}`}
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className="table-responsive mb-4">
                                    <h5 className="mb-3">Files</h5>
                                    <div id="MyTables">
                                        <table className="table mt-3">
                                            <thead className="table-heads">
                                                <tr>
                                                    <th className="text-left">File Name</th>
                                                    <th className="text-left">File Type</th>
                                                    <th className="text-left">Time</th>
                                                    <th className="text-left">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Files.map((row, index) => (
                                                    <tr key={index}>
                                                        <td className="text-left">{row.FileName}</td>
                                                        <td className="text-left">Pdf</td>
                                                        <td className="text-left">12 Jan 2023, 11:49:42 am</td>
                                                        <td className="text-left d-flex align-items-center">
                                                            <a
                                                                href={`${BASE_URL}/file/contract/${row.FileId}`}
                                                            >
                                                                <img src={downloadicon} alt="" className='tableimg' />

                                                            </a>
                                                            <div className="ms-2">
                                                                <button className="btn btn-sm" onClick={() => handleRemoveFile(index)}>
                                                                    <FaTrash size={20} />
                                                                </button>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
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


                                    </div>
                                </div>

                                {/* <div className="row mb-4">
                            <div className="col-md-4">
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleFileInputChange}
                                    multiple
                                />
                            </div>
                        </div> */}
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
        </div >

    );
};

export default EditVendor;
