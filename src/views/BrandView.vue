<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Car } from '@/types/car'
import { useRoute, useRouter } from 'vue-router'
import carServices from '@/services/car.services'
import type { Brand } from '@/types/brand'
import brandServices from '@/services/brand.services'
import CarCardComponent from '@/components/CarCardComponent.vue'

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

onMounted(async () => {
  try {
    id.value = Number(route.params.id)

    let respBrand = await brandServices.getOne(id.value);
    brand.value = respBrand.data.brand[0];

    let respCar = await carServices.getAllByBrandId(id.value);
    cars.value = respCar.data.cars


  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div class="search-container-main w-50 mt-5">
    <input type="text" placeholder="Tìm kiếm..." id="search-input-main" />
    <button id="search-button-main">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-search"
        viewBox="0 0 16 16"
      >
        <path
          d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85a1.007 1.007 0 0 0-.115-.098zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
        />
      </svg>
    </button>
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

<style scoped>
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
  padding: 0 10px;
}

#search-button-main svg {
  fill: #000;
}
</style>
