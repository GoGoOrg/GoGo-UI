<script setup lang="ts">
import userServices from '../services/users.services'
import { checkLogin } from '../utils/utils'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useCookies } from 'vue3-cookies'
import Swal from 'sweetalert2'

const router = useRouter()

const inputFormRegister = ref({
  username: '',
  password: '',
  fullName: '',
  email: '',
  phone: '',
  role: 'owner',
})
const repeatPasswordRegister = ref('')

const showRegisterPassword = ref(false)
const showRepeatPassword = ref(false)

function toggleRegisterPassword() {
  showRegisterPassword.value = !showRegisterPassword.value
}
function toggleRepeatPassword() {
  showRepeatPassword.value = !showRepeatPassword.value
}

async function onRegister(e: any) {
  e.preventDefault()
  try {
    if (inputFormRegister.value.password !== repeatPasswordRegister.value) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi!',
        text: 'Mật khẩu nhập lại không khớp.',
      })
      return
    }

    let resp = await userServices.register(inputFormRegister.value)
    console.log(resp)

    Swal.fire({
      title: 'Success!',
      text: 'Register success.',
      icon: 'success',
      confirmButtonText: 'OK',
      timer: 1500,
    })

    setTimeout(() => {
      router.push({ name: 'login' })
    }, 1500)
  } catch (err: any) {
    Swal.fire({
      title: 'Error!',
      text: err || 'Đăng ký thất bại!',
      icon: 'error',
    })
    console.log(err)
  }
}
</script>

<template>
  <div class="container my-5">
    <div class="hero position-relative">
      <!-- Background image -->
      <div class="rounded-4" style="max-height: 600px; overflow: hidden">
        <img
          src="/images/owner-register-image.jpg"
          alt="Hero background"
          class="img-fluid w-100 rounded-4"
          style="max-width: 1800px; -webkit-transform: scaleX(-1); transform: scaleX(-1)"
        />
      </div>

      <!-- Floating content -->
      <div class="hero-content text-dark bg-white p-4 rounded-4 shadow">
        <h1 class="fw-bold mb-3">
          <span class="text-success">Cho Thuê Xe</span> Trên<br />
          Gogo Để Gia Tăng<br />
          Thu Nhập Đến <br />10tr/Tháng!
        </h1>
        <p class="mb-3">
          Gogo không thu phí khi bạn đăng xe. Bạn chỉ chia sẻ phí dịch vụ với Gogo khi có giao dịch
          cho thuê thành công.
        </p>
        <hr />
        <p class="mb-2">
          <strong>Hotline:</strong> 1900 9217 (T2-T7 9AM–9PM)<br />
          Hoặc để lại tin nhắn cho Gogo qua Fanpage
        </p>
        <button
          class="btn fw-bold btn-dark mt-2 ps-5 pe-5 pt-3 pb-3"
          data-bs-toggle="modal"
          data-bs-target="#registerOwnerModal"
        >
          Đăng ký ngay
        </button>
      </div>
    </div>

    <!-- register modal -->
    <div
      class="modal fade"
      id="registerOwnerModal"
      tabindex="-1"
      aria-labelledby="registerOwnerModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>

            <h1 class="modal-title fs-5 text-center">Đăng ký</h1>

            <form @submit="onRegister">
              <div class="mb-3">
                <label for="registerUsernameInput" class="form-label">Tài khoản</label>
                <input
                  v-model="inputFormRegister.username"
                  type="text"
                  class="form-control"
                  id="registerUsernameInput"
                  aria-describedby="username"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="registerPhoneNumberInput" class="form-label">Số điện thoại</label>
                <input
                  v-model="inputFormRegister.phone"
                  type="text"
                  class="form-control"
                  id="registerPhoneNumberInput"
                  aria-describedby="phone"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="registerNameInput" class="form-label">Họ và tên</label>
                <input
                  v-model="inputFormRegister.fullName"
                  type="text"
                  class="form-control"
                  id="registerNameInput"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="registerEmailInput" class="form-label">Email</label>
                <input
                  v-model="inputFormRegister.email"
                  type="email"
                  class="form-control"
                  id="registerEmailInput"
                  required
                />
              </div>

              <div class="mb-3 position-relative">
                <label for="registerPasswordInput" class="form-label">Mật khẩu</label>
                <input
                  v-model="inputFormRegister.password"
                  :type="showRegisterPassword ? 'text' : 'password'"
                  class="form-control"
                  id="registerPasswordInput"
                  required
                />
                <i
                  :class="['bi', showRegisterPassword ? 'bi-eye' : 'bi-eye-slash']"
                  class="position-absolute"
                  style="top: 38px; right: 15px; cursor: pointer"
                  @click="toggleRegisterPassword"
                ></i>
              </div>

              <div class="mb-3 position-relative">
                <label for="registerPasswordRepeatInput" class="form-label">Lặp lại mật khẩu</label>
                <input
                  v-model="repeatPasswordRegister"
                  :type="showRepeatPassword ? 'text' : 'password'"
                  class="form-control"
                  id="registerPasswordRepeatInput"
                  required
                />
                <i
                  :class="['bi', showRepeatPassword ? 'bi-eye' : 'bi-eye-slash']"
                  class="position-absolute"
                  style="top: 38px; right: 15px; cursor: pointer"
                  @click="toggleRepeatPassword"
                ></i>
              </div>

              <button type="submit" class="btn btn-success w-100 fw-bold p-3">Đăng ký</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  margin: auto;
}

.hero-content {
  position: absolute;
  top: 10%;
  left: 5%;
  max-width: 500px;
}

/* @media (max-width: 768px) {
  .hero-content {
    position: static;
    width: 100%;
    max-width: 100%;
    margin-top: 1rem;
  }
} */
</style>
