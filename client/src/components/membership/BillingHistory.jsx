import { format, addMonths, parseISO } from "date-fns";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";

function BillingHistory({ history }) {
  const { userId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isPdfLoading, setIsPdfLoading] = useState(false);

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
    setIsPdfLoading(true);
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
      // console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again later.");
    } finally {
      setIsPdfLoading(false);
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
      <div className="billing-box flex flex-col lg:px-[32px] lg:pb-[24px] lg:pt-[32px] lg:border border-[#D6D9E4] lg:rounded-[32px] gap-[16px]">
        <h2 className=" border-b border-[#E4E6ED] max-lg:px-[16px] py-[8px] font-[600] text-[20px] text-gray-700">
          Next billing :{" "}
          {nextBillingDate ? format(nextBillingDate, "dd/MM/yyyy") : "N/A"}
        </h2>
        <div className="pb-[24px] lg:px-[16px] border-b border-[#E4E6ED]">
          {currentHistory.length > 0 ? (
            currentHistory.map((item, index) => (
              <div
                key={item.id || item.created_at}
                className="lg:rounded-[8px]"
                style={{
                  backgroundColor: getBackgroundColor(index),
                }}
              >
                <div className="flex flex-col">
                  <div className="flex flex-row justify-between gap-[16px] items-center p-[16px]">
                    <div className="flex gap-[16px] font-[400] text-gray-700">
                      <p className="date w-[104px]">
                        {formatDate(item.created_at)}
                      </p>
                      <p className="package-name w-[110px] lg:w-[500px]">
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
            <p className="flex justify-center items-center p-[16px] bg-[#F6F7FC] lg:rounded-[8px]">
              No billing records found.
            </p>
          )}

          <div className="flex justify-between p-[16px]">
            <button
              className="text-[#C70039] font-[700] hover:text-red-500 "
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
        <div className="flex lg:justify-end max-lg:py-[4px] max-lg:px-[16px] max-lg:mb-[58px]">
          <button
            className="text-[#C70039] font-[700] hover:text-red-500"
            onClick={handleRequestPDF}
            disabled={isPdfLoading}
          >
            {isPdfLoading ? "Generating PDF..." : "Request PDF"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BillingHistory;
