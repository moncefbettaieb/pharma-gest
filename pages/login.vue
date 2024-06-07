<script lang="ts" setup>
definePageMeta({
  middleware: "guest",
});

const form = ref({
  username: "",
  password: "",
});

const { signIn } = useAuth();

async function handleLogin() {
  try {
    await signIn("credentials", form.value);
    useRouter().push({
      name: "index",
    });
  } catch (e) {}
}

async function handleSingUp() {
  try {
    useRouter().push({
      name: "register",
    });
  } catch (e) {}
}
</script>
<template>
  <div class="min-h-screen">
    <main class="max-w-5xl px-5 mx-auto pt-7 lg:px-0">
    <h1 class="mb-4 text-xl font-bold">Se Connecter</h1>
    <form @submit.prevent="handleLogin">
      <input
        v-model="form.username"
        class="w-auto border p-2 rounded-lg mb-4"
        type="text"
        placeholder="Utilisateur"
      />
      <span class="block text-sm truncate ui-active:text-primary">
          </span>
      <input
        v-model="form.password"
        class="w-auto border p-2 rounded-lg mb-4"
        type="password"
        placeholder="Mot de passe"
      />
      <span class="block text-sm truncate ui-active:text-primary">
						
          </span>
      <button
        type="submit"
        class="btn"
      >
        Se Connecter
      </button>
    </form>
    <form @submit.prevent="handleSingUp">
    <button
        type="submit"
        class="btn"
      >
        S'entregistrer
      </button>
    </form>
  </main>
  </div>
</template>

<style></style>