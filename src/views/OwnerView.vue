<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCookies } from 'vue3-cookies'
import Swal from 'sweetalert2'

import usersServices from '@/services/users.services'
import carServices from '@/services/car.services'
import { checkLogin } from '@/utilities/utilities'

import type { Car } from '@/types/car'
import type { City } from '@/types/city'
import cityServices from '@/services/city.services'
import type { Brand } from '@/types/brand'
import brandServices from '@/services/brand.services'

const router = useRouter()
const { cookies } = useCookies()
const token = cookies.get('Admin Token')

const activeTab = ref('active')

// Admin user data
const currentUser = ref({
  accountId: 0,
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

const cities = ref<City[]>([
  {
    id: 0,
    name: '',
    createdat: '',
    updatedat: '',
    deletedat: null,
  },
])

const brands = ref<Brand[]>([
  {
    id: 0,
    description: '',
    name: '',
    createdat: '',
    updatedat: '',
    deletedat: null,
  },
])

const car = ref<Car>({
  id: 0,
  name: '',
  type: '',
  licenseplate: '',
  description: '',
  regulation: '',
  color: '',
  seats: 0,
  doors: 0,
  price: 0,
  ownerid: 0,
  brandid: 0,
  cityid: 0,
  transmissiontypeid: 0,
  fueltypeid: 0,
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
  createdat: '',
  updatedat: '',
  deletedat: null,
})

const newCar = ref({
  name: '',
  type: '',
  licenseplate: '',
  description: '',
  regulation: '',
  color: '',
  seats: 0,
  doors: 0,
  price: 0,
  ownerid: 0,
  brandid: 0,
  cityid: 0,
  transmissiontypeid: 0,
  fueltypeid: 0,
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
})

onMounted(async () => {
  try {
    // Check login TODO
    // if (!checkLogin('admin')) {
    //   await Swal.fire({
    //     title: 'Chưa đăng nhập!',
    //     text: 'Vui lòng đăng nhập để xem thông tin',
    //     icon: 'error',
    //     confirmButtonText: 'OK',
    //     timer: 1500,
    //   })
    //   return router.push({ name: 'admin login' })
    // }

    // const respUser = await usersServices.getMe(token)
    // currentUser.value = respUser.data.user

    // if (currentUser.value.role !== 'admin' || currentUser.value.accountId === 0) {
    //   await Swal.fire({
    //     title: 'Không có quyền!',
    //     text: 'Vui lòng đăng nhập dưới vai trò admin để xem thông tin',
    //     icon: 'error',
    //     confirmButtonText: 'OK',
    //     timer: 1500,
    //   })
    //   return router.push({ name: 'admin login' })
    // }

    // Load car data
    const respCars = await carServices.getAllByOwnerId(1) // TODO

    const respCities = await cityServices.getAll()
    cities.value = respCities.data.citys

    const respBrands = await brandServices.getAll()
    brands.value = respBrands.data.brands
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div class="container">
    <h1 class="text-center m-3">Quản lý xe</h1>

    <div class="text-end mb-2 d-flex justify-content-end">
      <div class="me-3">Sắp xếp theo:</div>
      <select class="form-select form-select-sm w-25" aria-label=".form-select-sm example">
        <option selected>Mặc định</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>

    <div class="text-end mb-3">
      <button
        type="button"
        class="btn btn-success fw-bold"
        data-bs-toggle="modal"
        data-bs-target="#addCarModal"
      >
        + Thêm xe
      </button>
    </div>

    <div v-for="i in 3" :key="i" class="card text-center mb-5">
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
          <div class="card mb-3">
            <div class="row g-0">
              <div class="col-md-4">
                <img
                  src="https://placehold.co/500x500"
                  class="img-fluid rounded-start h-100 w-100"
                  alt="..."
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">
                    This is a wider card with supporting text below as a natural lead-in to
                    additional content. This content is a little bit longer.
                  </p>
                  <p class="card-text">
                    <small class="text-body-secondary">Last updated 3 mins ago</small>
                  </p>
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
  </div>

  <div
    class="modal fade"
    id="addCarModal"
    tabindex="-1"
    aria-labelledby="addCarModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addCarModalLabel">Thêm xe</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form class="w-100 justify-content-between p-2">
            <div class="">
              <!-- Name -->
              <div class="mb-3">
                <label for="name" class="fw-bold form-label">Tên (*):</label>
                <input type="text" class="form-control" id="name" required />
              </div>

              <div class="mb-3 mt-3">
                <label class="fw-bold" for="selectCategory">Loại xe (*)</label>
                <select
                  id="selectCategory"
                  class="form-select"
                  aria-label="Default select example"
                  required
                >
                  <option>cate.name</option>
                </select>
              </div>

              <!-- license plate -->
              <div class="mb-3">
                <label for="plate" class="fw-bold form-label">Biển số xe (*):</label>
                <input type="text" class="form-control" id="plate" required />
              </div>

              <!-- description -->
              <div class="mb-3">
                <label for="description" class="fw-bold form-label">Mô tả xe (*):</label>
                <div class="d-flex align-items-center">
                  <textarea class="form-control" id="description" required></textarea>
                </div>
              </div>

              <!-- regulation -->
              <div class="mb-3">
                <label for="regulation" class="fw-bold form-label"
                  >Luật khi dùng xe (nếu có):</label
                >
                <div class="d-flex align-items-center">
                  <textarea class="form-control" id="regulation"></textarea>
                </div>
              </div>

              <!-- color -->
              <div class="mb-3">
                <label for="color" class="fw-bold form-label">Màu xe (*):</label>
                <div class="d-flex align-items-center">
                  <input type="text" class="form-control" id="color" />
                </div>
              </div>

              <!-- seats -->
              <div class="mb-3">
                <label for="seats" class="fw-bold form-label">Số ghế xe (*):</label>
                <div class="d-flex align-items-center">
                  <input type="number" class="form-control" id="seats" />
                </div>
              </div>

              <!-- price -->
              <div class="mb-3">
                <label for="price" class="fw-bold form-label">Giá thuê (*):</label>
                <div class="d-flex align-items-center">
                  <input type="number" class="form-control" id="price" />
                </div>
              </div>

              <!-- brand -->
              <div class="mb-3">
                <label class="fw-bold" for="selectBrand">Thương hiệu (*)</label>
                <select id="selectBrand" class="form-select" aria-label="Default select example">
                  <option v-for="brand in brands">{{ brand.name }}</option>
                  <option>Khác</option>
                </select>
              </div>

              <!-- city -->
              <div class="mb-3">
                <label class="fw-bold" for="selectCity">Thành phố (*)</label>
                <select id="selectCity" class="form-select" aria-label="Default select example">
                  <option v-for="city in cities">{{ city.name }}</option>
                  <option>Khác</option>
                </select>
              </div>

              <!-- transmission type -->
              <div class="mb-3">
                <label class="fw-bold" for="selectTransmissionType">Loại số (*)</label>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="selectTransmissionType"
                    id="selectTransmissionType1"
                  />
                  <label class="form-check-label" for="selectTransmissionType1"> Số tự động </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="selectTransmissionType"
                    id="selectTransmissionType2"
                    checked
                  />
                  <label class="form-check-label" for="selectTransmissionType2"> Số sàn </label>
                </div>
              </div>

              <!-- fuel type -->
              <div class="mb-3">
                <label class="fw-bold" for="selectFuelType">Loại nhiên liệu (*)</label>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="selectFuelType"
                    id="selectFuelType1"
                  />
                  <label class="form-check-label" for="selectFuelType1"> Xe xăng </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="selectFuelType"
                    id="selectFuelType2"
                    checked
                  />
                  <label class="form-check-label" for="selectFuelType2"> Xe điện </label>
                </div>
              </div>

              <!-- insurance -->
              <div class="mb-3">
                <label class="fw-bold" for="selectInsurance">Bảo hiểm (*)</label>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="selectInsurance"
                    id="selectInsurance1"
                  />
                  <label class="form-check-label" for="selectInsurance1"> Có </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="selectInsurance"
                    id="selectInsurance2"
                    checked
                  />
                  <label class="form-check-label" for="selectInsurance2"> Không </label>
                </div>
              </div>

              <div class="d-flex">
                <div class="mb-3 w-75">
                  <label for="guide" class="fw-bold form-label"
                    >Hướng dẫn sử dụng (viết theo định dạng 1., 2., 3., ...):</label
                  >
                  <div class="d-flex align-items-center">
                    <textarea class="form-control" id="guide" required> </textarea>
                  </div>
                </div>

                <div class="mb-3 w-25">
                  <label for="unit" class="fw-bold form-label">Đơn vị bán:</label>
                  <input type="text" id="unit" class="form-control" required />
                </div>
              </div>

              <div class="mb-3">
                <label for="maintain" class="fw-bold form-label">Bảo quản: </label>
                <div class="d-flex align-items-center">
                  <textarea class="form-control" id="maintain" required> </textarea>
                </div>
              </div>

              <div class="mb-3">
                <label for="note" class="fw-bold form-label">Lưu ý khi sử dụng:</label>
                <div class="d-flex align-items-center">
                  <textarea class="form-control" id="note" required> </textarea>
                </div>
              </div>

              <div class="mb-3 d-flex">
                <div class="d-flex flex-column w-50">
                  <div class="d-flex w-100 mt-1">
                    <div class="w-50">
                      <label for="type" class="fw-bold form-label">Loại (Ví dụ 50ml, 100ml):</label>
                      <input type="text" id="type" class="form-control" required />
                    </div>

                    <div class="w-25">
                      <label for="count" class="fw-bold form-label">Số lượng:</label>
                      <input type="number" id="count" min="0" class="form-control" required />
                    </div>

                    <div class="w-25">
                      <label for="price" class="fw-bold form-label">Giá loại:</label>
                      <input type="number" id="price" min="0" class="form-control" required />
                    </div>

                    <button type="button" class="btn btn-dark" style="border-radius: 0">
                      <i class="fa-solid fa-x"></i>
                    </button>
                  </div>

                  <button
                    type="button"
                    id="addInputBtn"
                    class="w-100 btn-dark btn mt-2"
                    style="border-radius: 0px"
                  >
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </div>

                <div class="d-flex flex-column w-50 ms-3">
                  <div class="fw-bold mb-2">Chọn nhãn cho xe:</div>
                  <div class="d-flex flex-wrap" id="tag-wrap">
                    <div class="me-2 mb-2">
                      <input type="checkbox" class="btn-check" autocomplete="off" />
                      <label class="btn btn-outline-dark" style="border-radius: 0px">
                        tag.name
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="d-flex flex-column mb-3">
                <div class="fw-bold mb-2">Chọn thành phần cho xe:</div>
                <div class="d-flex flex-wrap" id="component-wrap">
                  <div class="me-2 mb-2">
                    <input type="checkbox" class="btn-check" autocomplete="off" />
                    <label class="btn btn-outline-dark" style="border-radius: 0px">
                      component.name
                    </label>
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label for="formFileMultiple" class="form-label fw-bold"
                  >Ảnh xe (1 hoặc nhiều)</label
                >
                <input class="form-control" type="file" id="formFileMultiple" multiple />
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary rounded"
            data-bs-dismiss="modal"
            style="border-radius: 0px"
          >
            Hủy
          </button>
          <button type="submit" class="btn btn-success rounded fw-bold" style="border-radius: 0px">Tạo xe</button>
        </div>
      </div>
    </div>
  </div>
</template>
