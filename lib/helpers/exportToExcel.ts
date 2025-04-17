import { saveAs } from "file-saver";
import ExcelJS from "exceljs";


// Define the Client type based on the data structure
interface Client {
    _id: string;
    clientName: string;
    email: string;
    mobile: string;
    companyName: string;
    serviceCharge: number;
    status: string; // Or use an enum if the status is fixed
    createdAt: string | Date;
    dueDate: string | Date;
}

export const exportToExcel = (clients: Client[], selectedClients: string[]) => {
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

    // Filter clients based on selected IDs or all clients if no selection
    const dataToExport = selectedClients.length > 0
        ? clients.filter((client) => selectedClients.includes(client._id))
        : clients;

    // Add rows for each client
    dataToExport.forEach((client) => {
        worksheet.addRow({
            clientName: client.clientName,
            email: client.email,
            mobile: client.mobile,
            companyName: client.companyName,
            serviceCharge: client.serviceCharge,
            status: client.status, // Dynamic status (e.g., 'Paid', 'Pending', etc.)
            createdAt: new Date(client.createdAt).toLocaleString(),
            dueDate: new Date(client.dueDate).toLocaleDateString(),
        });
    });

    // Write file to browser
    workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: "application/octet-stream" });
        saveAs(blob, "clients.xlsx");
    });
};
