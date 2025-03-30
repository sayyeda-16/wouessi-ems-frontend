// This script handles the generation of a certificate when the button is clicked.
document.getElementById("generate-btn").addEventListener("click", async () => {
    const message = document.getElementById("generating-message");

    // Show "Generating..." message
    message.style.display = "block";

    try {
        console.log("Certificate generation started...");

        // Call the API
        const response = await fetch("/api/generateCertificate", { method: "POST" });

        if (!response.ok) {
            throw new Error("Certificate generation failed");
        }

        console.log("Certificate generated successfully!");
    } catch (error) {
        console.error("Error:", error);
    } finally {
        // Hide "Generating..." message
        message.style.display = "none";
    }
});
