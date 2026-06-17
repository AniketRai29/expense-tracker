import {
  PieChart,
  Pie,
  Tooltip
} from "recharts";

const ExpenseChart = ({
  data
}) => {
  const groupedData =
    Object.values(
      data.reduce(
        (acc, item) => {
          if (
            !acc[
              item.category
            ]
          ) {
            acc[
              item.category
            ] = {
              category:
                item.category,
              amount: 0
            };
          }

          acc[
            item.category
          ].amount +=
            item.amount;

          return acc;
        },
        {}
      )
    );

  return (
    <PieChart
      width={400}
      height={300}
    >
      <Pie
        data={groupedData}
        dataKey="amount"
        nameKey="category"
        outerRadius={100}
      />

      <Tooltip />
    </PieChart>
  );
};

export default ExpenseChart;