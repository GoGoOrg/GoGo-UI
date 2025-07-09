<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Car } from '@/types/car'
import { useRoute, useRouter } from 'vue-router';
import carServices from '@/services/car.services';

const router = useRouter();
const route = useRoute();
const id = ref(0)

const cars = ref<Partial<Car>[]>([{
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
  brandid: 0,
  brand: '',
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
}])

onMounted(async () => {
  try {
    id.value = Number(route.params.id);

  } catch (error) {
    
  }
})
</script>

<template>
</template>

<style>
</style>