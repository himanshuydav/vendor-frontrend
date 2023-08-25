import React, { useContext, useState } from "react";
import { ModalContext } from "../Context";
import { Rejectprocess } from "../utils/services";

const RejectInvoice = ({ item, handleInvoiceList }) => {
  const [loading, setLoading] = useState(false);
  const [rejectReason, setRejectReason] = useState(""); // Add state for reject reason
  const [error, setError] = useState(""); // Add state for error
  const modalContext = useContext(ModalContext);
  const { closeModal } = modalContext;
  const user = JSON.parse(localStorage.getItem("user"));

  const handleReject = async () => {
    if (!rejectReason) {
      setError("Please provide a reject reason.");
      return;
    }

    setLoading(true);
    const result = await Rejectprocess({
      "transactionId":user?.transactions[1]?.id,
      "Rejected_RoleId": user?.roles[0].id,
      "DocumentId": item.id,
      "Rejection_Reason":rejectReason,
      "level":''
    });
    handleInvoiceList();
    closeModal();
  };

  const handleChangeRejectReason = (e) => {
    setRejectReason(e.target.value);
    setError("");
  };

  return (
    <div>
      <h6 className="text-left">Rejection reason</h6>
      <p className="text-left mt-2">Are you sure reject this Bill ?</p>
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        placeholder="Reason"
        className="reject-reason mt-2"
        value={rejectReason}
        onChange={handleChangeRejectReason}
      ></textarea>
       {error && <p className="text-danger">{error}</p>}
       <div className="mt-3 d-flex justify-content-between">
        <button className="concel-btn-modal btn btn-danger" onClick={closeModal}>
          Cancel
        </button>
        <button className="btn btn-success" onClick={handleReject}>
          {loading ? (
            <>
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Loading...
            </>
          ) : (
            "Reject"
          )}
        </button>
      </div>
    </div>
  );
};

export default RejectInvoice;