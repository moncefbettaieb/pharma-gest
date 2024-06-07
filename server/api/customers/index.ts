import CustomerModel from "~/server/db/models/Customer.model";

export default defineEventHandler(async (event) => {
  return await CustomerModel.find();
});
