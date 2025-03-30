const teamMembers = [
    { id: 1, name: "Alice", certificate: null },
    { id: 2, name: "Bob", certificate: null },
    { id: 3, name: "Charlie", certificate: null },
];

const renderTable = () => {
    const tbody = document.getElementById("teamTable");
    tbody.innerHTML = teamMembers
        .map(
            (member) => `
        <tr>
            <td><input type="checkbox" class="memberCheckbox" data-id="${member.id}" /></td>
            <td>${member.name}</td>
            <td>${member.certificate ? `Generated` : "Not Generated"}</td>
        </tr>
    `
        )
        .join("");
};

const toggleSelectAll = () => {
    const checkboxes = document.querySelectorAll(".memberCheckbox");
    const selectAll = document.getElementById("selectAll").checked;
    checkboxes.forEach((cb) => (cb.checked = selectAll));
};

const generateCertificates = () => {
    const selectedIds = Array.from(document.querySelectorAll(".memberCheckbox:checked")).map(
        (cb) => parseInt(cb.dataset.id)
    );

    if (selectedIds.length === 0) {
        alert("No team members selected.");
        return;
    }

    // Simulate certificate generation
    selectedIds.forEach((id) => {
        const member = teamMembers.find((m) => m.id === id);
        if (member) member.certificate = `Certificate_${id}.pdf`;
    });

    alert("Certificates generated for selected team members!");
    renderTable();
};

// Initialize the table
document.addEventListener("DOMContentLoaded", renderTable);
