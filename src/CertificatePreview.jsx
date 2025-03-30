import React from "react";

const certificates = [
    { name: "Employee of the Month", url: "/certificates/certificate1.pdf" },
    { name: "Training Completion", url: "/certificates/certificate2.pdf" }
];

const CertificatePreview = () => {
    const previewCertificate = (pdfUrl) => {
        window.open(pdfUrl, "_blank");
    };

    return (
        <table border="1">
            <thead>
                <tr>
                    <th>Certificate Name</th>
                    <th>Preview</th>
                </tr>
            </thead>
            <tbody>
                {certificates.map((cert, index) => (
                    <tr key={index}>
                        <td>{cert.name}</td>
                        <td>
                            <button onClick={() => previewCertificate(cert.url)}>Preview</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CertificatePreview;
