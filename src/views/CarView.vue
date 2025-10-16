<script setup lang="ts">
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { onMounted, reactive, ref, computed } from 'vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import type { Car } from '@/types/car'
import type { City } from '@/types/city'
import type { Brand } from '@/types/brand'
import { useRoute, useRouter } from 'vue-router'
import carServices from '@/services/car.services'
import usersServices from '@/services/users.services'
import utilityServices from '@/services/utility.services'

import type { CarouselConfig } from 'vue3-carousel'
import type { User } from '@/types/users'
import type { Review } from '@/types/review'
import type { Utility } from '@/types/utility'
import type { CarRequest } from '@/types/carRequest'

import reviewServices from '@/services/review.services'
import cityServices from '@/services/city.services'
import brandServices from '@/services/brand.services'

import Swal from 'sweetalert2'
import carUtilityServices from '@/services/carUtility.services'
import carRequestServices from '@/services/carRequest.services'

const router = useRouter()
const route = useRoute()
const id = ref(0)
const currentSlide = ref(0)
const starNum = ref<number | null>(null)
const slideTo = (nextSlide: any) => (currentSlide.value = nextSlide)
const selectedOption = ref('pickup')


const dateRange = ref<[Date, Date]>([
  new Date(),
  new Date(Date.now() + 24 * 60 * 60 * 1000), // +1 day
])

const updateCar = reactive<Partial<Car>>({
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
  images: [] as string[],
})
const currentCarRequests = ref<CarRequest[]>([])

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
const cities = ref<City[]>([
  {
    id: 0,
    name: '',
    createdat: '',
    updatedat: '',
    deletedat: null,
  },
])

const fees = [
  {
    title: 'Phí vượt giới hạn',
    price: '3.000 VND / km',
    description:
      'Phụ phí phát sinh nếu lộ trình di chuyển vượt quá <b>350km</b> khi thuê xe 1 ngày',
  },
  {
    title: 'Phí quá giờ',
    price: '70.000 VND / giờ',
    description:
      'Phụ phí phát sinh nếu hoàn trả xe trễ giờ. Trường hợp trễ quá <b>5 giờ</b>, phụ phí thêm <b>1 ngày</b> thuê',
  },
  {
    title: 'Phí vệ sinh',
    price: '70.000 VND',
    description:
      'Phụ phí phát sinh khi xe hoàn trả không đảm bảo vệ sinh (nhiều vết bẩn, bùn cát, sinh lầy…)',
  },
  {
    title: 'Phí khử mùi',
    price: '500.000 VND',
    description:
      'Phụ phí phát sinh khi xe hoàn trả bị ám mùi khó chịu (mùi thuốc lá, thực phẩm nặng mùi…)',
  },
]
const galleryConfig: Partial<CarouselConfig> = {
  itemsToShow: 1,
  wrapAround: true,
  slideEffect: 'fade',
  mouseDrag: false,
  touchDrag: false,
}

const thumbnailsConfig = {
  height: 100,
  itemsToShow: 7,
  wrapAround: true,
  touchDrag: false,
  gap: 10,
}

const currentUser = reactive<Partial<User>>({
  id: 0,
  email: '',
  fullname: '',
  phone: '',
  avatar: '',
  role: '',
  createdat: '',
  updatedat: '',
  deletedat: null,
})

const cars = reactive<Partial<Car>[]>([])
const reviews = reactive<Partial<Review>[]>([])

const utilities = reactive<Partial<Utility>[]>([])
const selectedUtilityids = computed<number[]>(() => (car.utilities ?? []).map((u) => u.id ?? 0))

const inputReviewContent = ref('')
const car = reactive<Partial<Car>>({
  id: 0,
  name: '',
  licenseplate: '',
  description: '',
  regulation: '',
  color: '',
  seats: 0,
  price: 0,
  ownerid: 0,
  ownername: '',
  owneravatar: '',
  brandid: 0,
  brand: '',
  cityid: 0,
  city: '',
  transmissiontypeid: 0,
  transmissiontype: '',
  fueltypeid: 0,
  fueltype: '',
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
  images: [],
  utilities: [],
  createdat: '',
  updatedat: '',
  deletedat: null,
})
const visible = ref(false)
const currentIndex = ref(0)

