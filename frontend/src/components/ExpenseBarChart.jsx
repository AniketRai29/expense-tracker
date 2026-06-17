import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const ExpenseBarChart = ({ data }) => {
  return (
    <div className="w-full h-80 bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Monthly Expense Trend</h2>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data || []}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="expense" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseBarChart;