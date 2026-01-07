<script setup lang="ts">
import { ref } from 'vue'

import type { Car } from '@/types/car'
import type { User } from '@/types/users'
import type { CarRequest } from '@/types/carRequest'

import carRequestServices from '@/services/carRequest.services'

import Swal from 'sweetalert2'

const activeTab = ref('active')
const APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL

const props = defineProps<{
  car: Partial<Car>
}>()

const carRequests = ref<CarRequest[]>([])

async function getAllCarRequestByUserId(userid: number) {
  const respCarRequests = await carRequestServices.getAllByUserid(userid ?? 0)
  carRequests.value = respCarRequests.data.carrequests
}

async function updateRequest(accept: boolean, requestId: number) {
  console.log('Updating request:', { accept, requestId })

  try {
    if (typeof requestId !== 'number' || typeof accept !== 'boolean') {
      Swal.fire({
        title: 'Lỗi!',
        text: 'Dữ liệu không hợp lệ. Vui lòng thử lại.',
        icon: 'error',
        confirmButtonText: 'OK',
      })
      return
    }

    // Send update to backend
    await carRequestServices.update(requestId, { accept, deny: !accept })

    const requestList = props.car.carrequests
    if (!requestList) return

    // Find the updated request
    const updatedReq = requestList.find((req) => req.id === requestId)
    if (!updatedReq) return

    // Update the current one
    updatedReq.accept = accept
    updatedReq.deny = !accept

    // If accepted, deny all overlapping requests
    if (accept) {
      const startA = new Date(updatedReq.starttime).getTime()
      const endA = new Date(updatedReq.endtime).getTime()

      for (const req of requestList) {
        if (req.id === updatedReq.id) continue
        const startB = new Date(req.starttime).getTime()
        const endB = new Date(req.endtime).getTime()

        const overlap = Math.max(startA, startB) < Math.min(endA, endB)
        if (overlap) {
          req.accept = false
          req.deny = true
        }
      }
    }

    Swal.fire({
      title: 'Thành công!',
      text: 'Cập nhật yêu cầu thành công!',
      icon: 'success',
      confirmButtonText: 'OK',
      timer: 1500,
    })
  } catch (error: any) {
    console.error('Error updating request:', error)
    Swal.fire({
      title: 'Lỗi!',
      text:
        error?.response?.data?.errorMessage || 'Không thể cập nhật yêu cầu. Vui lòng thử lại sau.',
      icon: 'error',
      confirmButtonText: 'OK',
    })
  }
}

function checkExistCarRequestsUnhandled() {
  for (const req of props.car.carrequests || []) {
    if (req.deny === false && req.accept === false) {
      return true
    }
  }
}