const openLightbox = (index: number) => {
  currentIndex.value = index
  visible.value = true
}
async function modifyReview(e: Event) {
  e.preventDefault()

  try {
    if (!starNum.value) {
      throw 'Vui lòng chọn số sao'
    }

    // Find if current user already reviewed this car
    const existingReview = reviews.find((r) => r.userid === currentUser.id)

    if (existingReview) {
      await reviewServices.update(existingReview.id ?? 0, {
        content: inputReviewContent.value,
        star: starNum.value,
      })
    } else {
      await reviewServices.create({
        carid: car.id,
        userid: currentUser.id,
        content: inputReviewContent.value,
        star: starNum.value,
      })
    }

    Swal.fire({
      title: 'Thành công!',
      text: 'Chỉnh sửa nhận xét thành công!',
      icon: 'success',
      confirmButtonText: 'OK',
      timer: 1500,
    })
  } catch (error) {
    Swal.fire({
      title: 'Lỗi!',
      text: 'Đã có lỗi xảy ra! ' + error,
      icon: 'error',
      confirmButtonText: 'OK',
      timer: 1500,
    })
    console.log(error)
  }
}
const userReview = ref<Partial<Review> | null>(null)
const avgrating = ref(0)
async function initReviewVariable() {
  starNum.value = 0

  // Get existing review for this car by the current user
  const respReview = await reviewServices.getOneByCaridAndUserid(car.id ?? 0, currentUser.id ?? 0)
  let review = respReview.data.review?.[0] ?? {
    id: 0,
    content: '',
    userid: currentUser.id ?? 0,
    carid: car.id ?? 0,
    star: 0,
    createdat: '',
    updatedat: '',
    deletedat: null,
  }

  userReview.value = review
  starNum.value = review.star
}

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
    updateCar.images = base64Images
  } catch (err) {
    console.error('Error uploading images:', err)
  }
}

async function updateCarProcess(e: Event) {
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
  ]

  const isEmpty = (val: any) => val === undefined || val === null || val === ''
  const hasEmptyRequiredFields = requiredFields.some((field) =>
    isEmpty(updateCar[field as keyof typeof updateCar]),
  )

  try {
    if (hasEmptyRequiredFields) {
      throw 'Vui lòng nhập đầy đủ thông tin quan trọng!'
    }

    await carServices.create(updateCar)

    Swal.fire({
      title: 'Thành công!',
      text: 'Thêm xe thành công!',
      icon: 'success',
      confirmButtonText: 'OK',
      timer: 1500,
    })
  } catch (error) {
    Swal.fire({
      title: 'Thất bại!',
      text: `Thêm xe thất bại! Error: ${error}`,
      icon: 'error',
      confirmButtonText: 'OK',
      timer: 1500,
    })
  }
}

async function saveUtilities() {
  try {
    if (!car.id) throw new Error('Car ID không hợp lệ')

    // Extract only valid numeric IDs
    const selectedids = (car.utilities ?? [])
      .map((u) => u.id)
      .filter((id): id is number => typeof id === 'number')

    // Call backend (delete + insert)
    await carUtilityServices.update(car.id, selectedids)

    Swal.fire({
      title: 'Thành công!',
      text: 'Cập nhật tiện ích thành công!',
      icon: 'success',
      confirmButtonText: 'OK',
      timer: 1500,
    })
  } catch (error) {
    console.error('Error saving utilities:', error)
    Swal.fire({
      title: 'Thất bại!',
      text: 'Cập nhật tiện ích thất bại!',
      icon: 'error',
      confirmButtonText: 'OK',
      timer: 1500,
    })
  }
}

async function requestRent() {
  try {
    const start = new Date(dateRange.value[0])
    start.setHours(0, 0, 0, 0)

    const end = new Date(dateRange.value[1])
    end.setHours(0, 0, 0, 0)

    await carRequestServices.create({
      carid: car.id ?? 0,
      userid: currentUser.id ?? 0,
      starttime: start.toISOString().split('T')[0] + ' 00:00:00',
      endtime: end.toISOString().split('T')[0] + ' 00:00:00',
    })

    Swal.fire({
      title: 'Thành công!',
      text: 'Yêu cầu thuê đã được gửi!',
      icon: 'success',
      confirmButtonText: 'OK',
      timer: 1500,
    })
  } catch (error) {
    console.error('Error saving request:', error)
    Swal.fire({
      title: 'Thất bại!',
      text: 'Gửi yêu cầu thất bại!',
      icon: 'error',
      confirmButtonText: 'OK',
      timer: 1500,
    })
  }
}
const disabledDates = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const requests = currentCarRequests.value

  if (!requests || requests.length === 0) {
    return (date: Date) => {
      const checkDate = new Date(date)
      checkDate.setHours(0, 0, 0, 0)
      return checkDate < today
    }
  }

  // Prepare disabled date ranges
  const ranges = requests
    .filter((req) => req.starttime && req.endtime)
    .map((req) => {
      const start = new Date(req.starttime.replace(' ', 'T'))
      const end = new Date(req.endtime.replace(' ', 'T'))
      const accept = req.accept
      const deny = req.deny

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return null
      }

      start.setHours(0, 0, 0, 0)
      end.setHours(23, 59, 59, 999)

      return { start, end, accept, deny }
    })
    .filter(Boolean) as { start: Date; end: Date; accept: Boolean; deny: Boolean }[]

  return (date: Date) => {
    const checkDate = new Date(date)
    checkDate.setHours(0, 0, 0, 0)

    if (checkDate < today) return true

    const isInRange = ranges.some((r) => {
      const result = checkDate >= r.start && checkDate <= r.end && r.deny == false
      return result
    })

    return isInRange
  }
})

