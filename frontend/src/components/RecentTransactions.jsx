import formatCurrency from "../utils/formatCurrency";
const RecentTransactions = ({
  title,
  data,
  field
}) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">
        {title}
      </h2>

      {data.map((item) => (
        <div
          key={item._id}
          className="flex justify-between border-b py-2"
        >
          <span>
            {item[field]}
          </span>

          <span>
            {formatCurrency(item.amount)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default RecentTransactions;