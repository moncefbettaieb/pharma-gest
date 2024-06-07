import ProductModel from "~/server/db/models/Product.model";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  try {
    await ProductModel.findByIdAndDelete(id);
    return { message: "Product deleted" };
  } catch (err) {
    throw createError({
      message: err.message
    });
  }
});

