import { useEffect, useState } from "react";

import API from "../services/api";

import Layout from "../components/Layout";
import SummaryCard from "../components/SummaryCard";
import RecentTransactions from "../components/RecentTransactions";
import ExpenseChart from "../components/ExpenseChart";
import IncomeLineChart from "../components/IncomeLineChart";
import ExpenseBarChart from "../components/ExpenseBarChart";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import formatCurrency from "../utils/formatCurrency";
const Dashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await API.get("/dashboard");
      setData(response.data);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // 🔥 LOADING STATE
  if (loading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  // 🔥 ERROR STATE
  if (error) {
    return (
      <Layout>
        <EmptyState message="Failed to load dashboard data" />
      </Layout>
    );
  }

  // 🔥 EMPTY SAFETY CHECK
  if (!data) {
    return (
      <Layout>
        <EmptyState message="No dashboard data found" />
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      {/* 🔹 MAIN SUMMARY CARDS */}
      <div className="grid md:grid-cols-3 gap-5">
        <SummaryCard title="Income" value={formatCurrency(data.totalIncome || 0)} />
        <SummaryCard title="Expense" value={formatCurrency(data.totalExpense || 0)} />
        <SummaryCard title="Balance" value={formatCurrency(data.balance || 0)} />
      </div>

      {/* 🔥 ANALYTICS SECTION */}
      <div className="grid md:grid-cols-3 gap-5 mt-8">
        <SummaryCard
          title="Total Transactions"
          value={
            (data?.recentIncome?.length || 0) +
            (data?.recentExpense?.length || 0)
          }
        />

        <SummaryCard
          title="Savings Rate"
          value={
            data?.totalIncome
              ? (
                  ((data.balance || 0) / data.totalIncome) *
                  100
                ).toFixed(1) + "%"
              : "0%"
          }
        />
      </div>

      {/* 🔥 CHARTS SECTION (NEW UPGRADE) */}
      <div className="grid md:grid-cols-2 gap-5 mt-8">
        <IncomeLineChart data={data.monthlyIncome || []} />
        <ExpenseBarChart data={data.monthlyExpense || []} />
      </div>

      {/* 🔹 RECENT TRANSACTIONS */}
      <div className="grid md:grid-cols-2 gap-5 mt-8">
        <RecentTransactions
          title="Recent Income"
          data={data.recentIncome || []}
          field="source"
        />

        <RecentTransactions
          title="Recent Expense"
          data={data.recentExpense || []}
          field="category"
        />
      </div>

      {/* 🔹 EXPENSE PIE CHART */}
      <div className="mt-8 bg-white p-5 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">
          Expense Distribution
        </h2>

        <ExpenseChart data={data.allExpenses || []} />
      </div>
    </Layout>
  );
};

export default Dashboard;