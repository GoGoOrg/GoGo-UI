<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

async function onSearching(event: Event) {
  event.preventDefault()
  const inputElement = document.getElementById('search-input-main') as HTMLInputElement
  const query = inputElement.value.trim()
  if (query) {
    router.push({ name: 'search view', params: { name: query } })
  }
}
</script>

<template>
  <form @submit="onSearching" class="d-flex justify-content-between w-100">
    <input type="text" placeholder="Tìm kiếm..." id="search-input-main" />
    <button id="search-button-main" class="rounded">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-search rounded"
        viewBox="0 0 16 16"
      >
        <path
          d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85a1.007 1.007 0 0 0-.115-.098zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
        />
      </svg>
    </button>
  </form>
</template>

<style>

.search-container-main {
  position: relative;
  bottom: 30px;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  padding: 10px;
  max-width: 600px;
  margin: 0 auto;
}

#search-input-main {
  border: none;
  outline: none;
  width: 100%;
  padding: 10px;
  font-size: 16px;
}

#search-button-main {
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
}
#search-button-main:hover {
  background-color: #f0f0f0;
}

</style>
