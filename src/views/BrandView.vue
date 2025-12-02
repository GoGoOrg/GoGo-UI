<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import type { Car } from '@/types/car'
import { useRoute } from 'vue-router'
import carServices from '@/services/car.services'
import type { Brand } from '@/types/brand'
import brandServices from '@/services/brand.services'
import CarCardComponent from '@/components/CarCardComponent.vue'
import SearchBarComponent from '@/components/SearchBarComponent.vue'
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

const sortOption = ref<string>('0')

const sortedCars = computed(() => {
  const list = [...cars.value]

  switch (sortOption.value) {
    case '1':
      // Price ascending
      return list.sort((a, b) => (a.price ?? 0) - (b.price ?? 0))

    case '2':
      // Price descending
      return list.sort((a, b) => (b.price ?? 0) - (a.price ?? 0))

    default:
      // Default (original order — unsorted)
      return list
  }
})


onMounted(async () => {
  try {
    id.value = Number(route.params.id)

    let respBrand = await brandServices.getOne(id.value)
    brand.value = respBrand.data.brand[0]

    let respCar = await carServices.getAllByBrandid(id.value)
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

    <div class="text-end mb-2 d-flex justify-content-end">
      <div class="me-3">Sắp xếp theo:</div>

      <select v-model="sortOption" class="form-select form-select-sm w-25" aria-label="Sort cars">
        <option value="0">Mặc định</option>
        <option value="1">Giá tăng dần</option>
        <option value="2">Giá giảm dần</option>
      </select>
    </div>

    <div class="d-flex flex-wrap justify-content-center">
      <CarCardComponent v-for="car in sortedCars" :car="car"></CarCardComponent>
    </div>
  </div>
</template>

<style scoped></style>
