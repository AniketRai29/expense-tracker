import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import API from "../services/api";

import AddExpenseModal from "../components/AddExpenseModal";
import ExportButton from "../components/ExportButton";
import EmptyState from "../components/EmptyState";
import formatCurrency from "../utils/formatCurrency";
const Expense = () => {
  const [expense, setExpense] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchExpense = async () => {
    try {
      const response = await API.get(
        `/expense?page=${page}&limit=10&startDate=${startDate}&endDate=${endDate}`
      );

      setExpense(response.data?.expense || []);
      setTotalPages(response.data?.totalPages || 1);
    } catch (error) {
      setExpense([]);
      setTotalPages(1);
    }
  };

  useEffect(() => {
    fetchExpense();
  }, [page]);

  const deleteExpense = async (id) => {
    try {
      await API.delete(`/expense/${id}`);
      fetchExpense();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="flex justify-between mb-6">
        <h1 className="text-4xl font-bold">Expense</h1>

        <div className="flex gap-3">
          <ExportButton type="expense" />

          <button
            onClick={() => setShowModal(true)}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Add Expense
          </button>
        </div>
      </div>

      {/* FILTER UI */}
      <div className="flex gap-4 mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button
          onClick={fetchExpense}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Filter
        </button>
      </div>

      {showModal && (
        <AddExpenseModal
          refresh={fetchExpense}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* ✅ EMPTY STATE ADDED */}
      {expense.length === 0 ? (
        <EmptyState message="No expense found" />
      ) : (
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {expense.map((item) => (
              <tr key={item._id}>
                <td>{item.category}</td>
                <td>{formatCurrency(item.amount)}</td>
                <td>
                  {new Date(item.date).toLocaleDateString()}
                </td>

                <td>
                  <button
                    onClick={() => deleteExpense(item._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* PAGINATION */}
      <div className="flex gap-4 mt-5 items-center">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </Layout>
  );
};

export default Expense;