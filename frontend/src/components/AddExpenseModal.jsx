import { useState } from "react";

import API from "../services/api";
import Modal from "./Modal";
import { notifySuccess, notifyError } from "../utils/notify";

const AddExpenseModal = ({ onClose, refresh }) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const submitExpense = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/expense", {
        category,
        amount,
        date,
      });

      refresh();

      notifySuccess("Expense added successfully");

      // reset form
      setCategory("");
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
    <Modal title="Add Expense" onClose={onClose}>
      <form onSubmit={submitExpense}>
        <input
          placeholder="Category"
          className="border p-3 w-full mb-3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
          className="bg-red-600 text-white px-5 py-2 rounded w-full"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </Modal>
  );
};

export default AddExpenseModal;