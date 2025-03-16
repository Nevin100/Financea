import mongoose from "mongoose";

const InvoiceContractSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    generationDate: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    nextRenewal: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Paid", "Due", "Pending"],
      default: "active",
    },
    currency: {
      type: String,
      enum: ["Dollars", "Rupees"],
    },
    // isModified
  },
  { timestamps: true }
);

const invoiceContract = mongoose.model(
  "InvoiceContract",
  InvoiceContractSchema
);

export default invoiceContract;

//Description :
//Terms and Conditions
