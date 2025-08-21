<script setup lang="ts">
import { ref } from 'vue'

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
    createdat: string
    updatedat: string
    deletedat: string | null
    imageurl: string
  }
}>()
</script>

<template>
  <div class="card shadow-sm mb-5">
    <div class="card-header bg-white border-bottom-0">
      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: activeTab === 'active' }"
            href="#"
            @click.prevent="activeTab = 'active'"
            >Thông tin xe</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: activeTab === 'link' }"
            href="#"
            @click.prevent="activeTab = 'link'"
            >Người thuê</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: activeTab === 'calendar' }"
            href="#"
            @click.prevent="activeTab = 'calendar'"
            >Lịch</a
          >
        </li>
      </ul>
    </div>

    <div class="card-body">
      <!-- Tab: Thông tin xe -->
      <template v-if="activeTab === 'active'">
        <div class="row g-4">
          <div class="col-md-5">
            <img
              :src="car.imageurl"
              class="img-fluid rounded shadow-sm w-100 h-100 object-fit-cover"
              style="max-width: 600px; max-height: 400px;"
              alt="Car Image"
            />
          </div>

          <div class="col-md-7">
            <div class="mb-3">
              <a
                :href="'/car/' + car.id"
                class="text-uppercase fw-bold h4 text-dark"
              >
                {{ car.name }}
              </a>
            </div>

            <div class="row text-center mb-4">
              <div class="col-4">
                <i class="fa-solid fa-gears fa-2x text-success mb-1"></i>
                <div class="small text-muted">Truyền động</div>
                <div class="fw-semibold">{{ car.transmissiontypeid }}</div>
              </div>
              <div class="col-4">
                <i class="fa-solid fa-chair fa-2x text-success mb-1"></i>
                <div class="small text-muted">Số ghế</div>
                <div class="fw-semibold">{{ car.seats }} chỗ</div>
              </div>
              <div class="col-4">
                <i class="fa-solid fa-gas-pump fa-2x text-success mb-1"></i>
                <div class="small text-muted">Nhiên liệu</div>
                <div class="fw-semibold">{{ car.fueltypeid }}</div>
              </div>
            </div>

            <div class="bg-light border rounded p-3">
              <div class="d-flex align-items-center mb-3">
                <div class="display-6 text-primary me-2">{{ car.price }}</div>
                <div class="text-muted fw-semibold">/ngày</div>
              </div>
              <ul class="list-unstyled mb-0">
                <li><strong>Tổng lượt thuê:</strong> {{ car.totalride }}</li>
                <li><strong>Tổng lượt thích:</strong> {{ car.totalheart }}</li>
                <li><strong>Bảo hiểm:</strong> {{ car.insurance ? 'Có' : 'Không' }}</li>
                <li><strong>Số sao:</strong> {{ car.starnumber }}</li>
                <li><strong>Điểm trung bình:</strong> {{ car.avgrating }}</li>
                <li><strong>Số lượt đánh giá:</strong> {{ car.reviewcount }}</li>
              </ul>
            </div>
          </div>
        </div>
      </template>

      <!-- Tab: Người thuê -->
      <template v-else-if="activeTab === 'link'">
         <div class="row g-4">
          <div class="col-md-5">
            <img
              :src="car.imageurl"
              class="img-fluid rounded shadow-sm w-100 h-100 object-fit-cover"
              style="max-width: 600px; max-height: 400px;"
              alt="Car Image"
            />
          </div>

          <div class="col-md-7">
            <div class="mb-3">
              <a
                :href="'/car/' + car.id"
                class="text-uppercase fw-bold h4 text-dark"
              >
                {{ car.name }}
              </a>
            </div>

            <div class="row text-center mb-4">
            </div>
          </div>
        </div>
        
      </template>

      <!-- Tab: Lịch -->
      <template v-else-if="activeTab === 'calendar'">
         <div class="row g-4">
          <div class="col-md-5">
            <img
              :src="car.imageurl"
              class="img-fluid rounded shadow-sm w-100 h-100 object-fit-cover"
              style="max-width: 600px; max-height: 400px;"
              alt="Car Image"
            />
          </div>

          <div class="col-md-7">
            
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.object-fit-cover {
  object-fit: cover;
}
</style>