onMounted(async () => {
  try {
    id.value = Number(route.params.id)

    let respCar = await carServices.getOne(id.value)
    Object.assign(car, respCar.data.car[0])

    let respCars = await carServices.getAll()
    cars.push(...respCars.data.cars)

    const respUser = await usersServices.getMe()
    Object.assign(currentUser, respUser.data.user)

    const respReviews = await reviewServices.getOneByCarid(car.id ?? 0)
    reviews.splice(0, reviews.length, ...respReviews.data.reviews)

    const respUtilities = await utilityServices.getAll()
    utilities.splice(0, utilities.length, ...respUtilities.data.utilities)

    const respCarRequests = await carRequestServices.getAllByCarid(id.value)
    currentCarRequests.value = respCarRequests.data.carrequests

    utilities.forEach((u) => {
      if (u.icon) {
        u.icon = u.icon.replace(/width="\d+"/, '').replace(/height="\d+"/, '')
      }
    })

    initReviewVariable()
    const respCities = await cityServices.getAll()
    cities.value = respCities.data.citys

    const respBrands = await brandServices.getAll()
    brands.value = respBrands.data.brands
  } catch (error) {
    console.error('Error loading data:', error)
  }
})

function toggleUtility(u: Partial<Utility>) {
  if (!car.utilities) car.utilities = []

  const index = car.utilities.findIndex((util) => util.id === u.id)
  if (index !== -1) {
    // remove if already exists
    car.utilities.splice(index, 1)
  } else {
    // add if not exists — cast to full Utility since you’re pushing partial data
    car.utilities.push({
      id: u.id ?? 0,
      name: u.name ?? '',
      icon: u.icon ?? '',
      createdat: u.createdat ?? '',
      updatedat: u.updatedat ?? '',
      deletedat: u.deletedat ?? null,
    })
  }
}
</script>

