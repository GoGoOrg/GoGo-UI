<script setup lang="ts">
import Swal from 'sweetalert2'
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import usersServices from '@/services/users.services'

const router = useRouter()
const route = useRoute()
const id = ref(0)

const currentUser = ref({
  id: 0,
  username: '',
  password: '',
  fullname: '',
  email: '',
  phone: '',
  birthDate: '',
  avatar: '',
  billingAddress: '',
  created_at: '',
  updated_at: '',
  role: '',
})

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

    let resp = await usersServices.updateAvatar(currentUser.value.id, {
      avatar: String(code),
    })

    window.location.reload()
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  try {
    id.value = Number(route.params.id)
    const respUser = await usersServices.getMe()
    currentUser.value = respUser.data.user
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div style="width: 100vw" class="pb-5 mt-3 pt-5 bg-light">
    <div class="container d-flex justify-content-center">
      <div class="w-100 mt-3">
        <h2>Hồ Sơ Của Tôi</h2>
        <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>

        <form class="d-flex w-100 justify-content-between mb-5">
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
                <input type="date" id="dob" class="form-control" required />
              </div>
            </div>

            <div class="mb-3">
              <label for="address" class="fw-bold form-label">Địa chỉ:</label>
              <input
                v-model="currentUser.billingAddress"
                type="text"
                id="address"
                class="form-control"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary">Lưu</button>
          </div>
          <!-- Profile Picture -->
        </form>
        <form class="">
          <div>
            <label class="fw-bold" for="oldPassword">Mật khẩu cũ: </label>
            <input type="password" id="oldPassword" class="form-control" required />
          </div>
          <div class="mt-3">
            <label class="fw-bold" for="newPassword">Mật khẩu mới: </label>
            <input type="password" id="newPassword" class="form-control" required />
          </div>
          <div class="mt-3">
            <label class="fw-bold" for="newRepeatPassword">Nhập lại mật khẩu: </label>
            <input type="password" id="newRepeatPassword" class="form-control" required />
          </div>

          <button type="submit" class="mb-3 mt-3 btn btn-primary">Đổi mật khẩu</button>
        </form>
      </div>
      <div class="mb-3 d-flex flex-column text-center mt-3 me-5">
        <div class="d-flex flex-column">
          <h4>Ảnh đại diện</h4>
          <div class="d-flex align-items-center flex-column mt-3">
            <div style="width: 150px; height: 150px; overflow: hidden; display: flex; justify-content: center;">
              <img
              v-if="currentUser.avatar != null && currentUser.avatar != ''"
              :src="currentUser.avatar"
              class="rounded-circle me-3 mb-5"
              style="height: 150px;"
              alt="Profile Image"
              />
            </div>
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
