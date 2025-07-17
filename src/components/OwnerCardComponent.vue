<script setup lang="ts">
import { ref } from 'vue'

import type { Car } from '@/types/car'

const activeTab = ref('active')

defineProps<{
  car: {
    id: number
    name: string
    licenseplate: string
    description: string
    regulation: string
    color: string
    seats: number
    price: number
    ownerid: number
    brandid: number
    cityid: number
    transmissiontypeid: number
    fueltypeid: number
    totalride: number
    totalheart: number
    mortage: number
    insurance: number
    starnumber: number
    avgrating: number
    reviewcount: number
    priceperday: number
    discountvalue: number
    discounttype: string
    createdat: string // or Date
    updatedat: string // or Date
    deletedat: string | null // nullable
    imageurl: string
  }
}>()
</script>
<template>
  <div class="card mb-5">
    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item">
          <a
            class="nav-link text-black"
            :class="{ active: activeTab === 'active' }"
            href="#"
            @click.prevent="activeTab = 'active'"
          >
            Thông tin xe
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link text-black"
            :class="{ active: activeTab === 'link' }"
            href="#"
            @click.prevent="activeTab = 'link'"
          >
            Người thuê
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link text-black"
            href="#"
            :class="{ active: activeTab === 'calendar' }"
            @click.prevent="activeTab = 'calendar'"
          >
            Lịch
          </a>
        </li>
      </ul>
    </div>

    <div class="card-body">
      <template v-if="activeTab === 'active'">
        <div class="card ">
          <div class="row g-0">
            <div class="col-md-4">
              <img
                :src="car.imageurl"
                class="img-fluid rounded-start h-100 w-100"
                alt="..."
                style="max-width: 500px; max-height: 500px"
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <a
                  :href="'http://localhost:5173/car/' + car.id"
                  class="card-title text-uppercase ms-2 h2 text-decoration-none"
                >
                  {{ car.name }}
                </a>
                <p class="card-text">
                  {{ car.regulation }}
                </p>
                <div class="d-flex justify-content-between p-2">
                  
                  <div class="col-6 col-md-3 text-center">
                    <i class="fa-solid fa-gears fa-2x text-success"></i>
                    <div class="text-muted small">Truyền động</div>
                    <div class="fw-semibold">{{ car.transmissiontypeid }}</div>
                  </div>

                  <!-- Seat count -->
                  <div class="col-6 col-md-3 text-center">
                    <i class="fa-solid fa-chair fa-2x text-success mb-2"></i>
                    <div class="text-muted small">Số ghế</div>
                    <div class="fw-semibold">{{ car.seats }} chỗ</div>
                  </div>

                  <!-- Fuel type -->
                  <div class="col-6 col-md-3 text-center">
                    <i class="fa-solid fa-gas-pump fa-2x text-success mb-2"></i>
                    <div class="text-muted small">Nhiên liệu</div>
                    <div class="fw-semibold">{{ car.fueltypeid }}</div>
                  </div>
                </div>

                <div class="border rounded p-4" style="background-color: #f8fbfe">
                  <div class="card-text d-flex align-items-center">
                    <div class="fw-bold h3">
                      {{ car.price }}
                    </div>
                    <div class="fw-bold text-secondary">/ngày</div>
                  </div>
                  <p class="card-text">Tổng lượt thuê: {{ car.totalride }}</p>
                  <p class="card-text">Tổng lượt thích: {{ car.totalheart }}</p>
                  <p class="card-text">Bảo hiểm: {{ car.insurance }}</p>
                  <p class="card-text">Số sao: {{ car.starnumber }}</p>
                  <p class="card-text">Điểm trung bình{{ car.avgrating }}</p>
                  <p class="card-text">Số lượt đánh giá: {{ car.reviewcount }}</p>
                </div>
                <!-- <p class="card-text">
                  <small class="text-body-secondary">Last updated 3 mins ago</small>
                </p> -->
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-else-if="activeTab === 'link'">
        <h5 class="card-title">Link Tab</h5>
        <p class="card-text">
          This is the content of the Link tab. Feel free to update or replace it with dynamic
          content.
        </p>
        <a href="#" class="btn btn-success">Go to another place</a>
      </template>

      <template v-else-if="activeTab === 'calendar'">
        <h5 class="card-title">Link Tab</h5>
        <p class="card-text">
          This is the content of the Link tab. Feel free to update or replace it with dynamic
          content.
        </p>
        <a href="#" class="btn btn-success">Go to another place</a>
      </template>
    </div>
  </div>
</template>

<style scoped>
pre {
  font-family: Arial, Helvetica, sans-serif;
  white-space: pre-wrap; /* Since CSS 2.1 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
}
</style>
