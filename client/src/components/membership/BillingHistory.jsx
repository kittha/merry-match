import { format, addMonths, parseISO } from "date-fns";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";

function BillingHistory({ history }) {
  const { userId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  if (!history || !Array.isArray(history)) {
    return <p>No billing history available.</p>;
  }

  // Function to format date
  const formatDate = (dateString) => {
    return format(parseISO(dateString), "dd/MM/yyyy");
  };

  // Sort history by transaction_id in descending order
  const sortedHistory = history
    .slice()
    .sort((a, b) => b.transaction_id - a.transaction_id);

  // Find the last billing date and calculate the next billing date
  const lastBillingDate =
    sortedHistory.length > 0
      ? new Date(
          Math.max(...sortedHistory.map((item) => new Date(item.created_at)))
        )
      : null;

  const nextBillingDate = lastBillingDate
    ? addMonths(lastBillingDate, 1)
    : null;

  // Calculate paginated data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHistory = sortedHistory.slice(indexOfFirstItem, indexOfLastItem);

  // Function to determine the background color based on the index
  const getBackgroundColor = (index) => {
    return index % 2 === 1 ? "#F6F7FC" : "#FFFFFF"; // Alternates every item
  };

  const handleRequestPDF = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/membership/${userId}/pdf`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "billing-history.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again later."); // User feedback
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (indexOfLastItem < sortedHistory.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-col gap-[8px] lg:gap-[24px]">
      <h1 className="text-[#2A2E3F] font-[700] text-[24px] max-lg:pt-[8px] max-lg:px-[16px]">
        Billing History
      </h1>
      <div className="billing-box lg:px-[32px] lg:pb-[24px] lg:pt-[32px] lg:border border-[#D6D9E4] lg:rounded-[32px]">
        <h2 className="px-[16px] border-b border-[#E4E6ED] pb-[8px] font-[600] text-[20px] text-gray-700">
          Next billing :{" "}
          {nextBillingDate ? format(nextBillingDate, "dd/MM/yyyy") : "N/A"}
        </h2>
        <div className="pb-[24px]">
          {currentHistory.length > 0 ? (
            currentHistory.map((item, index) => (
              <div
                key={item.id || item.created_at} // Prefer unique key if available
                className="p-[16px]"
                style={{
                  backgroundColor: getBackgroundColor(index),
                }}
              >
                <div className="flex flex-col">
                  <div className="flex flex-row justify-between gap-[16px] items-center">
                    <div className="flex gap-[16px] font-[400] text-gray-700">
                      <p className="date w-[104px]">
                        {formatDate(item.created_at)}
                      </p>
                      <p className="package-name w-[118px] lg:w-[609px]">
                        {item.package_name}
                      </p>
                    </div>
                    <div className="price">
                      <p className="w-[89px] font-[400] text-gray-800">
                        THB {item.package_price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No billing records found.</p>
          )}

          <div className="flex justify-between px-[16px]">
            <button
              className="text-[#C70039] font-[700] hover:text-red-500"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="text-[#C70039] font-[700] hover:text-red-500"
              onClick={handleNextPage}
              disabled={indexOfLastItem >= sortedHistory.length}
            >
              Next
            </button>
          </div>
        </div>
        <div className="flex lg:justify-end border-t border-[#E4E6ED] pt-[16px] max-lg:mb-[58px]">
          <button
            className="text-[#C70039] font-[700] px-[8px] py-[4px] hover:text-red-500"
            onClick={handleRequestPDF}
          >
            Request PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default BillingHistory;
