<script setup lang="ts">
import { ref } from 'vue'
import type { Car } from '@/types/car'
import carRequestServices from '@/services/carRequest.services'

import Swal from 'sweetalert2'

const activeTab = ref('active')

const props = defineProps<{
  car: Partial<Car>
}>()

async function updateRequest(accept: boolean, requestId: number) {
  try {
    await carRequestServices.update(requestId, { accept, deny: !accept })

    Swal.fire({
      title: 'Thành công!',
      text: 'Cập nhật yêu cầu thành công!',
      icon: 'success',
      confirmButtonText: 'OK',
      timer: 1500,
    })

    // Update the local car requests state
    const requestIndex = props.car.carrequests?.findIndex((req) => req.id === requestId)
    if (requestIndex !== undefined && requestIndex >= 0 && props.car.carrequests) {
      // You probably need to update this with actual response data
      props.car.carrequests[requestIndex] = {
        ...props.car.carrequests[requestIndex],
        accept,
        deny: !accept,
      }
    }
  } catch (error) {
    console.error('Error updating request:', error)
  }
}
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
            :class="{ active: activeTab === 'link', disabled: !car.carrequests?.length }"
            href="#"
            @click.prevent="activeTab = 'link'"
            >Người thuê</a
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
              style="max-width: 600px; max-height: 400px"
              alt="Car Image"
            />
          </div>

          <div class="col-md-7">
            <div class="mb-3">
              <a :href="'/car/' + car.id" class="text-uppercase fw-bold h4 text-dark">
                {{ car.name }}
              </a>
            </div>

            <div class="row text-center mb-4">
              <div class="col-4">
                <i class="fa-solid fa-gears fa-2x text-success mb-1"></i>
                <div class="small">Truyền động</div>
                <div class="fw-semibold">{{ car.transmissiontype }}</div>
              </div>
              <div class="col-4">
                <i class="fa-solid fa-chair fa-2x text-success mb-1"></i>
                <div class="small">Số ghế</div>
                <div class="fw-semibold">{{ car.seats }} chỗ</div>
              </div>
              <div class="col-4">
                <i class="fa-solid fa-gas-pump fa-2x text-success mb-1"></i>
                <div class="small">Nhiên liệu</div>
                <div class="fw-semibold">{{ car.fueltype }}</div>
              </div>
            </div>

            <div class="bg-light border rounded p-3">
              <div class="d-flex align-items-end mb-3">
                <div class="display-6 fw-bold">
                  {{ car.price?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) }}
                </div>
                <div class="fw-semibold">/ngày</div>
              </div>
              <ul class="list-unstyled mb-0">
                <li><strong>Tổng lượt thuê:</strong> {{ car.carrequests?.length }}</li>
                <li><strong>Tổng lượt thích:</strong> {{ car.totalheart }}</li>
                <li><strong>Bảo hiểm:</strong> {{ car.insurance ? 'Có' : 'Không' }}</li>
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
          <!-- Left: car image -->
          <div class="col-md-5">
            <img
              :src="car.imageurl"
              class="img-fluid rounded shadow-sm w-100 h-100 object-fit-cover"
              style="max-width: 600px; max-height: 400px"
              alt="Car Image"
            />
          </div>

          <!-- Right: car info and requests -->
          <div class="col-md-7">
            <div class="mb-3">
              <a :href="'/car/' + car.id" class="text-uppercase fw-bold h4 text-dark">
                {{ car.name }}
              </a>
            </div>

            <!-- Table of requests -->
            <div class="table-responsive">
              <table class="table table-bordered align-middle text-center">
                <thead class="table-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">User ID</th>
                    <th scope="col">Bắt đầu</th>
                    <th scope="col">Kết thúc</th>
                    <th scope="col">Chấp nhận</th>
                    <th scope="col">Từ chối</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(carrequest, index) in car.carrequests" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ carrequest.userid }}</td>
                    <td>{{ carrequest.starttime.slice(0, 10) }}</td>
                    <td>{{ carrequest.endtime.slice(0, 10) }}</td>
                    <td>
                      <span v-if="carrequest.accept" class="badge bg-success">Đã chấp nhận</span>
                      <span v-else class="badge bg-secondary">Đang chờ</span>
                    </td>
                    <td>
                      <span v-if="carrequest.deny" class="badge bg-danger">Denied</span>
                      <span v-else class="badge bg-secondary">Pending</span>
                    </td>
                    <td>
                      <button
                        class="btn btn-sm btn-success"
                        @click="updateRequest(true, carrequest.id)"
                        :disabled="carrequest.accept || carrequest.deny"
                      >
                        Chấp nhận
                      </button>
                    </td>
                    <td>
                      <button
                        class="btn btn-sm btn-danger"
                        @click="updateRequest(false, carrequest.id)"
                        :disabled="carrequest.accept || carrequest.deny"
                      >
                        Từ chối
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
