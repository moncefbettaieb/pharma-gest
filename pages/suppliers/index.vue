<template>
  <NavHeader />
    <div class="min-h-screen">
      <main class="max-w-5xl px-5 mx-auto pt-7 lg:px-0">
        <!-- Page title -->
        <h1 class="text-2xl font-medium">Fournisseurs</h1>
        <p class="mt-2 text-sm text-gray-500">Gérer vos fournisseurs ici</p>
  
        <div
          class="flex flex-col items-center justify-between mt-5 space-y-3 md:space-y-0 md:flex-row"
        >
          <div class="relative w-full md:mr-10 grow">
            <span class="absolute -translate-y-1/2 top-1/2 left-3">
              <Icon name="ep:search" size="24" class="text-gray-400" />
            </span>
            <input
              placeholder="Rechercher Fournisseur..."
              v-model="search"
              type="search"
              name="search"
              id="search"
              class="pl-11 input"
            />
          </div>
          <button
            @click="supplierModal.openModal()"
            class="w-full py-3.5 md:py-2.5 md:w-auto btn shrink-0"
          >
            Ajouter Fournisseur
          </button>
        </div>
  
        <div class="relative mt-5 border border-gray-100 rounded-lg">
          <ClientOnly>
            <EasyDataTable
              empty-message="Pas de fournisseurs trouvé"
              :search-value="search"
              theme-color="#f97316"
              table-class-name="eztble"
              :headers="headers"
              :items="supplierStore.suppliers"
            >
              <!-- Show Suppliers  -->
              <template #item-name="{ name }">
                <span class="font-semibold">{{ name }}</span>
              </template>
              <!-- Action items for table -->
              <template #item-actions="supplier">
                <div class="flex space-x-4 text-gray-500">
                  <button @click="supplierModal.openModal(supplier)">
                    <Icon size="18" name="fluent:pen-24-regular" />
                  </button>
                  <button @click="removeSupplier(supplier)">
                    <Icon size="18" name="fluent:delete-24-regular" />
                  </button>
                </div>
              </template>
            </EasyDataTable>
          </ClientOnly>
        </div>
      </main>
      <!-- Supplier modal comp -->
      <SupplierModal ref="supplierModal" />
    </div>
  </template>
  
  <script setup lang="ts">
    import type { Header } from "vue3-easy-data-table";
    import type { ISupplier } from "~/types";
  
    // Supplier store
    const supplierStore = useSupplierStore();
  
    // get data on page load
    useAsyncData(async () => await supplierStore.getAll(), {
      // Remove in newer version of nuxt
      // initialCache: false,
    });
  
    // Modal ref
    const supplierModal = ref();
    //Search for supplier in table
    const search = ref("");
  
    // Method used to remove an supplier
    const removeSupplier = async (supplier: ISupplier) => {
      await supplierStore.remove(supplier._id!);
    };
  
    // Table headers
    const headers: Header[] = [
      { text: "Nom du Fornisseur", value: "name", sortable: true },
      { text: "Actions", value: "actions", width: 100 },
    ];
  </script>