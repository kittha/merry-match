// controllers/billingHistory.controller.mjs

import PDFDocument from "pdfkit";
import { getBillingHistoryByUserId } from "../models/billingHistory.model.mjs";
import { getPackageById } from "../models/package.model.mjs";
import { format, parseISO, isValid } from "date-fns";

export const generateBillingHistoryPDF = async (req, res) => {
  const { userId } = req.params;

  // Function to format date
  const formatDate = (dateInput) => {
    try {
      let dateString;

      // Convert dateInput to string if it is not already
      if (dateInput instanceof Date) {
        dateString = dateInput.toISOString(); // Convert Date object to ISO string
      } else if (typeof dateInput === "number") {
        dateString = new Date(dateInput).toISOString(); // Convert timestamp to ISO string
      } else if (typeof dateInput === "string") {
        dateString = dateInput;
      } else {
        throw new Error("Date is not in a recognized format");
      }

      // Parse and validate the date
      const date = parseISO(dateString);
      if (!isValid(date)) {
        throw new Error("Invalid date");
      }

      return format(date, "dd/MM/yyyy");
    } catch (error) {
      console.error("Error parsing date:", error);
      return "Invalid date";
    }
  };

  try {
    // Fetch billing history and package details
    const billingHistory = await getBillingHistoryByUserId(userId);

    // Create a new PDF document
    const doc = new PDFDocument();

    // Stream PDF to response
    res.setHeader(
      "Content-disposition",
      "attachment; filename=billing-history.pdf"
    );
    res.setHeader("Content-type", "application/pdf");
    doc.pipe(res);

    // Add title
    doc.fontSize(18).text("Billing History", { align: "center" });
    doc.moveDown();

    // Add billing history
    for (const item of billingHistory) {
      const packageDetails = await getPackageById(item.package_id);

      // Add details to the PDF
      doc
        .fontSize(12)
        .text(`Date: ${formatDate(item.created_at)}`)
        .text(`Package: ${packageDetails.name}`)
        .text(`Price: THB ${packageDetails.price}`)
        .moveDown();
    }

    // Finalize the PDF and end the stream
    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ message: "Error generating PDF" });
  }
};