<template>
  <div>
    <div class="container mt-4">
      <div v-if="currentUser.id == car.ownerid" class="w-100 d-flex justify-content-end mb-3">
        <button
          @click="
            () => {
              Object.assign(updateCar, car)
            }
          "
          class="btn btn-primary fw-bold p-3"
          data-bs-toggle="modal"
          data-bs-target="#updateCarModal"
        >
          Chỉnh sửa
        </button>

        <button
          class="btn btn-danger fw-bold ms-2 p-3"
          data-bs-toggle="modal"
          data-bs-target="#deleteCarModal"
        >
          Xóa
        </button>
      </div>

      <div
        class="modal fade"
        id="deleteCarModal"
        tabindex="-1"
        aria-labelledby="deleteCarModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="deleteCarModalLabel">Xác nhận xóa xe</h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              Xóa xe này sẽ không thể khôi phục. Bạn có chắc chắn muốn tiếp tục?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Xóa</button>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="updateCarModal"
        tabindex="-1"
        aria-labelledby="updateCarModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="updateCarModalLabel">Cập nhật xe</h5>
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
                    <input
                      v-model="updateCar.name"
                      type="text"
                      class="form-control"
                      id="name"
                      required
                    />
                  </div>

                  <!-- license plate -->
                  <div class="mb-3">
                    <label for="plate" class="fw-bold form-label">Biển số xe (*):</label>
                    <input
                      v-model="updateCar.licenseplate"
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
                        v-model="updateCar.description"
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
                        v-model="updateCar.regulation"
                        class="form-control"
                        id="regulation"
                      ></textarea>
                    </div>
                  </div>

                  <!-- color -->
                  <div class="mb-3">
                    <label for="color" class="fw-bold form-label">Màu xe (*):</label>
                    <div class="d-flex align-items-center">
                      <input
                        v-model="updateCar.color"
                        type="text"
                        class="form-control"
                        id="color"
                      />
                    </div>
                  </div>

                  <!-- seats -->
                  <div class="mb-3">
                    <label for="seats" class="fw-bold form-label">Số ghế xe (*):</label>
                    <div class="d-flex align-items-center">
                      <input
                        v-model="updateCar.seats"
                        type="number"
                        class="form-control"
                        id="seats"
                      />
                    </div>
                  </div>

                  <!-- price -->
                  <div class="mb-3">
                    <label for="price" class="fw-bold form-label">Giá thuê (*):</label>
                    <div class="d-flex align-items-center">
                      <input
                        v-model="updateCar.price"
                        type="number"
                        class="form-control"
                        id="price"
                      />
                    </div>
                  </div>

                  <!-- brand -->
                  <div class="mb-3">
                    <label class="fw-bold" for="selectBrand">Thương hiệu (*)</label>
                    <select
                      v-model="updateCar.brandid"
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
                      v-model="updateCar.cityid"
                      id="selectCity"
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option v-for="city in cities" :value="city.id">{{ city.name }}</option>
                    </select>
                  </div>

                  <!-- transmission type -->
                  <div class="mb-3">
                    <label class="fw-bold" for="selectTransmissionType">Loại số (*)</label>
                    <div class="form-check">
                      <input
                        v-model="updateCar.transmissiontypeid"
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
                        v-model="updateCar.transmissiontypeid"
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
                        v-model="updateCar.fueltypeid"
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
                        v-model="updateCar.fueltypeid"
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
                        v-model="updateCar.insurance"
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
                        v-model="updateCar.insurance"
                        class="form-check-input"
                        type="radio"
                        name="selectInsurance"
                        id="selectInsurance2"
                        :value="false"
                      />
                      <label class="form-check-label" for="selectInsurance2"> Không </label>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="formFileMultiple" class="form-label fw-bold"
                      >Ảnh xe (1 hoặc nhiều)</label
                    >
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
                @click="updateCarProcess($event)"
                type="submit"
                class="btn btn-primary rounded fw-bold"
                style="border-radius: 0px"
              >
                Cập nhật xe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="car.images && car.images.length > 0" class="row g-2">
        <!-- Left Column: Main image -->
        <div class="col-8">
          <img
            :src="car.images[0]"
            alt="Car"
            class="img-fluid rounded-4 w-100 cursor-pointer"
            @click="openLightbox(0)"
            style="object-fit: cover; height: 100%"
          />
        </div>

        <!-- Right Column: Side thumbnails -->
        <div class="col-4 d-flex flex-column justify-content-between gap-2">
          <img
            v-for="(img, index) in car.images.slice(1, 4)"
            :key="index"
            :src="img"
            alt="Car image"
            class="img-fluid rounded-4 cursor-pointer"
            @click="openLightbox(index + 1)"
            style="max-height: 200px; object-fit: cover"
          />
        </div>

        <!-- Lightbox viewer -->
        <vue-easy-lightbox
          :visible="visible"
          :imgs="car.images"
          :index="currentIndex"
          @hide="visible = false"
        />
      </div>

      <div class="row mt-5">
        <!-- Left column -->
        <div class="col-8">
          <!--  Name section -->
          <div class="d-flex flex-row justify-content-between align-items-center">
            <h1 class="display-6 fw-bold text-uppercase">{{ car.name }}</h1>
            <div>
              <button type="button" class="btn rounded"></button>
              <button type="button" class="btn btn-outline-light rounded-circle">
                <i class="fa-solid fa-heart text-dark"></i>
              </button>
            </div>
          </div>

          <!-- default utility section -->
          <hr />
          <div>
            <h4>Đặc điểm</h4>

            <div class="d-flex justify-content-between p-2">
              <div class="col-6 col-md-3 text-center d-flex align-items-center">
                <i class="fa-solid fa-gears fa-2x text-success mb-2"></i>
                <div class="text-start ms-3 fs-5">
                  <div class="text-muted small">Truyền động</div>
                  <div class="fw-semibold h5">{{ car.transmissiontype }}</div>
                </div>
              </div>

              <!-- Seat count -->
              <div class="col-6 col-md-3 text-center d-flex align-items-center">
                <i class="fa-solid fa-chair fa-2x text-success mb-2"></i>
                <div class="text-start ms-3 fs-5">
                  <div class="text-muted small">Số ghế</div>
                  <div class="fw-semibold h5">{{ car.seats }} chỗ</div>
                </div>
              </div>

              <!-- Fuel type -->
              <div class="col-6 col-md-3 text-center d-flex align-items-center">
                <i class="fa-solid fa-gas-pump fa-2x text-success mb-2"></i>
                <div class="text-start ms-3 fs-5">
                  <div class="text-muted small">Nhiên liệu</div>
                  <div class="fw-semibold h5">{{ car.fueltype }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- description section -->
          <hr />
          <div>
            <h4>Mô tả</h4>
            <pre class="fs-6 text-secondary mt-4">
              {{ car.description }}
            </pre>
          </div>

          <!-- regulation section -->
          <hr />
          <div>
            <h4>Điều khoản</h4>
            <pre class="fs-6 text-secondary mt-4">
              {{ car.regulation }}
            </pre>
          </div>

          <!-- addtional utility section -->
          <hr />
          <div class="d-flex justify-content-between align-items-center">
            <h4>Các tiện nghi khác</h4>
            <button
              v-if="currentUser.id == car.ownerid"
              class="btn btn-light"
              data-bs-toggle="modal"
              data-bs-target="#utilityModal"
            >
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
          </div>

          <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3 text-center">
            <div
              v-for="utility in car.utilities"
              :key="utility.id"
              class="col d-flex align-items-center justify-content-start"
            >
              <span
                class="me-2 d-flex align-items-center justify-content-center utility-icon text-primary"
                v-html="utility.icon"
              ></span>
              <span class="text-dark">{{ utility.name }}</span>
            </div>
          </div>

          <div
            class="modal fade"
            id="utilityModal"
            tabindex="-1"
            aria-labelledby="utilityModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="utilityModalLabel">Modal title</h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <div class="modal-body">
                  <div v-for="utility in utilities" :key="utility.id" class="form-check mb-3">
                    <input
                      class="form-check-input me-2"
                      type="checkbox"
                      :id="'utility-' + utility.id"
                      :checked="selectedUtilityids.includes(utility.id ?? -1)"
                      @change="toggleUtility(utility)"
                    />
                    <div class="d-flex align-items-center">
                      <span
                        class="utility-icon d-flex align-items-center justify-content-center"
                        v-html="utility.icon"
                      ></span>
                      <label class="form-check-label" for="checkDefault">{{ utility.name }} </label>
                    </div>
                  </div>
                </div>

                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Hủy
                  </button>
                  <button type="button" class="btn btn-primary" @click="saveUtilities">
                    Lưu thay đổi
                  </button>
                </div>
              </div>
            </div>
          </div>

          <hr />
          <!-- cancel trip -->
          <div class="mt-5">
            <h5 class="fw-bold mb-3">Chính sách huỷ chuyến</h5>

            <div class="table-responsive">
              <table class="table border rounded text-center">
                <thead class="table-light">
                  <tr>
                    <th class="w-50">Thời Điểm Huỷ Chuyến</th>
                    <th>Phí Huỷ Chuyến</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Trong Vòng 1h Sau Giữ Chỗ</td>
                    <td class="text-success fw-semibold">
                      <i class="fa fa-check-circle me-1"></i> Miễn phí
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Trước Chuyến Đi &gt; 7 Ngày<br /><small class="text-muted"
                        >(Sau 1h Giữ Chỗ)</small
                      >
                    </td>
                    <td class="text-success fw-semibold">
                      <i class="fa fa-check-circle me-1"></i> 10% giá trị chuyến đi
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Trong Vòng 7 Ngày Trước Chuyến Đi<br /><small class="text-muted"
                        >(Sau 1h Giữ Chỗ)</small
                      >
                    </td>
                    <td class="text-danger fw-semibold">
                      <i class="fa fa-times-circle me-1"></i> 40% giá trị chuyến đi
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul class="small text-muted mt-2 ps-3">
              <li>
                Chính sách huỷ chuyến áp dụng chung cho cả khách thuê và chủ xe (ngoài ra, tuỳ vào
                thời điểm huỷ chuyến, chủ xe có thể bị đánh giá từ 2-3★ trên hệ thống).
              </li>
              <li>Khách thuê không nhận xe sẽ mất phí huỷ chuyến (40% giá trị chuyến đi).</li>
              <li>
                Chủ xe không giao xe sẽ hoàn tiền giữ chỗ & bồi thường phí huỷ chuyến cho khách thuê
                (40% giá trị chuyến đi).
              </li>
              <li>
                Tiền giữ chỗ & bồi thường do chủ xe huỷ chuyến (nếu có) sẽ được Mioto hoàn trả đến
                khách thuê bằng chuyển khoản ngân hàng trong vòng 1-3 ngày làm việc kế tiếp.
                <button
                  type="button"
                  class="btn btn-link text-decoration-underline text-dark fw-bold p-0"
                  data-bs-toggle="modal"
                  data-bs-target="#cancelModal"
                >
                  Thủ tục hoàn tiền & bồi thường huỷ chuyến
                </button>
              </li>
            </ul>
          </div>

          <div
            class="modal fade"
            id="cancelModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="cancelModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header text-center w-100">
                  <h5 class="modal-title fw-bold text-center" id="cancelModalLabel">
                    Chính sách hủy chuyến
                  </h5>
                </div>
                <div class="modal-body">
                  <p class="fw-bold">Thủ tục hoàn tiền & bồi thường hủy chuyến</p>
                  <p>
                    GoGo sẽ hoàn lại tiền giữ chỗ (& tiền bồi thường do chủ xe hủy chuyến (nếu có)
                    theo chính sách hủy chuyến) qua tài khoản ngân hàng của khách thuê trong vòng
                    1-3 ngày làm việc kể từ thời điểm hủy chuyến.
                  </p>
                  <p>
                    *Nhân viên GoGo sẽ liên hệ khách thuê (qua số điện thoại đã đăng ký trên GoGo)
                    để xin thông tin tài khoản ngân hàng, hoặc Khách thuê có thể chủ động gửi thông
                    tin cho GoGo qua email contact@gogo.vn hoặc nhắn tin tại GoGo Fanpage.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- location section -->
          <hr />
          <div>
            <h4>Vị trí xe</h4>
            <div class="d-flex align-items-center mt-3 w-100 fs-5">
              <i class="fa-solid fa-location-dot"></i>
              <div class="ms-2">{{ car.city }}</div>
            </div>
          </div>

          <!-- owner section -->
          <hr />
          <div>
            <h4>Chủ xe</h4>

            <!-- avatar  -->
            <div class="d-flex justify-content-between mt-4">
              <div class="d-flex">
                <img
                  v-if="car.owneravatar != null && car.owneravatar != ''"
                  :src="car.owneravatar"
                  class="rounded-circle me-3 mb-5"
                  style="height: 80px; width: 80px; border-radius: 50%; object-fit: cover"
                  alt="Profile Image"
                />
                <img
                  v-else
                  src="https://placehold.co/80x80"
                  alt=""
                  class="img-fluid rounded-circle me-3"
                />
                <div>
                  <h3>{{ car.ownername }}</h3>
                  <div class="d-flex justify-content-between">
                    <div class="d-flex align-items-center justify-content-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-star-fill"
                        viewBox="0 0 16 16"
                        style="color: #f6c854"
                      >
                        <path
                          d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                        />
                      </svg>
                      <div class="ms-1">5.0</div>
                    </div>
                    <div class="ms-3 d-flex justify-content-center align-items-center">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-car-front-fill"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17s3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z"
                          />
                        </svg>
                      </div>
                      <div class="ms-1">100+ chuyến</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-content-between text-center">
                <div class="me-4">
                  <div class="fs-5 text-muted">Tỉ lệ phản hồi</div>

                  <div class="fw-bold">100%</div>
                </div>
                <div class="me-4">
                  <div class="fs-5 text-muted">Thời gian phản hồi</div>

                  <div class="fw-bold">5 phút</div>
                </div>
                <div class="">
                  <div class="fs-5 text-muted">Tỉ lệ đồng ý</div>

                  <div class="fw-bold">100%</div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-3 d-flex align-items-center justify-content-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-star-fill"
              viewBox="0 0 16 16"
              style="color: #f6c854"
            >
              <path
                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
              />
            </svg>
            <div class="fw-bold">{{ car.avgrating }}</div>
            <div class="ms-2">• {{ car.reviewcount }} đánh giá</div>
          </div>

          <div class="d-flex flex-column gap-1">
            <div
              v-for="review in reviews"
              :key="review.id"
              class="mt-3 d-flex justify-content-between align-items-center border rounded p-4"
            >
              <div class="d-flex">
                <img
                  v-if="review.avatar != null && review.avatar != ''"
                  :src="review.avatar"
                  class="rounded-circle me-2"
                  style="height: 80px; width: 80px; border-radius: 50%; object-fit: cover"
                  alt="Profile Image"
                />
                <img
                  v-else
                  src="https://placehold.co/80x80"
                  alt=""
                  class="img-fluid rounded-circle me-2"
                />
                <div class="d-flex flex-column align-content-center justify-content-center">
                  <div class="fw-bold mb-2">{{ review.fullname }}</div>
                  <div class="d-flex">
                    <svg
                      v-for="i in 5"
                      :key="i"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-star-fill"
                      viewBox="0 0 16 16"
                      style="color: #f6c854"
                    >
                      <path
                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                      />
                    </svg>
                  </div>
                  <div>{{ review.content }}</div>
                </div>
              </div>

              <div class="text-secondary">{{ review.createdat ?? '03/10/2025' }}</div>
            </div>
          </div>

          <!-- <div class="text-end mt-2">
            <button class="btn btn-outline-success p-3 fw-bold">Xem thêm</button>
          </div> -->

          <div
            v-if="currentUser.id != 0"
            class="mt-3 d-flex justify-content-between align-items-center border rounded p-4"
          >
            <div class="d-flex w-100">
              <img
                v-if="currentUser.avatar != null && currentUser.avatar != ''"
                :src="currentUser.avatar"
                class="rounded-circle me-2"
                style="height: 80px; width: 80px; border-radius: 50%; object-fit: cover"
                alt="Profile Image"
              />
              <img
                v-else
                src="https://placehold.co/80x80"
                alt=""
                class="img-fluid rounded-circle me-2"
                style="height: 80px; width: 80px; border-radius: 50%"
              />
              <div class="d-flex flex-column align-items-start mb-2 w-100">
                <div class="fw-bold me-3">{{ currentUser.fullname }}</div>
                <div class="rating-wrapper">
                  <!-- stars -->

                  <input
                    v-model="starNum"
                    class="rating-input"
                    type="radio"
                    id="star-5"
                    name="star-rating"
                    :value="5"
                  />
                  <label for="star-5" class="star-rating"><i class="fas fa-star"></i></label>

                  <input
                    v-model="starNum"
                    class="rating-input"
                    type="radio"
                    id="star-4"
                    name="star-rating"
                    :value="4"
                  />
                  <label for="star-4" class="star-rating"><i class="fas fa-star"></i></label>

                  <input
                    v-model="starNum"
                    class="rating-input"
                    type="radio"
                    id="star-3"
                    name="star-rating"
                    :value="3"
                  />
                  <label for="star-3" class="star-rating"><i class="fas fa-star"></i></label>

                  <input
                    v-model="starNum"
                    class="rating-input"
                    type="radio"
                    id="star-2"
                    name="star-rating"
                    :value="2"
                  />
                  <label for="star-2" class="star-rating"><i class="fas fa-star"></i></label>

                  <input
                    v-model="starNum"
                    class="rating-input"
                    type="radio"
                    id="star-1"
                    name="star-rating"
                    :value="1"
                  />
                  <label for="star-1" class="star-rating"><i class="fas fa-star"></i></label>
                </div>

                <textarea
                  v-model="inputReviewContent"
                  class="form-control mt-2 w-100"
                  rows="3"
                  placeholder="Viết đánh giá của bạn..."
                ></textarea>

                <div class="align-self-end mt-2">
                  <button
                    type="submit"
                    class="btn btn-outline-success fw-bold p-3"
                    @click="modifyReview"
                  >
                    Gửi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="col-4 d-flex flex-column">
          <div class="bg-light rounded-4 p-4" style="height: fit-content">
            <div class="d-flex align-items-end">
              <div class="display-6 fw-bold">
                {{
                  car.price?.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })
                }}
              </div>
              <div class="fw-bold text-secondary">/ngày</div>
            </div>
            <hr />
            <div class="d-flex justify-content-between">
              <div>Đơn giá thuê</div>
              <div class="fw-bold">
                {{
                  car.price?.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })
                }}
                /ngày
              </div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Bảo hiểm thuê xe</div>
              <div class="fw-bold">96.050 /ngày</div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Tổng cộng</div>
              <div class="fw-bold">
                {{
                  ((car.price ?? 0) + 96050).toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })
                }}
                x 1 ngày
              </div>
            </div>
            <hr />

            <div class="mt-1" v-if="currentUser.id != 0">
              <div class="fw-bold mb-2">Địa điểm giao nhận xe</div>

              <!-- Option 1 -->
              <div
                class="form-check border rounded p-3 mb-2 d-flex justify-content-between align-items-center"
                :class="{ 'border-primary': selectedOption === 'pickup' }"
              >
                <div>
                  <input
                    class="form-check-input"
                    type="radio"
                    id="pickup"
                    value="pickup"
                    v-model="selectedOption"
                  />
                  <label class="form-check-label ms-2" for="pickup">
                    Tôi tự đến lấy xe
                    <div class="text-muted small">{{ car.city }}</div>
                  </label>
                </div>
                <span class="text-success fw-bold">Miễn phí</span>
              </div>

              <!-- Option 2 -->
              <div
                class="form-check border rounded p-3 d-flex justify-content-between align-items-center"
                :class="{ 'bg-light text-muted': true }"
              >
                <div>
                  <input
                    class="form-check-input"
                    type="radio"
                    id="delivery"
                    value="delivery"
                    v-model="selectedOption"
                    disabled
                  />
                  <label class="form-check-label ms-2" for="delivery">
                    Tôi muốn được giao xe tận nơi
                    <div class="small">Rất tiếc, chủ xe không hỗ trợ giao xe tận nơi</div>
                  </label>
                </div>
              </div>
            </div>
            <div v-if="currentUser.id != 0">
              <Datepicker
                v-model="dateRange"
                :enable-time-picker="false"
                :disabled-dates="disabledDates"
                range
                placeholder="Chọn ngày bắt đầu và kết thúc"
              />

              <div class="d-flex justify-content-between mt-2 mb-2">
                <div class="fw-bold text-uppercase">Thành tiền</div>
                <div class="fw-bold">
                  {{
                    ((car.price ?? 0) + 96050).toLocaleString('it-IT', {
                      style: 'currency',
                      currency: 'VND',
                    })
                  }}
                </div>
              </div>

              <button
                :disabled="
                  dateRange[0] == null || dateRange[1] == null || currentUser.id == car.ownerid
                "
                type="button"
                class="btn btn-success text-uppercase fw-bold p-3 w-100"
                @click="requestRent"
              >
                Chọn thuê
              </button>
            </div>
          </div>
          <div class="card fee-card p-3 mt-3">
            <h6 class="fw-bold text-success mb-3">Phụ phí có thể phát sinh</h6>

            <div v-for="(fee, index) in fees" :key="index" class="d-flex mb-3">
              <!-- Info icon -->
              <i class="bi bi-info-circle me-2 text-muted"></i>

              <div class="flex-grow-1">
                <div class="d-flex justify-content-between">
                  <span class="fw-bold">{{ fee.title }}</span>
                  <span class="fw-bold text-success">{{ fee.price }}</span>
                </div>
                <small class="text-muted" v-html="fee.description"></small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center p-5" style="background-color: #f6f6f6">
      <h3 class="mb-5">Xe tương tự</h3>

      <Carousel id="gallery" v-bind="galleryConfig" v-model="currentSlide">
        <Slide v-for="car in cars" :key="car.id">
          <div class="position-relative mb-4 card shadow-sm rounded-4 align-items-center pt-5">
            <img
              :src="car.imageurl"
              alt="Gallery Image"
              style="min-height: 700px"
              class="gallery-image"
            />
            <h1 class="card-title text-start">
              <a class="text-dark fw-bold" :href="'http://localhost:5173/car/' + car.id" style="">{{
                car.name
              }}</a>
            </h1>
            <div class="card-body d-flex w-100 justify-content-center align-items-center">
              <img
                v-if="car.owneravatar != null && car.owneravatar != ''"
                :src="car.owneravatar"
                class="rounded-circle me-2"
                style="height: 50px; width: 50px; border-radius: 50%; object-fit: cover"
                alt="Profile Image"
              />
              <img
                v-else
                src="https://placehold.co/50x50"
                alt=""
                class="img-fluid rounded-circle me-2"
              />
              <div class="card-text text-dark fw-bold me-5">{{ car.ownername }}</div>
              <div class="d-flex flex-column flex-wrap text-start text-muted me-5">
                <div class="me-3"><i class="fas fa-cogs me-1"></i> {{ car.transmissiontype }}</div>
                <div class="me-3"><i class="fas fa-user-friends me-1"></i> {{ car.seats }} chỗ</div>
                <div><i class="fas fa-gas-pump me-1"></i> {{ car.fueltype }}</div>
                <div class="text-muted"><i class="fas fa-map-pin me-1"></i> {{ car.city }}</div>
              </div>

              <hr />
              <div class="d-flex justify-content-between align-items-center">
                <div class="text-end">
                  <div>
                    <!-- <del class="text-muted">2.296K</del> -->
                    <span class="fw-bold text-success ms-1">{{
                      car.price?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                    }}</span
                    >/ngày
                  </div>
                  <div class="text-primary small">
                    <i class="fas fa-clock me-1"></i>
                    {{
                      car.price
                        ? (car.price / 6).toLocaleString('it-IT', {
                            style: 'currency',
                            currency: 'VND',
                          })
                        : 0
                    }}
                    gói 4 giờ
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slide>
      </Carousel>

      <Carousel id="thumbnails" v-bind="thumbnailsConfig" v-model="currentSlide">
        <Slide v-for="car in cars" :key="car.id">
          <template #default="{ currentIndex, isActive }">
            <div :class="['thumbnail', { 'is-active': isActive }]" @click="slideTo(currentIndex)">
              <img :src="car.imageurl" alt="Thumbnail Image" class="thumbnail-image" />
            </div>
          </template>
        </Slide>

        <template #addons>
          <Navigation />
        </template>
      </Carousel>
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

