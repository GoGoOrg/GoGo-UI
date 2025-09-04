<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Car } from '@/types/car'
import { useRoute, useRouter } from 'vue-router'
import carServices from '@/services/car.services'
import type { Brand } from '@/types/brand'
import brandServices from '@/services/brand.services'
import CarCardComponent from '@/components/CarCardComponent.vue'
import SearchBarComponent from '@/components/SearchBarComponent.vue'
const router = useRouter()
const route = useRoute()
const id = ref(0)

const brand = ref<Brand>({
  id: 0,
  name: '',
  description: '',
  createdat: '',
  updatedat: '',
  deletedat: '',
})

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
  const inputElement = document.getElementById('search-input-main') as HTMLInputElement
  const query = inputElement.value.trim()
  if (query) {
    router.push({ name: 'search view', params: { name: query } })
  }
}
onMounted(async () => {
  try {
    id.value = Number(route.params.id)

    let respBrand = await brandServices.getOne(id.value)
    brand.value = respBrand.data.brand[0]

    let respCar = await carServices.getAllByBrandId(id.value)
    cars.value = respCar.data.cars
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
      <span v-if="cars.length"> Các xe của nhãn hiệu {{ brand.name }}</span>
      <span v-else> Không có xe nào của nhãn hiệu </span>
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
</template>

<style scoped></style>
