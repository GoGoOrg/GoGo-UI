<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

import usersServices from '@/services/users.services'
import carServices from '@/services/car.services'

import type { Car } from '@/types/car'
import type { City } from '@/types/city'
import cityServices from '@/services/city.services'
import type { Brand } from '@/types/brand'
import brandServices from '@/services/brand.services'

import OwnerCardComponent from '@/components/OwnerCardComponent.vue'
import type { User } from '@/types/users'

const router = useRouter()

// Admin user data
const currentUser = ref<Partial<User>>({})

const cities = ref<Partial<City>[]>([])

const brands = ref<Partial<Brand>[]>([])

const cars = ref<Partial<Car>[]>([])
const sortOption = ref<string>('0')

const sortedCars = computed(() => {
  const list = [...cars.value]

  switch (sortOption.value) {
    case '1':
      // Price ascending
      return list.sort((a, b) => (a.price ?? 0) - (b.price ?? 0))

    case '2':
      // Price descending
      return list.sort((a, b) => (b.price ?? 0) - (a.price ?? 0))

    default:
      // Default (original order — unsorted)
      return list
  }
})
const newCar = reactive({
  name: '',
  licenseplate: '',
  description: '',
  regulation: '',
  color: 'Trắng',
  seats: 4,
  price: 0,
  ownerid: 0,
  brandid: 1,
  cityid: 1,
  transmissiontypeid: 1,
  fueltypeid: 1,
  insurance: 1,
  driver: false,
  images: [] as string[],
})

// image handling section

const toBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

async function uploadImageCar(event: Event) {
  const input = event.target as HTMLInputElement
  const files = input.files

  if (!files || files.length === 0) return

  try {
    const fileArray = Array.from(files)
    const base64Images = await Promise.all(fileArray.map((file) => toBase64(file).then(String)))
    newCar.images = base64Images
  } catch (err) {
    console.error('Error uploading images:', err)
  }
}

async function addCar(e: Event) {
  e.preventDefault()

  const requiredFields = [
    'name',
    'licenseplate',
    'description',
    'color',
    'seats',
    'price',
    'cityid',
    'brandid',
    'transmissiontypeid',
    'fueltypeid',
    'insurance',
    'images',
    'driver',
  ]

  const isEmpty = (val: any) => val === undefined || val === null || val === ''
  const hasEmptyRequiredFields = requiredFields.some((field) =>
    isEmpty(newCar[field as keyof typeof newCar]),
  )

  try {
    if (hasEmptyRequiredFields) {
      throw 'Vui lòng nhập đầy đủ thông tin quan trọng!'
    }

    if (!newCar.images || newCar.images.length != 4) {
      throw 'Vui lòng chọn đầy đủ 4 ảnh cho xe!'
    }

    await carServices.create(newCar)

    Swal.fire({
      title: 'Thành công!',
      text: 'Thêm xe thành công!',
      icon: 'success',
      confirmButtonText: 'OK',
      timer: 1500,
    })
  } catch (err) {
    Swal.fire({
      title: 'Thất bại!',
      text: `Thêm xe thất bại! Error: ${err}`,
      icon: 'error',
      confirmButtonText: 'OK',
      timer: 1500,
    })
  }
}

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

    const respUser = await usersServices.getMe()

    currentUser.value = respUser.data.user
    // if (currentUser.value.role !== 'admin' || currentUser.value.accountid === 0) {
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
    const respCars = await carServices.getAllByOwnerid(currentUser.value.id ?? 0) // TODO
    cars.value = respCars.data.cars

    const respCities = await cityServices.getAll()
    cities.value = respCities.data.citys

    const respBrands = await brandServices.getAll()
    brands.value = respBrands.data.brands
    
  } catch (err) {
    console.error(err)
  }
})
</script>

