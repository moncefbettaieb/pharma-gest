import mongoose from "mongoose";

const schema: mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    published: { type: Date, required: false },
    isbn: String,
    suppliers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Supplier" }],
},
{timestamps: true});

export default mongoose.model("Product", schema);

