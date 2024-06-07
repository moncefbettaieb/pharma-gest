import { defineStore } from "pinia";
import { ICustomer } from "~~/types";
import useToast from "./useToast";

export const useCustomerStore = defineStore("customer-store", {
	state: () => ({
		// List of all customers
		customers: [] as ICustomer[],
	}),
	actions: {
		// Get all customers from DB
		async getAll() {
			try {
				let data = await $fetch<ICustomer[]>("/api/customers");
				this.customers = data;
				return data as ICustomer[];
			} catch (e) {
				useToast().error(e.message);
			}
		},
		// Create a new customer
		async create(customer: ICustomer) {
			console.log("création");
			console.log(customer);
			(customer);
			await $fetch("/api/customers/create", {
				method: "POST",
				body: customer,
			})
				.catch((e) => {
					console.log(customer);
					console.log(e);
					console.log(e.data);
					console.log(e.data.message);
					useToast().error(e.data.message);
				})
				.then(async () => {
					await this.getAll();
					useToast().success("Client ajouté");
				});
		},
		// Update a customer
		async update(id: string, customer: ICustomer) {
            console.log(customer);
			await $fetch(`/api/customers/${id}`, {
				method: "PUT",
				body: customer,
			})
				.catch((e) => {
					useToast().error(e.data.message);
				})
				.then(async () => {
					await this.getAll();
					useToast().success("Client modifié");
				});
		},
		// delete a customer
		async remove(id: string) {
			await $fetch(`/api/customers/${id}`, {
				method: "DELETE",
			})
				.catch((e) => {
					useToast().error(e.data.message);
				})
				.then(async () => {
					await this.getAll();
					useToast().success("Client supprimé");
				});
		},
	},
});