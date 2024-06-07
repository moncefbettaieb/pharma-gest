import { defineStore } from "pinia";
import { ISupplier } from "~~/types";
import useToast from "./useToast";

export const useSupplierStore = defineStore("supplier-store", {
	state: () => ({
		suppliers: [] as ISupplier[],
	}),
	actions: {
		// Get all suppliers from DB
		async getAll() {
			try {
				let data = await $fetch<ISupplier[]>("/api/suppliers");
				this.suppliers = data;
				return data as ISupplier[];
			} catch (e) {
				useToast().error(e.message);
			}
		},
		// Create a new supplier
		async create(name: string) {
			await $fetch("/api/suppliers/create", {
				method: "POST",
				body: { name },
			})
				.catch((e) => {
					useToast().error(e.data.message);
				})
				.then(async () => {
					await this.getAll();
					useToast().success("Fournisseur Ajouté");
				});
		},
		// Update an supplier
		async update(id: string, name: string) {
			await $fetch(`/api/suppliers/${id}`, {
				method: "PUT",
				body: { name },
			})
				.catch((e) => {
					useToast().error(e.data.message);
				})
				.then(async () => {
					await this.getAll();
					useToast().success("Fournisseur modifié");
				});
		},
		// delete an supplier
		async remove(id: string) {
			await $fetch(`/api/suppliers/${id}`, {
				method: "DELETE",
			})
				.catch((e) => {
					useToast().error(e.data.message);
				})
				.then(async () => {
					await this.getAll();
					useToast().success("Fournisseur supprimé");
				});
		},
	},
});