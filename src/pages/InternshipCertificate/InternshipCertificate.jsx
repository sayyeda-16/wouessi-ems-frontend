import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "bootstrap/dist/css/bootstrap.min.css";
import "./InternshipCertificate.css"; // Import custom CSS

function InternshipCertificate() {
  const [formData, setFormData] = useState({
    name: "",
    internType: "",
    startDate: "",
    endDate: "",
  });

  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formatDateRange = () => {
    const { startDate, endDate } = formData;
    if (!startDate || !endDate) return "Date range not provided";
    const start = new Date(startDate).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    const end = new Date(endDate).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    return `${start} - ${end}`;
  };

  const generateInternshipCertificate = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("Internship Completion Certificate", 105, 20, { align: "center" });
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.text("This is to certify that", 105, 50, { align: "center" });
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(formData.name || "Name not provided", 105, 65, {
      align: "center",
    });
    doc.setFont("helvetica", "normal");
    doc.text(`has successfully completed their internship as a`, 105, 80, {
      align: "center",
    });
    doc.setFont("helvetica", "bold");
    doc.text(formData.internType || "Type not provided", 105, 95, {
      align: "center",
    });
    doc.setFont("helvetica", "normal");
    doc.text(`from ${formatDateRange()}.`, 105, 110, { align: "center" });
    doc.setLineWidth(0.5);
    doc.line(30, 30, 180, 30);
    doc.line(30, 130, 180, 130);
    doc.setFontSize(12);
    doc.text(`Issued on: ${currentDate}`, 105, 150, { align: "center" });
    doc.text("Authorized by: xAI Admin", 105, 160, { align: "center" });
    doc.save(`${formData.name || "Intern"}_Internship_Certificate.pdf`);
  };

  return (
    <div className="container mt-5 internship-certificate-container">
      <h1 className="mb-4 text-center">Internship Certificate Generator</h1>
      <p className="lead text-center mb-4">
        Generate a completion certificate for interns.
      </p>

      <div className="card mx-auto mb-4 certificate-card">
        <div className="card-body">
          <h5 className="card-title text-center">Enter Certificate Details</h5>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter full name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="internType" className="form-label">
                Internship Type
              </label>
              <input
                type="text"
                className="form-control"
                id="internType"
                name="internType"
                value={formData.internType}
                onChange={handleInputChange}
                placeholder="e.g., Paid Intern, Volunteer"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="startDate" className="form-label">
                Start Date
              </label>
              <input
                type="date"
                className="form-control"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="endDate" className="form-label">
                End Date
              </label>
              <input
                type="date"
                className="form-control"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <h6 className="mt-4 text-center">Preview</h6>
          <div className="preview-text card-text">
            <p>
              <strong>Name:</strong> {formData.name || "Not provided"}
            </p>
            <p>
              <strong>Intern Type:</strong>{" "}
              {formData.internType || "Not provided"}
            </p>
            <p>
              <strong>Dates:</strong> {formatDateRange()}
            </p>
            <p>
              <strong>Issued on:</strong> {currentDate}
            </p>
            <p>
              <strong>Authorized by:</strong> xAI Admin
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          className="btn btn-primary btn-generate"
          onClick={generateInternshipCertificate}
        >
          Generate Certificate
        </button>
      </div>
    </div>
  );
}

export default InternshipCertificate;
