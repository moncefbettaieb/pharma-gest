import SupplierModel from "~/server/db/models/Supplier.model";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  try {
    await SupplierModel.findByIdAndDelete(id);
    return { message: "Supplier deleted" };
  } catch (err) {
    throw createError({
      message: err.message
    });
  }
});