function checkExistCarRequestHandled() {
  for (const req of props.car.carrequests || []) {
    if (req.deny === true || req.accept === true) {
      return true
    }
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
            class="nav-link position-relative d-inline-flex align-items-center"
            :class="{ active: activeTab === 'link', disabled: !checkExistCarRequestsUnhandled() }"
            href="#"
            @click.prevent="activeTab = 'link'"
          >
            Người thuê
            <span
              v-if="checkExistCarRequestsUnhandled()"
              class="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle"
              style="font-size: 0.65rem"
            >
              {{
                car.carrequests
                  ? car.carrequests.filter((req) => req.deny === false && req.accept === false)
                      .length
                  : 0
              }}
              <span class="visually-hidden">unread messages</span>
            </span>
          </a>
        </li>

        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: activeTab === 'history', disabled: !checkExistCarRequestHandled() }"
            href="#"
            @click.prevent="activeTab = 'history'"
            >Lịch sử</a
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
                    <th scope="col">Tên người thuê</th>
                    <th scope="col">Bắt đầu</th>
                    <th scope="col">Kết thúc</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(carrequest, index) in car.carrequests" :key="carrequest.id">
                    <tr v-if="carrequest.deny === false && carrequest.accept === false">
                      <td>{{ index + 1 }}</td>
                      <td>
                        <a
                          data-bs-toggle="modal"
                          data-bs-target="#userInfoModal"
                          class="text-primary fw-bold"
                          style="cursor: pointer"
                          @click="getAllCarRequestByUserId(carrequest.userid)"
                        >
                          {{ carrequest.fullname }}
                        </a>
                      </td>

                      <!-- User Info Modal -->
                      <div
                        class="modal fade"
                        id="userInfoModal"
                        tabindex="-1"
                        aria-labelledby="userInfoModalLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog modal-xl modal-dialog-centered">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="userInfoModalLabel">
                                Thông tin người thuê
                              </h5>
                              <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div class="modal-body">
                              <div class="text-center mb-3">
                                <img
                                  :src="carrequest.avatar || 'https://placehold.co/100x100'"
                                  alt="User Avatar"
                                  class="rounded-circle shadow-sm"
                                  width="100"
                                  height="100"
                                />
                              </div>

                              <p><strong>Họ tên:</strong> {{ carrequest.fullname }}</p>
                              <p><strong>Tên đăng nhập:</strong> {{ carrequest.username }}</p>
                              <p><strong>Email:</strong> {{ carrequest.email }}</p>
                              <p><strong>Số điện thoại:</strong> {{ carrequest.phone }}</p>

                              <div
                                v-if="carRequests.length > 0"
                                class="text-center rounded ps-4 pe-4 pb-4 container mt-5"
                              >
                                <h2 class="ms-4 mb-3">Lịch sử các yêu cầu thuê xe</h2>
                                <div class="table-responsive">
                                  <table
                                    class="table text-start align-middle table-bordered table-hover mb-0"
                                  >
                                    <thead>
                                      <tr class="text-dark">
                                        <th
                                          style="vertical-align: middle"
                                          class="fw-bold text-uppercase"
                                          scope="col"
                                        >
                                          Ngày yêu cầu
                                        </th>
                                        <th
                                          style="vertical-align: middle"
                                          class="fw-bold text-uppercase"
                                          scope="col"
                                        >
                                          Xe
                                        </th>
                                        <th
                                          style="vertical-align: middle"
                                          class="fw-bold text-uppercase"
                                          scope="col"
                                        >
                                          Ngày bắt đầu
                                        </th>
                                        <th
                                          style="vertical-align: middle"
                                          class="fw-bold text-uppercase"
                                          scope="col"
                                        >
                                          Ngày kết thúc
                                        </th>
                                        <th
                                          style="vertical-align: middle"
                                          class="fw-bold text-uppercase"
                                          scope="col"
                                        >
                                          Tổng tiền
                                        </th>
                                        <th
                                          style="vertical-align: middle"
                                          class="fw-bold text-uppercase"
                                          scope="col"
                                        >
                                          Trạng thái
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr v-for="carRequest in carRequests" :key="carRequest.id">
                                        <td>{{ carRequest.createdat.slice(0, 10) }}</td>
                                        <td>
                                          <a
                                            :href="`${APP_BASE_URL}/car/${carRequest.carid}`"
                                          >
                                            {{ carRequest.carname }}
                                          </a>
                                        </td>
                                        <td>{{ carRequest.starttime.slice(0, 10) }}</td>
                                        <td>{{ carRequest.endtime.slice(0, 10) }}</td>

                                        <td>
                                          {{
                                            carRequest.totalprice.toLocaleString('it-IT', {
                                              style: 'currency',
                                              currency: 'VND',
                                            })
                                          }}
                                        </td>
                                        <td v-if="carRequest.accept == true" class="text-success">
                                          Đã duyệt
                                        </td>
                                        <td
                                          v-if="
                                            carRequest.accept == false && carRequest.deny == false
                                          "
                                          class="text-primary"
                                        >
                                          Đang chờ
                                        </td>
                                        <td v-if="carRequest.deny == true" class="text-danger">
                                          Đã từ chối
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <td>{{ carrequest.starttime.slice(0, 10) }}</td>
                      <td>{{ carrequest.endtime.slice(0, 10) }}</td>
                      <td>
                        <button
                          class="btn btn-sm btn-success"
                          @click="updateRequest(true, carrequest.id)"
                        >
                          Chấp nhận
                        </button>
                      </td>
                      <td>
                        <button
                          class="btn btn-sm btn-danger"
                          @click="updateRequest(false, carrequest.id)"
                        >
                          Từ chối
                        </button>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </template>

      <template v-else-if="activeTab === 'history'">
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
                    <th scope="col">Tên người thuê</th>
                    <th scope="col">Bắt đầu</th>
                    <th scope="col">Kết thúc</th>
                    <th scope="col">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(carrequest, index) in car.carrequests" :key="carrequest.id">
                    <tr v-if="carrequest.deny === true || carrequest.accept === true">
                      <td>{{ index + 1 }}</td>
                      <td>
                        <a
                          data-bs-toggle="modal"
                          data-bs-target="#userInfoModal"
                          class="text-primary fw-bold"
                          style="cursor: pointer"
                        >
                          {{ carrequest.fullname }}
                        </a>
                      </td>

                      <!-- User Info Modal -->
                      <div
                        class="modal fade"
                        id="userInfoModal"
                        tabindex="-1"
                        aria-labelledby="userInfoModalLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog modal-dialog-centered">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="userInfoModalLabel">
                                Thông tin người thuê
                              </h5>
                              <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div class="modal-body">
                              <div class="text-center mb-3">
                                <img
                                  :src="carrequest.avatar || 'https://placehold.co/100x100'"
                                  alt="User Avatar"
                                  class="rounded-circle shadow-sm"
                                  width="100"
                                  height="100"
                                />
                              </div>

                              <p><strong>Họ tên:</strong> {{ carrequest.fullname }}</p>
                              <p><strong>Tên đăng nhập:</strong> {{ carrequest.username }}</p>
                              <p><strong>Email:</strong> {{ carrequest.email }}</p>
                              <p><strong>Số điện thoại:</strong> {{ carrequest.phone }}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <td>{{ carrequest.starttime.slice(0, 10) }}</td>
                      <td>{{ carrequest.endtime.slice(0, 10) }}</td>
                      <td>
                        <span v-if="carrequest.accept === true" class="badge bg-success"
                          >Đã chấp nhận</span
                        >
                        <span v-if="carrequest.deny === true" class="badge bg-danger"
                          >Đã từ chối</span
                        >
                      </td>
                    </tr>
                  </template>
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
