<template>
    <div class="min-h-screen">
      <NavHeader />
      <main class="max-w-5xl px-5 mx-auto pt-7 lg:px-0">
        <!-- Page title -->
        <h1 class="text-2xl font-medium">Produits</h1>
        <p class="mt-2 text-sm text-gray-500">Gérer vos produits ici</p>
  
        <div
          class="flex flex-col items-center justify-between mt-5 space-y-3 md:space-y-0 md:flex-row"
        >
          <div class="relative w-full md:mr-10 grow">
            <span class="absolute -translate-y-1/2 top-1/2 left-3">
              <Icon name="ep:search" size="24" class="text-gray-400" />
            </span>
            <input
              placeholder="Rechercher produits"
              v-model="search"
              type="search"
              name="search"
              id="search"
              class="pl-11 input"
            />
          </div>
          <button
            @click="productModal.openModal()"
            class="w-full py-3.5 md:py-2.5 md:w-auto btn shrink-0"
          >
            Ajouter Produit
          </button>
        </div>
  
        <div class="relative mt-5 border border-gray-100 rounded-lg">
          <ClientOnly>
            <EasyDataTable
              :search-value="search"
              empty-message="Pas de produits disponibles"
              theme-color="#f97316"
              table-class-name="eztble"
              :headers="headers"
              :items="productStore.products"
            >
              <!-- Show title with custom styles -->
              <template #item-title="{ name }">
                <span class="font-semibold">{{ name }}</span>
              </template>
              <template #item-published="{ published }">
                <span>{{ dayjs(published).format("MMM DD, YYYY") }}</span>
              </template>
              <template #item-suppliers="{ suppliers }">
                <span class="font-semibold">{{ suppliers.map(supplier => supplier.name).join(', ') }}</span>
              </template>
              <!-- Action items for table -->
              <template #item-actions="product">
                <div class="flex space-x-4 text-gray-500">
                  <button @click="productModal.openModal(product)">
                    <Icon size="18" name="fluent:pen-24-regular" />
                  </button>
                  <button @click="removeProduct(product)">
                    <Icon size="18" name="fluent:delete-24-regular" />
                  </button>
                </div>
              </template>
            </EasyDataTable>
          </ClientOnly>
        </div>
      </main>
      <!-- Product modal comp -->
      <ProductModal ref="productModal" />
    </div>
  </template>
  
  <script setup lang="ts">
    // Has to be explicitly imported as a type
    import type { Header } from "vue3-easy-data-table";
    import dayjs from "dayjs";
    import type { IProduct } from "~/types";
  
    // Product store from pinia
    const productStore = useProductStore();
    // Get products with async data
    await useAsyncData("allProducts", () => productStore.getAll(), {
      // Removed in Nuxt v3.11
      // initialCache: false,
    });
  
    // Modal refence - used to open modal
    const productModal = ref();
    //Search for record in table
    const search = ref("");
  
    // headers for the table
    const headers: Header[] = [
      { text: "Nom", value: "name", sortable: true, width: 200 },
      { text: "Published", value: "published", width: 150 },
      { text: "ISBN", value: "isbn", sortable: true },
      { text: "Fournisseur", value: "suppliers", sortable: true },
      { text: "Prix", value: "price", sortable: true, width: 200 },
      { text: "Stock", value: "stock", sortable: true, width: 200 },
      { text: "Actions", value: "actions", width: 100 },
    ];
  
    // Method used to remove a product
    const removeProduct = async (product: IProduct) => {
      await productStore.remove(product._id!);
    };
  </script>