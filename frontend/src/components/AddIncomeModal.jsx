import { useState } from "react";

import API from "../services/api";
import Modal from "./Modal";
import { notifySuccess, notifyError } from "../utils/notify";

const AddIncomeModal = ({ onClose, refresh }) => {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const submitIncome = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/income", {
        source,
        amount,
        date,
      });

      refresh();

      notifySuccess("Income added successfully");

      // reset form
      setSource("");
      setAmount("");
      setDate("");

      onClose();
    } catch (error) {
      console.log(error);

      notifyError(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Add Income" onClose={onClose}>
      <form onSubmit={submitIncome}>
        <input
          placeholder="Source"
          className="border p-3 w-full mb-3"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          className="border p-3 w-full mb-3"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="date"
          className="border p-3 w-full mb-3"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          disabled={loading}
          className="bg-green-600 text-white px-5 py-2 rounded w-full"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </Modal>
  );
};

export default AddIncomeModal;