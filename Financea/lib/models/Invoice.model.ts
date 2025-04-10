// models/invoiceModel.ts
import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true
  },
  invoiceNumber: {
    type: String,
    required: true
  },
  issueDate: {
    type: Date,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  items: [
    {
      name: String,
      qty: Number,
      rate: Number,
      total: Number,
    },
  ],
  discount: {
    type: Number,
    required:true
  },
  tax: {
    type: Number,
    required: true
  },
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurringPeriod: {
    type: String,
    enum: ["Monthly", "Yearly"],
    default: "Monthly"
  },
}, {
  timestamps: true
});

const Invoice = mongoose.models.Invoice || mongoose.model("Invoice", invoiceSchema);

export default Invoice;
