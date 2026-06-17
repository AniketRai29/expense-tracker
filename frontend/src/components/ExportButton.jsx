const ExportButton = ({
  type
}) => {
  const downloadExcel =
    async () => {
      const token =
        localStorage.getItem(
          "token"
        );

      window.open(
        `http://localhost:5000/api/export/${type}?token=${token}`
      );
    };

  return (
    <button
      onClick={
        downloadExcel
      }
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Export {type}
    </button>
  );
};

export default ExportButton;