<template>
  <div class="container">
    <h1 class="text-center m-3">Quản lý xe</h1>

    <div class="text-end mb-2 d-flex justify-content-end">
      <div class="me-3">Sắp xếp theo:</div>

      <select v-model="sortOption" class="form-select form-select-sm w-25" aria-label="Sort cars">
        <option value="0">Mặc định</option>
        <option value="1">Giá tăng dần</option>
        <option value="2">Giá giảm dần</option>
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

    <div v-if="cars.length > 0" v-for="(car, index) in sortedCars" :key="car.id">
      <h3>{{ index + 1 }}. {{ car.name }}</h3>
      <OwnerCardComponent :car="car" />
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
                <input v-model="newCar.name" type="text" class="form-control" id="name" required />
              </div>

              <!-- license plate -->
              <div class="mb-3">
                <label for="plate" class="fw-bold form-label">Biển số xe (*):</label>
                <input
                  v-model="newCar.licenseplate"
                  type="text"
                  class="form-control"
                  id="plate"
                  required
                />
              </div>

              <!-- description -->
              <div class="mb-3">
                <label for="description" class="fw-bold form-label">Mô tả xe (*):</label>
                <div class="d-flex align-items-center">
                  <textarea
                    v-model="newCar.description"
                    class="form-control"
                    id="description"
                    required
                  ></textarea>
                </div>
              </div>

              <!-- regulation -->
              <div class="mb-3">
                <label for="regulation" class="fw-bold form-label"
                  >Luật khi dùng xe (nếu có):</label
                >
                <div class="d-flex align-items-center">
                  <textarea
                    v-model="newCar.regulation"
                    class="form-control"
                    id="regulation"
                  ></textarea>
                </div>
              </div>

              <!-- color -->
              <div class="mb-3">
                <label for="color" class="fw-bold form-label">Màu xe (*):</label>
                <div class="d-flex align-items-center">
                  <input v-model="newCar.color" type="text" class="form-control" id="color" />
                </div>
              </div>

              <!-- seats -->
              <div class="mb-3">
                <label for="seats" class="fw-bold form-label">Số ghế xe (*):</label>
                <div class="d-flex align-items-center">
                  <input v-model="newCar.seats" type="number" class="form-control" id="seats" />
                </div>
              </div>

              <!-- price -->
              <div class="mb-3">
                <label for="price" class="fw-bold form-label">Giá thuê (*):</label>
                <div class="d-flex align-items-center">
                  <input v-model="newCar.price" type="number" class="form-control" id="price" />
                </div>
              </div>

              <!-- brand -->
              <div class="mb-3">
                <label class="fw-bold" for="selectBrand">Thương hiệu (*)</label>
                <select
                  v-model="newCar.brandid"
                  id="selectBrand"
                  class="form-select"
                  aria-label="Default select example"
                >
                  <option :value="brand.id" v-for="brand in brands">{{ brand.name }}</option>
                </select>
              </div>

              <!-- city -->
              <div class="mb-3">
                <label class="fw-bold" for="selectCity">Thành phố (*)</label>
                <select
                  v-model="newCar.cityid"
                  id="selectCity"
                  class="form-select"
                  aria-label="Default select example"
                >
                  <option v-for="city in cities" :value="city.id">{{ city.name }}</option>
                </select>
              </div>

              <div class="d-flex gap-5">
                <!-- transmission type -->
                <div class="mb-3">
                  <label class="fw-bold" for="selectTransmissionType">Loại số (*)</label>
                  <div class="form-check">
                    <input
                      v-model="newCar.transmissiontypeid"
                      class="form-check-input"
                      type="radio"
                      :value="1"
                      name="selectTransmissionType"
                      id="selectTransmissionType1"
                    />
                    <label class="form-check-label" for="selectTransmissionType1">
                      Số tự động
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      v-model="newCar.transmissiontypeid"
                      class="form-check-input"
                      type="radio"
                      name="selectTransmissionType"
                      id="selectTransmissionType2"
                      :value="2"
                    />
                    <label class="form-check-label" for="selectTransmissionType2"> Số sàn </label>
                  </div>
                </div>

                <!-- fuel type -->
                <div class="mb-3">
                  <label class="fw-bold" for="selectFuelType">Loại nhiên liệu (*)</label>
                  <div class="form-check">
                    <input
                      v-model="newCar.fueltypeid"
                      class="form-check-input"
                      type="radio"
                      name="selectFuelType"
                      id="selectFuelType1"
                      :value="1"
                    />
                    <label class="form-check-label" for="selectFuelType1"> Xe xăng </label>
                  </div>
                  <div class="form-check">
                    <input
                      v-model="newCar.fueltypeid"
                      class="form-check-input"
                      type="radio"
                      name="selectFuelType"
                      id="selectFuelType2"
                      :value="2"
                    />
                    <label class="form-check-label" for="selectFuelType2"> Xe điện </label>
                  </div>
                </div>

                <!-- insurance -->
                <div class="mb-3">
                  <label class="fw-bold" for="selectInsurance">Bảo hiểm (*)</label>
                  <div class="form-check">
                    <input
                      v-model="newCar.insurance"
                      class="form-check-input"
                      type="radio"
                      name="selectInsurance"
                      id="selectInsurance1"
                      :value="true"
                    />
                    <label class="form-check-label" for="selectInsurance1"> Có </label>
                  </div>
                  <div class="form-check">
                    <input
                      v-model="newCar.insurance"
                      class="form-check-input"
                      type="radio"
                      name="selectInsurance"
                      id="selectInsurance2"
                      :value="false"
                    />
                    <label class="form-check-label" for="selectInsurance2"> Không </label>
                  </div>
                </div>

                <!-- driver -->
                <div class="mb-3">
                  <label class="fw-bold" for="selectDriver">Tài xế (*)</label>
                  <div class="form-check">
                    <input
                      v-model="newCar.driver"
                      class="form-check-input"
                      type="radio"
                      name="selectDriver"
                      id="selectDriver1"
                      :value="true"
                    />
                    <label class="form-check-label" for="selectDriver1"> Có </label>
                  </div>
                  <div class="form-check">
                    <input
                      v-model="newCar.driver"
                      class="form-check-input"
                      type="radio"
                      name="selectDriver"
                      id="selectDriver2"
                      :value="false"
                    />
                    <label class="form-check-label" for="selectDriver2"> Không </label>
                  </div>
                </div>
              </div>


              <div class="mb-3">
                <label for="formFileMultiple" class="form-label fw-bold">Ảnh xe (4 ảnh)</label>
                <input
                  class="form-control"
                  type="file"
                  @change="uploadImageCar($event)"
                  id="formFileMultiple"
                  multiple
                />
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
          <button
            @click="addCar($event)"
            type="submit"
            class="btn btn-success rounded fw-bold"
            style="border-radius: 0px"
          >
            Tạo xe
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
