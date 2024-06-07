<template>
  <NavHeader />
  <div class="min-h-screen">
    <main class="max-w-5xl px-5 mx-auto pt-7 lg:px-0">
      <!-- Page title -->
      <h1 class="text-2xl font-medium">Clients</h1>
      <p class="mt-2 text-sm text-gray-500">Gérer vos clients ici</p>

      <div
        class="flex flex-col items-center justify-between mt-5 space-y-3 md:space-y-0 md:flex-row"
      >
        <div class="relative w-full md:mr-10 grow">
          <span class="absolute -translate-y-1/2 top-1/2 left-3">
            <Icon name="ep:search" size="24" class="text-gray-400" />
          </span>
          <input
            placeholder="Rechercher Client"
            v-model="search"
            type="search"
            name="search"
            id="search"
            class="pl-11 input"
          />
        </div>
        <button
          @click="customerModal.openModal()"
          class="w-full py-3.5 md:py-2.5 md:w-auto btn shrink-0"
        >
          Ajouter Client
        </button>
      </div>

      <div class="relative mt-5 border border-gray-100 rounded-lg">
        <ClientOnly>
          <EasyDataTable
            :search-value="search"
            empty-message="Pas de clients disponibles"
            theme-color="#f97316"
            table-class-name="eztble"
            :headers="headers"
            :items="customerStore.customers"
          >
            <!-- Show title with custom styles -->
            <template #item-dateOfBirth="{ dateOfBirth }">
                <span>{{ dayjs(dateOfBirth).format("MMM DD, YYYY") }}</span>
              </template>
            <!-- Action items for table -->
            <template #item-actions="customer">
              <div class="flex space-x-4 text-gray-500">
                <button @click="customerModal.openModal(customer)">
                  <Icon size="18" name="fluent:pen-24-regular" />
                </button>
                <button @click="removeCustomer(customer)">
                  <Icon size="18" name="fluent:delete-24-regular" />
                </button>
              </div>
            </template>
          </EasyDataTable>
        </ClientOnly>
      </div>
    </main>
    <!-- client modal comp -->
    <CustomerModal ref="customerModal" />
  </div>
</template>

<script setup lang="ts">
  // Has to be explicitly imported as a type
  import type { Header } from "vue3-easy-data-table";
  import dayjs from "dayjs";
  import type { ICustomer } from "~/types";

  // Customer store from pinia
  const customerStore = useCustomerStore();
  // Get customers with async data
  await useAsyncData("allCustomers", () => customerStore.getAll(), {
    // Removed in Nuxt v3.11
    // initialCache: false,
  });

  // Modal refence - used to open modal
  const customerModal = ref();
  //Search for record in table
  const search = ref("");

  // headers for the table
  const headers: Header[] = [
    { text: "Prénom", value: "firstName", sortable: true, width: 200 },
    { text: "Nom", value: "lastName", width: 150 },
    { text: "Date de Naissance", value: "dateOfBirth", width: 150 },
    { text: "Email", value: "email", sortable: true },
    { text: "Téléphone", value: "phoneNumber", sortable: true },
    { text: "Adresse", value: "address", sortable: true, width: 200 },
    { text: "Actions", value: "actions", width: 100 },
  ];

  // Method used to remove a customer
  const removeCustomer = async (customer: ICustomer) => {
    await customerStore.remove(customer._id!);
  };
</script>