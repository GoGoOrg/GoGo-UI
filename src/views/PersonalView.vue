<script setup lang="ts">
import Swal from 'sweetalert2'
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import usersServices from '@/services/users.services'

import type { CarRequest } from '@/types/carRequest'
import type { User } from '@/types/users'
import carRequestServices from '@/services/carRequest.services'

const router = useRouter()
const route = useRoute()
const id = ref(0)

const APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL

const currentUser = ref(<Partial<User>>{})

const toBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

async function uploadAvatar(event: any) {
  try {
    let code = await toBase64(event.target.files[0])

    let resp = await usersServices.updateAvatar(currentUser.value.id ?? 0, {
      avatar: String(code),
    })

    window.location.reload()
  } catch (err) {
    console.log(err)
  }
}

const oldPassword = ref('')
const newPassword = ref('')
const newRepeatPassword = ref('')
var changePassword = async (e: any) => {
  e.preventDefault()
  try {
    if (newPassword.value != newRepeatPassword.value) {
      Swal.fire({
        title: 'Thất bại!',
        text: 'Mật khẩu mới không trùng khớp',
        icon: 'error',
        confirmButtonText: 'OK',
        timer: 1500,
      })
      return
    }
    await usersServices.updatePassword({
      username: currentUser.value.username,
      accountId: currentUser.value.id,
      newPassword: newPassword.value,
      password: oldPassword.value,
    })

    Swal.fire({
      title: 'Thành công!',
      text: 'Cập nhật mật khẩu tài khoản thành công!',
      icon: 'success',
      confirmButtonText: 'OK',
      timer: 1500,
    })
  } catch (err) {
    Swal.fire({
      title: 'Thất bại!',
      text: 'Cập nhật mật khẩu tài khoản thất bại! Error: ' + err,
      icon: 'error',
      confirmButtonText: 'OK',
      timer: 1500,
    })
  }
}

var updateUser = async (e: any) => {
  e.preventDefault()
  try {
    if (currentUser.value.birthday == undefined || currentUser.value.birthday == '') {
      currentUser.value.birthday = '2002-10-10'
    }
    await usersServices.update(currentUser.value.id ?? 0, {
      fullname: currentUser.value.fullname,
      email: currentUser.value.email,
      phone: currentUser.value.phone,
      birthday: currentUser.value.birthday.slice(0, 10),
    })

    Swal.fire({
      title: 'Thành công!',
      text: 'Cập nhật tài khoản thành công!',
      icon: 'success',
      confirmButtonText: 'OK',
      timer: 1500,
    })
  } catch (err) {
    Swal.fire({
      title: 'Thất bại!',
      text: 'Cập nhật tài khoản thất bại! Error: ' + err,
      icon: 'error',
      confirmButtonText: 'OK',
      timer: 1500,
    })
  }
}
const carRequests = ref<CarRequest[]>([])

onMounted(async () => {
  try {
    const respUser = await usersServices.getMe()
    currentUser.value = respUser.data.user

    const respCarRequests = await carRequestServices.getAllByUserid(currentUser.value.id ?? 0)
    carRequests.value = respCarRequests.data.carrequests

    console.log(currentUser.value.id)
  } catch (err) {
    console.log(err)
  }
})
</script>

