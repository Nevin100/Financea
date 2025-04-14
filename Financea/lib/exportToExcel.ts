import { saveAs } from "file-saver";
import ExcelJS from "exceljs";

export const exportToExcel = (clients: any[], selectedClients: string[]) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Clients");

    // Add header row
    worksheet.columns = [
        { header: "Client Name", key: "clientName" },
        { header: "Email", key: "email" },
        { header: "Mobile", key: "mobile" },
        { header: "Company", key: "companyName" },
        { header: "Service Charge", key: "serviceCharge" },
        { header: "Status", key: "status" },
        { header: "Issue Date", key: "createdAt" },
        { header: "Due Date", key: "dueDate" },
    ];

    // Add rows
    const dataToExport = selectedClients.length > 0
        ? clients.filter((client) => selectedClients.includes(client._id))
        : clients;

    dataToExport.forEach((client) => {
        worksheet.addRow({
            clientName: client.clientName,
            email: client.email,
            mobile: client.mobile,
            companyName: client.companyName,
            serviceCharge: client.serviceCharge,
            status: "Paid", // Or dynamic status
            createdAt: new Date(client.createdAt).toLocaleString(),
            dueDate: new Date(client.createdAt).toLocaleDateString(),
        });
    });

    // Write file to browser
    workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: "application/octet-stream" });
        saveAs(blob, "clients.xlsx");
    });
};