:root {
  background-color: #242424;
}

.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}
.thumbnail-image {
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.gallery-image {
  border-radius: 8px;
  width: 70%;
  height: 70%;
  object-fit: cover;
}

.gallery-image {
  border-radius: 16px;
}

.thumbnail {
  height: 100%;
  width: 100%;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.3s ease-in-out;
}

.thumbnail.is-active,
.thumbnail:hover {
  opacity: 1;
}
.fee-card {
  border-radius: 12px;
  border: 1px solid #e5e5e5;
}
.rating-wrapper {
  display: inline-flex; /* only take space stars need */
  flex-direction: row-reverse; /* hover highlight logic works */
  justify-content: flex-start; /* align to left */
  gap: 0.25rem;
  width: auto; /* prevent full width stretching */
}

.star-rating {
  color: rgba(198, 206, 237, 0.8);
  cursor: pointer;
  font-size: 1.5rem;
  transition: color 0.3s;
}

.rating-input {
  display: none;
}

.star-rating:hover,
.star-rating:hover ~ .star-rating,
.rating-input:checked ~ .star-rating {
  color: #f4bb47;
}

.utility-icon :deep(svg) {
  width: 24px;
  height: 24px;
  display: block;
  fill: currentColor;
}

.utility-icon {
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1; /* prevents text-like offset */
}
.cursor-pointer {
  cursor: pointer;
}
</style>
