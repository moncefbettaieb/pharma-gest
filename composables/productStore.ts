import { defineStore } from "pinia";
import { IProduct } from "~~/types";
import useToast from "./useToast";

export const useProductStore = defineStore("product-store", {
	state: () => ({
		// List of all products
		products: [] as IProduct[],
	}),
	actions: {
		// Get all products from DB
		async getAll() {
			try {
				let data = await $fetch<IProduct[]>("/api/products");
				this.products = data;
				return data as IProduct[];
			} catch (e) {
				useToast().error(e.message);
			}
		},
		// Create a new product
		async create(product: IProduct) {
			(product);
			await $fetch("/api/products/create", {
				method: "POST",
				body: product,
			})
				.catch((e) => {
					useToast().error(e.data.message);
				})
				.then(async () => {
					await this.getAll();
					useToast().success("Produit ajouté");
				});
		},
		// Update a product
		async update(id: string, product: IProduct) {
			await $fetch(`/api/products/${id}`, {
				method: "PUT",
				body: product,
			})
				.catch((e) => {
					useToast().error(e.data.message);
				})
				.then(async () => {
					await this.getAll();
					useToast().success("Produit modifié");
				});
		},
		// delete a product
		async remove(id: string) {
			await $fetch(`/api/products/${id}`, {
				method: "DELETE",
			})
				.catch((e) => {
					useToast().error(e.data.message);
				})
				.then(async () => {
					await this.getAll();
					useToast().success("Produit supprimé");
				});
		},
	},
});