<template>
  <div style="width: 100vw" class="pb-5 mt-3 pt-5">
    <div class="container d-flex justify-content-center">
      <div class="w-100 mt-3">
        <h2>Hồ Sơ Của Tôi</h2>
        <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>

        <form @submit="updateUser" class="d-flex w-100 justify-content-between mb-5">
          <div class="w-50">
            <!-- Username -->
            <div class="mb-3">
              <label for="username" class="form-label"
                >Tên đăng nhập: {{ currentUser.username }}</label
              >
            </div>

            <!-- Name -->
            <div class="mb-3">
              <label for="name" class="fw-bold form-label">Tên:</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="currentUser.fullname"
                required
              />
            </div>

            <!-- Email -->
            <div class="mb-3">
              <label for="email" class="fw-bold form-label">Email:</label>
              <div class="d-flex align-items-center">
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="currentUser.email"
                  required
                />
              </div>
            </div>

            <!-- Phone -->

            <!-- Gender -->
            <!-- <div class="mb-3">
                                    <label class="form-label">Giới tính</label>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault"
                                            id="flexRadioDefault1">
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            Nam
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault"
                                            id="flexRadioDefault2" checked>
                                        <label class="form-check-label" for="flexRadioDefault2">
                                            Nữ
                                        </label>
                                    </div>
                                </div> -->
            <div class="d-flex">
              <div class="mb-3 w-75">
                <label for="phone" class="fw-bold form-label">Số điện thoại:</label>
                <div class="d-flex align-items-center">
                  <input
                    type="tel"
                    class="form-control"
                    id="phone"
                    v-model="currentUser.phone"
                    required
                  />
                </div>
              </div>

              <!-- Date of Birth -->
              <div class="mb-3 w-25">
                <label for="dob" class="fw-bold form-label">Ngày sinh:</label>
                <input
                  type="date"
                  id="dob"
                  class="form-control"
                  v-model="currentUser.birthday"
                  required
                />
              </div>
            </div>

            <!-- <div class="mb-3">
              <label for="address" class="fw-bold form-label">Địa chỉ:</label>
              <input
                v-model="currentUser.address"
                type="text"
                id="address"
                class="form-control"
                required
              />
            </div> -->
            <button type="submit" class="btn btn-outline-success">Lưu</button>
          </div>
          <!-- Profile Picture -->
        </form>
        <form @submit="changePassword" class="">
          <div>
            <label class="fw-bold" for="oldPassword">Mật khẩu cũ: </label>
            <input
              v-model="oldPassword"
              type="password"
              id="oldPassword"
              class="form-control"
              required
            />
          </div>
          <div class="mt-3">
            <label class="fw-bold" for="newPassword">Mật khẩu mới: </label>
            <input
              v-model="newPassword"
              type="password"
              id="newPassword"
              class="form-control"
              required
            />
          </div>
          <div class="mt-3">
            <label class="fw-bold" for="newRepeatPassword">Nhập lại mật khẩu: </label>
            <input
              v-model="newRepeatPassword"
              type="password"
              id="newRepeatPassword"
              class="form-control"
              required
            />
          </div>

          <button type="submit" class="mb-3 mt-3 btn btn-outline-success">Đổi mật khẩu</button>
        </form>
      </div>
      <div class="mb-3 d-flex flex-column text-center mt-3 me-5">
        <div class="d-flex flex-column">
          <h4>Ảnh đại diện</h4>
          <div class="d-flex align-items-center flex-column mt-3">
            <img
              v-if="currentUser.avatar != null && currentUser.avatar != ''"
              :src="currentUser.avatar"
              class="rounded-circle me-3 mb-5"
              style="height: 150px; width: 150px; border-radius: 50%; object-fit: cover"
              alt="Profile Image"
            />
            <input
              type="file"
              @change="uploadAvatar($event)"
              class="form-control"
              id="profileImage"
            />
          </div>
        </div>
        <small class="form-text text-muted">
          Dung lượng file tối đa 1 MB, Định dạng: JPEG, PNG
        </small>
      </div>
    </div>
  </div>

  <div
    v-if="currentUser.role == 'member' && carRequests.length > 0"
    class="text-center rounded ps-4 pe-4 pb-4 container"
  >
    <h2 class="ms-4 mb-3">Lịch sử các yêu cầu thuê xe</h2>
    <div class="table-responsive">
      <table class="table text-start align-middle table-bordered table-hover mb-0">
        <thead>
          <tr class="text-dark">
            <th style="vertical-align: middle" class="fw-bold text-uppercase" scope="col">
              Ngày yêu cầu
            </th>
            <th style="vertical-align: middle" class="fw-bold text-uppercase" scope="col">Xe</th>
            <th style="vertical-align: middle" class="fw-bold text-uppercase" scope="col">
              Ngày bắt đầu
            </th>
            <th style="vertical-align: middle" class="fw-bold text-uppercase" scope="col">
              Ngày kết thúc
            </th>
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
              <a :href="`${APP_BASE_URL}/car/${carRequest.carid}`">
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
            <td v-if="carRequest.accept == true" class="text-success">Đã duyệt</td>
            <td v-if="carRequest.accept == false && carRequest.deny == false" class="text-primary">
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
</template>

<style scoped>
.list-group-item.active {
  border: 0px;
  background-color: #fbbfc0;
}

.linkp {
  color: black;
  text-decoration: none;
}

.linkp:hover {
  text-decoration: underline;
}

.rating-wrapper {
  direction: rtl !important;

  .star-rating {
    color: rgba(198, 206, 237, 0.8);
    cursor: pointer;
    display: inline-flex;
    font-size: 1.5rem;
    transition: color 0.5s;
  }

  .rating-input {
    display: none;
  }

  .star-rating:hover,
  .star-rating:hover ~ .star-rating,
  .rating-input:checked ~ .star-rating {
    color: #f4bb47;
  }
}

@media only screen and (max-width: 700px) {
  #whole-section {
    flex-direction: column;
  }
}
</style>
