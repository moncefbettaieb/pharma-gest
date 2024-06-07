<template>
	<TransitionRoot :show="open">
		<!-- Dialog -->
		<Dialog as="div" class="relative z-20" @close="closeModal">
			<!-- Dialog overlay -->
			<TransitionChild
				enter="duration-200"
				leave="duration-200"
				enter-from="opacity-0"
				leave-to="opacity-0"
			>
				<div class="fixed inset-0 bg-black/30 backdrop-blur" />
			</TransitionChild>

			<!-- Full-screen scrollable container -->
			<div class="fixed inset-0 overflow-y-auto">
				<!-- Container to center the panel -->
				<div class="flex items-center justify-center min-h-full p-4">
					<!-- The actual dialog panel -->
					<TransitionChild
						enter="duration-300 ease-out"
						enter-from="opacity-0 scale-95"
						enter-to="opacity-100 scale-100"
						leave="duration-200 ease-in"
						leave-from="opacity-100 scale-100"
						leave-to="opacity-0 scale-95"
					>
						<DialogPanel class="w-full min-w-[360px] p-5 bg-white shadow-lg rounded-2xl">
							<div class="flex items-center justify-between">
								<!-- Conditional rendering for text -->
								<DialogTitle class="text-xl font-medium text-gray-700"
									>{{ product._id ? "Update" : "Create" }} Fournisseur</DialogTitle
								>
							</div>
							<p class="mt-1 text-sm text-gray-500">
								{{ product._id ? "Modifier ce Fournisseur" : "Ajouter un nouveau Fournisseur" }}
							</p>

							<form @submit="submitProduct" class="mt-5">
								<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
									<div class="col-span-full">
										<FormInput rules="required" label="Nom" type="text" name="name" id="name" />
									</div>
									<div class="mb-4 col-span-full">
										<FormSupplierInput v-model="suppliers" />
									</div>
									<div class="col-span-1">
										<FormInput
											placeholder="Select a date"
											rules="required"
											label="Date d'ajout"
											type="date"
											name="published"
											id="pub_date"
										/>
									</div>
									<div class="col-span-1">
										<FormInput label="ISBN" type="text" name="isbn" id="isbn" />
									</div>
									<div class="col-span-1">
										<FormInput
											min="0"
											rules="required|min_value:0"
											label="Prix"
											type="number"
											name="price"
											id="price"
										/>
									</div>
									<div class="col-span-1">
										<FormInput
											min="0"
											rules="required|min_value:0"
											label="Stock"
											type="number"
											name="stock"
											id="stock"
										/>
									</div>
								</div>
								<!-- Form buttons -->
								<div class="flex items-center justify-end space-x-3 mt-7">
									<button
										@click="closeModal()"
										type="button"
										class="px-4 text-sm bg-gray-100 py-2.5 rounded-md"
									>
										Annuler
									</button>
									<button type="submit" class="btn">{{ product._id ? "Modifier" : "Ajouter" }}</button>
								</div>
							</form>
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>

<script setup>
	import {
		Dialog,
		DialogPanel,
		DialogTitle,
		TransitionRoot,
		TransitionChild,
	} from "@headlessui/vue";
	import { useForm } from "vee-validate";

	const supplierStore = useSupplierStore();
	useAsyncData(() => supplierStore.getAll(), { initialCache: false });

	// instantiate product store
	const productStore = useProductStore();
	// Initial form values
	const product = ref({});
	const suppliers = ref([]);

	// Get function used to handle form submission and set init form values
	const { handleSubmit } = useForm({
		initialValues: product,
	});

	// Function used to update or create the record
	const submitProduct = handleSubmit(async (values, ctx) => {
		if (!product.value._id) {
			// create product-
			await productStore.create({ ...values, suppliers: suppliers.value });
			closeModal();
		} else {
			// Updated product
			productStore.update(product.value._id, { ...values, suppliers: suppliers.value });
			closeModal();
		}
	});

	// Controll state of teh modal
	const open = ref(false);
	const openModal = (item) => {
		// Set init values if an object is passed
		if (item) {
			product.value = JSON.parse(
				JSON.stringify({ ...item, published: item.published.substring(0, 10) })
			);
			suppliers.value = item.suppliers.map((a) => a._id);
		}
		open.value = true;
	};
	const closeModal = () => {
		product.value = {};
		suppliers.value = [];
		open.value = false;
	};

	// Expose these methods to parent components
	defineExpose({
		openModal,
		closeModal,
	});
</script>

<style></style>