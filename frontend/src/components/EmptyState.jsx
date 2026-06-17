const EmptyState = ({
  message
}) => {
  return (
    <div className="bg-white rounded-xl p-10 shadow text-center">
      <h2 className="text-xl text-gray-500">
        {message}
      </h2>
    </div>
  );
};

export default EmptyState;