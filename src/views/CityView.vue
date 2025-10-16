<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Car } from '@/types/car'
import { useRoute, useRouter } from 'vue-router'
import carServices from '@/services/car.services'
import CarCardComponent from '@/components/CarCardComponent.vue'
import SearchBarComponent from '@/components/SearchBarComponent.vue'
const router = useRouter()
const route = useRoute()
const cityName = ref('')

const featuredLocations = [
  {
    name: 'TP Hồ Chí Minh',
    image:
      'https://images.unsplash.com/photo-1602479185069-cf2cfc4c463f?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    vehicles: '5000+ xe',
  },
  {
    name: 'Hà Nội',
    image:
      'https://images.unsplash.com/photo-1676019266474-3538f3f19e6b?q=80&w=2446&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    vehicles: '2500+ xe',
  },
  {
    name: 'Đà Nẵng',
    image:
      'https://images.unsplash.com/photo-1716903197952-440ea3233ba3?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    vehicles: '500+ xe',
  },
  {
    name: 'Cần thơ',
    image:
      'https://plus.unsplash.com/premium_photo-1693237310410-75528c5d5826?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    vehicles: '500+ xe',
  },
]

const cars = ref<Partial<Car>[]>([
  {
    id: 0,
    name: '',
    licenseplate: '',
    description: '',
    regulation: '',
    color: '',
    seats: 0,
    price: 0,
    ownerid: 0,
    ownername: '',
    cityid: 0,
    city: '',
    transmissiontypeid: 0,
    transmissiontype: '',
    fueltypeid: 0,
    fueltype: '',
    totalride: 0,
    totalheart: 0,
    mortage: 0,
    insurance: 0,
    starnumber: 0,
    avgrating: 0,
    reviewcount: 0,
    priceperday: 0,
    discountvalue: 0,
    discounttype: '',
    imageurl: '',
    createdat: '',
    updatedat: '',
    deletedat: null,
  },
])

async function onSearching(event: Event) {
  event.preventDefault()
  const inputElement = document.getElementByid('search-input-main') as HTMLInputElement
  const query = inputElement.value.trim()
  if (query) {
    router.push({ name: 'search view', params: { name: query } })
  }
}

onMounted(async () => {
  try {
    cityName.value = route.params.name as string

    let respCars = await carServices.searchByCityName(cityName.value)
    cars.value = respCars.data.cars

    console.log(respCars)
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div class="search-container-main w-50 mt-5">
    <SearchBarComponent></SearchBarComponent>
  </div>

  <div class="container mb-5 mt-5 w-100">
    <h1 class="mb-5">
      <span v-if="cars.length"> Các xe ở {{ cityName }}</span>
      <span v-else> Không có xe nào ở {{ cityName }} </span>
      <span style="color: brown" class="fw-bold text-uppercase"> </span>
    </h1>

    <div class="w-100 d-flex justify-content-end mb-3">
      <select class="form-select w-25" aria-label="Default select example">
        <option value="1">Giá tăng dần</option>
        <option value="2">Giá giảm dần</option>
        <option value="3">A -> Z</option>
        <option value="4">Z -> A</option>
      </select>
    </div>

    <div class="d-flex flex-wrap justify-content-center">
      <CarCardComponent v-for="car in cars" :car="car"></CarCardComponent>
    </div>
  </div>

  <div class="container py-5">
    <h2 class="text-center fw-bold mb-4">Địa Điểm Nổi Bật</h2>
    <div class="d-flex gap-3 justify-content-center">
      <a
        :href="'/city/' + location.name"
        v-for="location in featuredLocations"
        :key="location.name"
        class="card-city card position-relative text-white flex-shrink-0"
        style="min-width: 250px; border-radius: 20px; overflow: hidden"
      >
        <img
          :src="location.image"
          class="card-img"
          alt="..."
          style="height: 300px; object-fit: cover"
        />
        <div class="card-img-overlay d-flex flex-column justify-content-end">
          <h5 class="card-title card-title-city">{{ location.name }}</h5>
          <p class="card-text cart-text-city small">{{ location.vehicles }}</p>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.card-title-city {
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
}
.card-text-city {
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
}
.card-city {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.card-city:hover {
  transform: scale(1.1);
}
</style>
