<template>
	<Combobox v-slot="{ open }" multiple>
		<div class="relative">
			<ComboboxLabel class="label">Fournisseurs</ComboboxLabel>
			<div class="relative">
				<ComboboxInput
					placeholder="Rechercher ici..."
					class="input"
					@change="query = $event.target.value"
					:displayValue="getDisplay"
				/>
				<span class="absolute top-2 right-2">
					<ComboboxButton>
						<Icon
							class="transition-all duration-300"
							:class="[open ? 'rotate-180' : '']"
							name="fluent:chevron-down-24-regular"
							size="20"
						/> </ComboboxButton
				></span>
			</div>
			<ComboboxOptions class="absolute w-full bg-white border border-gray-100 rounded-md shadow-lg">
				<div
					v-if="filteredSuppliers.length === 0 && query !== ''"
					class="relative px-2 py-4 text-center text-gray-500 cursor-default select-none"
				>
					Pas de Fournisseurs trouvés
				</div>
				<!-- filtereed suppliers -->
				<ComboboxOption
					as="template"
					v-for="supllier in filteredSuppliers"
					:key="supplier._id"
					:value="supplier._id"
				>
					<li
						class="px-3 py-2.5 cursor-pointer ui-active:bg-primary-50 ui-selected:bg-primary ui-selected:text-white"
					>
						<span class="block text-sm truncate ui-active:text-primary">
							{{ supllier.name }}
						</span>
					</li>
				</ComboboxOption>
			</ComboboxOptions>
		</div>
	</Combobox>
</template>

<script setup>
	import {
		ComboboxLabel,
		Combobox,
		ComboboxInput,
		ComboboxOptions,
		ComboboxOption,
		ComboboxButton,
	} from "@headlessui/vue";

	// instantiate the supllier store
	const supplierStore = useSupplierStore();
	// get the suppliers
	useAsyncData(() => supplierStore.getAll(), { initialCache: false });

	// Serch value
	const query = ref("");

	// Method used to display the text inside the input
	const getDisplay = (suppliers) => {
		// If empty
		if (!suppliers.length) return;

		// get first supllier name
		let firstSupllier = supplierStore.suppliers.find((a) => a._id == suppliers[0])?.name;

		// if we have more than one selected, return the first & the extras
		if (suppliers.length > 1) {
			return `${firstSupllier} + ${suppliers.length - 1} more`;
		}

		// If only one is selcted, return that one
		return firstSupllier;
	};

	// Simple search function to find the suplliers
	const filteredSuppliers = computed(() =>
		query.value === ""
			? supplierStore.suppliers
			: supplierStore.suppliers.filter((a) => {
					return a.name.toLowerCase().includes(query.value.toLowerCase());
			  })
	);
</script>