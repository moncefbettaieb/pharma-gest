import ProductModel from "~/server/db/models/Product.model";

export default defineEventHandler(async (event) => {
  return await ProductModel.find().populate("suppliers");
});

