import SupplierModel from "~/server/db/models/Supplier.model";

export default defineEventHandler(async (event) => {
  return await SupplierModel.find();
});
