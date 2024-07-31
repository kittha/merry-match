import { format, addMonths, parseISO } from "date-fns";

function BillingHistory({ history }) {
  if (!history || !Array.isArray(history)) {
    return <p>No billing history available.</p>;
  }

  // Function to format date
  const formatDate = (dateString) => {
    return format(parseISO(dateString), "dd/MM/yyyy");
  };

  // Find the last billing date and calculate the next billing date
  const lastBillingDate =
    history.length > 0
      ? new Date(Math.max(...history.map((item) => new Date(item.created_at))))
      : null;

  const nextBillingDate = lastBillingDate
    ? addMonths(lastBillingDate, 1)
    : null;

  // Function to determine the background color based on the index
  const getBackgroundColor = (index) => {
    return index % 2 === 1 ? "#F6F7FC" : "#FFFFFF"; // Alternates every item
  };

  // Get the most recent 5 billing records
  const recentHistory = history.slice(0, 5);

  return (
    <div className="flex flex-col gap-[8px] lg:gap-[24px]">
      <h1 className="text-[#2A2E3F] font-[700] text-[24px] pt-[8px] px-[16px]">
        Billing History
      </h1>
      <div className="billing-box lg:px-[32px] lg:pb-[24px] lg:pt-[32px] lg:border border-[#D6D9E4] lg:rounded-[32px]">
        <h2 className="px-[16px] border-b border-[#E4E6ED] pb-[8px] font-[600] text-[20px] text-gray-700">
          Next billing :{" "}
          {nextBillingDate ? format(nextBillingDate, "dd/MM/yyyy") : "N/A"}
        </h2>
        <div className="pb-[24px]">
          {recentHistory.length > 0 ? (
            recentHistory.map((item, index) => (
              <div
                key={index}
                className="p-[16px] "
                style={{ backgroundColor: getBackgroundColor(index) }}
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
        </div>
        <div className="flex lg:justify-end border-t border-[#E4E6ED] pt-[16px] max-lg:mb-[58px]">
          <button className="text-[#C70039] font-[700] px-[8px] py-[4px]">
            Request PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default BillingHistory;
