import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../Context";
import { RejectedBYlist, Rejectprocess } from "../utils/services";
import { useNavigate } from "react-router-dom";

const RejectAtView = ({ id, levelData }) => {
  const [loading, setLoading] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [error, setError] = useState("");
  const [levelValue, setLevelValue] = useState("");
  const modalContext = useContext(ModalContext);
  const { closeModal } = modalContext;
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleReject = async () => {
    if (!rejectReason) {
      setError("Please provide a reject reason.");
      return;
    }

    if (!levelValue ) {
      setError("Please select a role.");
      return;
    }
    if (levelValue ==="select role" ) {
      setError("Please select a role.");
      return;
    }

    setLoading(true);
    const result = await Rejectprocess({
      transactionId: user?.transactions[2]?.id,
      Rejected_RoleId: user?.roles[0].id,
      DocumentId: id,
      Rejection_Reason: rejectReason,
      level: levelValue,
    });
    navigate("/")
    closeModal();
  };

  const handleChangeRejectReason = (e) => {
    setRejectReason(e.target.value);
    setError("");
  };

  const handleRejectlist = async () => {
    const result = await RejectedBYlist({
      transactionId: user?.transactions[2]?.id,
      RoleId: user?.roles[0].id,
    });
    console.log(result);
  };

  useEffect(() => {
    if (user?.transactions[2]?.id && user?.roles[0].id) {
      handleRejectlist();
    }
  }, []);

  const onOptionChangeHandler = (event) => {
    setLevelValue(event.target.value);
    setError(""); // Reset the error message when a role is selected
  };

  return (
    <div>
      <h6 className="text-left">Rejection reason</h6>
      <p className="text-left mt-2">Are you sure reject this Purchase Contract?</p>
      <select className="form-select mt-2" onChange={onOptionChangeHandler}>
        <option >Select Role</option>
        {levelData.map((option, index) => {
          return (
            <option key={index} value={option?.level}>
              {option?.RoleName}
            </option>
          );
        })}
      </select>
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        placeholder=" Reason"
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
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
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

export default RejectAtView;