<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

import usersServices from '@/services/users.services'

import carRequestServices from '@/services/carRequest.services'

import type { CarRequest } from '@/types/carRequest'
const router = useRouter()

// Admin user data
const currentUser = reactive({
  id: 0,
  username: '',
  password: '',
  email: '',
  name: '',
  phone: '',
  birthDate: null,
  avatar: '',
  billingAddress: '',
  created_at: null,
  updated_at: null,
  role: '',
})

const carRequests = ref<CarRequest[]>([])

onMounted(async () => {
  try {
    const respUser = await usersServices.getMe()

    Object.assign(currentUser, respUser.data.user)

    const respCarRequests = await carRequestServices.getAllByUserid(currentUser.id)
    carRequests.value = respCarRequests.data.carrequests

    console.log('Car Requests:', carRequests.value)
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div class="container mt-5 ">
    <h2 class="ms-4 pt-4 mb-3">Lịch sử các yêu cầu thuê xe</h2>

    <div class="text-center rounded ps-4 pe-4 pb-4">
      <div class="table-responsive">
        <table class="table text-start align-middle table-bordered table-hover mb-0">
          <thead>
            <tr class="text-dark">
              <th style="vertical-align: middle" class="fw-bold text-uppercase" scope="col">
                Ngày yêu cầu
              </th>
              <th style="vertical-align: middle" class="fw-bold text-uppercase" scope="col">Xe</th>
              <th style="vertical-align: middle" class="fw-bold text-uppercase" scope="col">
                Tổng tiền
              </th>
              <th style="vertical-align: middle" class="fw-bold text-uppercase" scope="col">
                Trạng thái
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="carRequest in carRequests" :key="carRequest.id">
              <td>{{ carRequest.createdat.slice(0, 10) }}</td>
              <td>
                <img class="img-thumbnail me-3" height="80" width="80" alt="" :src="carRequest.carimage" />
                <a :href="'http://localhost:5173/car/' + carRequest.carid">
                  {{ carRequest.carname }}
                </a>
              </td>
              <td>
                {{
                  carRequest.totalprice.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })
                }}
              </td>
              <td v-if="carRequest.accept == true" class="text-success">Đã duyệt</td>
              <td
                v-if="carRequest.accept == false && carRequest.deny == false"
                class="text-primary"
              >
                Đang chờ
              </td>
              <td v-if="carRequest.deny == true" class="text-danger">Đã từ chối</td>
              <!-- <td>
                      <a
                        class="btn btn-sm"
                        style="background-color: #fbbfc0; color: white"
                        href=""
                        data-bs-toggle="modal"
                        data-bs-target="#detailOrder"
                      >
                        Chi tiết
                      </a>
                    </td> -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
