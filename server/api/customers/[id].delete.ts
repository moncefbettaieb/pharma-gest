import CustomerModel from "~/server/db/models/Customer.model";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  try {
    await CustomerModel.findByIdAndDelete(id);
    return { message: "Client supprimé" };
  } catch (err) {
    throw createError({
      message: err.message
    });
  }
});

