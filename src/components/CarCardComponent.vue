<script setup lang="ts">
import { ref } from 'vue'

import type { Car } from '@/types/car'

const activeTab = ref('active')

defineProps<{
  car: Partial<Car>
}>()
</script>

<template>
  <div class="card shadow-sm rounded-4 m-3" style="width: 20rem; font-size: 14px">
    <div class="position-relative">
      <img
        v-if="car.imageurl"
        :src="car.imageurl"
        style="max-height: 300px"
        class="card-img-top rounded-top-4"
        alt="BMW"
      />
      <img v-else src="https://placehold.co/200x200" alt="" />
      <span class="badge bg-warning text-dark position-absolute top-0 start-0 m-2 rounded-pill">
        <i class="fas fa-bolt"></i>
      </span>

      <span
        class="badge text-bg-success text-white position-absolute bottom-0 end-0 m-2 rounded-pill p-2"
      >
        Giảm 6%
      </span>
    </div>
    <div class="card-body text-center">
      <span class="badge text-bg-secondary mb-2 fs-6">
        <!-- <i class="fas fa-map-marker-alt me-1"></i>  -->
        Giao xe tận nơi
      </span>

      <RouterLink class="text-decoration-none text-black" :to="'/car/' + car.id">
        <h6 class="card-title car-name fw-bold text-uppercase">{{ car.name }}</h6>
      </RouterLink>
      
      <RouterLink class="text-decoration-none" :to="'/brand/' + car.brandid">
        <div class="text-muted car-name mb-2">{{ car.brand }}</div>
      </RouterLink>

      <div class="d-flex flex-wrap text-muted mb-2">
        <div class="me-3"><i class="fas fa-cogs me-1"></i> {{ car.transmissiontype }}</div>
        <div class="me-3"><i class="fas fa-user-friends me-1"></i> {{ car.seats }} chỗ</div>
        <div><i class="fas fa-gas-pump me-1"></i> {{ car.fueltype }}</div>
      </div>

      <div class="mb-2 text-muted"><i class="fas fa-map-pin me-1"></i> {{ car.city }}</div>

      <hr />
      <div class="d-flex justify-content-between align-items-center">
        <span class="text-muted">Chưa có chuyến</span>
        <div class="text-end">
          <div>
            <!-- <del class="text-muted">2.296K</del> -->
            <span class="fw-bold text-success ms-1">{{
              car.price?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
            }}</span
            >/ngày
          </div>
          <div class="text-primary small">
            <i class="fas fa-clock me-1"></i>
            {{ car.price ? (car.price/6).toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) : 0 }} gói 4 giờ
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.car-name:hover {
  text-decoration: underline;
}
</style>
