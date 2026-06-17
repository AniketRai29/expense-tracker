import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const IncomeLineChart = ({ data }) => {
  return (
    <div className="w-full h-80 bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Monthly Income Trend</h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data || []}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#16a34a"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeLineChart;