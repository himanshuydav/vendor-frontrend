import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Approvalprocess, financeCreation, invoiceView } from "../../utils/services";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import Spinner from "../../component/common/Spinner";

const FinanceInvoiceCreation = () => {
    const { id } = useParams();
    const [ViewItem, setViewItem] = useState({});
    const [totalAmount, setTotalAmount] = useState();
    const [tdsAmount, setTdsAmount] = useState();
    const [tdsPercentage, setTdsPercentage] = useState("");
    const [isTdsValid, setIsTdsValid] = useState(true); // To track TDS validation
    const user = JSON.parse(localStorage.getItem('user'))
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleView = async (id) => {
        setLoading(true)
        const result = await invoiceView(id);
        setLoading(false)
        setViewItem(result.res);
    };

    const handleTDSAmount = (e) => {
        const input = e.target.value;
        const numericInput = input;
        setTdsAmount(numericInput);
        // const total = ViewItem?.Total || 0; // Use 0 if Total is undefined or null
        const calculatedPercentage = (e.target.value / ViewItem?.InvoiceTotal) * 100 || 0;
        setTdsPercentage(calculatedPercentage)
        setTotalAmount(ViewItem?.Total - numericInput);
        // return calculatedPercentage;
    }



    const handleSubmit = async () => {
        // Perform form submission if TDS is valid and other conditions are met
        if (isTdsValid && tdsPercentage !== "") {
            const result = await financeCreation({
                "InvoiceId": id,
                "TDS": tdsPercentage,
                "Total": totalAmount,
                "TDSAmount": tdsAmount
            })

            const results = await Approvalprocess({
                "transactionId": user?.transactions[1]?.id,
                "roleId": user?.roles[0].id,
                "DocumentId": id
            })
            Swal.fire({
                position: 'center-center',
                icon: 'success',
                title: 'TDS Submited Successfully!',
                showConfirmButton: false,
                timer: 2500
            })
            // toast.success(result.res.message);
            navigate("/");
        } else {
            alert("Please enter a valid TDS percentage.");
        }
    };

    useEffect(() => {
        if (id) {
            handleView(id);
        }
    }, [id]);



    return (
        <>
            <Helmet>
                <title>Vendor Portal || Finance Creation</title>
            </Helmet>
            {
                loading ? <Spinner />
                    :
                    <>
                        <div className="card border-secondary mt-4">
                            <div className="card-body">
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <h5 className="col-md-5">Bill to :</h5>
                                        <p>JStreams Solutions Pvt Limited, <br />
                                            Unitech Cyber Park, Tower C, 10th Floor
                                            <br />Sector 39, Durga Colony , Gurugram</p>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row mb-4">
                                            <h6 className="col-md-5">Legal Name</h6>
                                            <span className="col-md-1">:</span>
                                            <div className="col-md-6">{ViewItem?.VendorName}</div>
                                        </div>
                                        <div className="row mb-4">
                                            <h6 className="col-md-5">Purchase Contract</h6>
                                            <span className="col-md-1">:</span>
                                            <div className="col-md-6">{ViewItem?.DocumentNo}</div>
                                        </div>


                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="perchase-terms-tabel table-responsive">
                                        <h5 className="mb-3">Item Description</h5>
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
                                                {ViewItem?.lineItems?.map((row, index) => (
                                                    <tr key={index}>
                                                        <td>{row.ItemName}</td>
                                                        <td className="text-end">{row?.Rate?.toFixed(2)}</td>
                                                        <td className="text-end">{row.Quantity}</td>
                                                        <td className="text-end">INR {row?.Amount?.toFixed(2)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>

                                        </table>

                                    </div>
                                </div>
                                <div className="row ">
                                    <div className="col-12">
                                        <div className="d-flex justify-content-end">
                                            <div className="d-flex align-items-center mt-4">
                                                <h6 className="px-4">Sub Total</h6>
                                                <span >:</span>
                                                <div className="px-4 ">
                                                    <input class="form-control text-end" type="text" placeholder="Default input" value={`INR ${ViewItem?.InvoiceTotal?.toFixed(2)}`} disabled />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-flex justify-content-end">
                                            <div className="d-flex align-items-center mt-4">
                                                <h6 className="px-4">GST Total</h6>
                                                <span >:</span>
                                                <div className="px-4 ">
                                                    <input class="form-control text-end " type="text" placeholder="Default input" value={`INR ${ViewItem?.TaxSubtotal?.toFixed(2)}`} disabled />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-flex justify-content-end">
                                            <div className="d-flex align-items-center mt-4">
                                                <h6 className="px-4">Grand Total</h6>
                                                <span >:</span>
                                                <div className="px-4 ">
                                                    <input class="form-control text-end" type="text" placeholder="Default input" value={`INR ${ViewItem?.Total?.toFixed(2)}`} disabled />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-flex justify-content-end">
                                            <div className="d-flex align-items-center mt-4">
                                                <h6 className="px-4">TDS Amount</h6>
                                                <span >:</span>
                                                <div className="px-4 ">
                                                    <input class="form-control text-end" type="text" placeholder="TDS Amount" value={tdsAmount} onChange={handleTDSAmount} />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    {
                                        tdsAmount &&

                                        <>
                                            <div className="col-12">
                                                <div className="d-flex justify-content-end">
                                                    <div className="d-flex align-items-center mt-4">
                                                        <h6 className="px-4">TDS(%)</h6>
                                                        <span >:</span>
                                                        <div className="px-4 ">
                                                            <input class="form-control text-end" type="text" placeholder="Please enter TDS %" value={tdsPercentage} disabled />
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                            <div className="col-12">
                                                <div className="d-flex justify-content-end">
                                                    <div className="d-flex align-items-center mt-4">
                                                        <h6 className="px-4">Total Amount</h6>
                                                        <span >:</span>
                                                        <div className="px-4 ">
                                                            <input class="form-control text-end" type="text" placeholder="" value={`INR ${totalAmount?.toFixed(2)}`} disabled />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        </>
                                    }

                                    <div className="col-12">
                                        <div className="d-flex justify-content-end">
                                            <div className="d-flex align-items-center mt-4">
                                                <button className="btn btn-success mx-4" onClick={handleSubmit}>
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </>
            }

        </>
    )

}

export default FinanceInvoiceCreation;