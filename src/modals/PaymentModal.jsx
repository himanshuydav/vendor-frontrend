import React, { useContext, useState } from "react";
import { Payment } from "../utils/services";
import { ModalContext } from "../Context";

const PaymentModal = ({ item, payementhandel }) => {
  const [amount, setAmount] = useState("");
  const [transaction, setTransaction] = useState("");
  const [amountError, setAmountError] = useState("");
  const [loading,setLoading] =useState(false);
  const [transactionError, setTransactionError] = useState("");
  const modalContext = useContext(ModalContext);
  const { closeModal } = modalContext;

  let pendingAmount = item.RemainingAmount;

  

  const handlePayment = async () => {
    // Clear previous errors
    setAmountError("");
    setTransactionError("");

    // Validation logic
    let isValid = true;

    if (!transaction.trim()) {
      setTransactionError("Transaction ID is required");
      isValid = false;
    }
    if (!amount.trim()) {
      setAmountError("Amount is required");
      isValid = false;
    } else if (isNaN(amount) || Number(amount) <= 0) {
      setAmountError("Amount must be a positive number");
      isValid = false;
    } else if (Number(amount) > pendingAmount) {
      setAmountError("Amount cannot exceed the pending amount");
      isValid = false;
    }


    if (isValid) {
      setLoading(true)
      const result = await Payment({
        PaymentId: item?.PaymentId,
        AmountPaid: amount,
        TransactionId: transaction,
      });
      setLoading(false)
      payementhandel();
      closeModal()
      // Handle the result as needed
    }
  };

  return (
    <div>
      <h3 className="mb-4">Pay now</h3>
      <form action="">
        <div className="mb-2">
          <p>Transaction ID</p>
          <input
            type="text"
            className="form-control"
            placeholder="Transaction ID"
            value={transaction}
            onChange={(e) => setTransaction(e.target.value)}
          />
          {transactionError && (
            <p className="text-danger">{transactionError}</p>
          )}
        </div>
        <div className="mb-2">
          <p>Amount</p>
          <input
            type="text"
            className="form-control"
            placeholder={`${pendingAmount} Rs max Amount`}
            value={amount}
            onChange={(e) => {
              // Ensure the entered amount does not exceed the pending amount
              const enteredAmount = e.target.value;
              if (!isNaN(enteredAmount) && Number(enteredAmount) <= pendingAmount) {
                setAmount(enteredAmount);
              }
            }}
          />
          {amountError && <p className="text-danger">{amountError}</p>}
        </div>

        <button
          type="button"
          className="btn btn-primary w-100"
          onClick={handlePayment}
        >
          {loading ? (
            <>
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Loading...
            </>
          ) : (
            "Submit"
          )}
         
        </button>
      </form>
    </div>
  );
};

export default PaymentModal;