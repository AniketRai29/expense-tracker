import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import API from "../services/api";
import AddIncomeModal from "../components/AddIncomeModal";
import ExportButton from "../components/ExportButton";
import EmptyState from "../components/EmptyState";
import formatCurrency from "../utils/formatCurrency";
const Income = () => {
  const [income, setIncome] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchIncome = async () => {
    try {
      const response = await API.get(
        `/income?page=${page}&limit=10`
      );

      setIncome(response.data?.income || []);
      setTotalPages(response.data?.totalPages || 1);
    } catch (error) {
      setIncome([]);
      setTotalPages(1);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, [page]);

  const deleteIncome = async (id) => {
    try {
      await API.delete(`/income/${id}`);
      fetchIncome();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="flex justify-between mb-6">
        <h1 className="text-4xl font-bold">Income</h1>

        <div className="flex gap-3">
          <ExportButton type="income" />

          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Income
          </button>
        </div>
      </div>

      {showModal && (
        <AddIncomeModal
          refresh={fetchIncome}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* ✅ EMPTY STATE ADDED HERE */}
      {income.length === 0 ? (
        <EmptyState message="No income found" />
      ) : (
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr>
              <th>Source</th>
              <th>Amount</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {income.map((item) => (
              <tr key={item._id}>
                <td>{item.source}</td>
                <td>{formatCurrency(item.amount)}</td>
                <td>
                  {new Date(item.date).toLocaleDateString()}
                </td>

                <td>
                  <button
                    onClick={() => deleteIncome(item._id)}
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

export default Income;