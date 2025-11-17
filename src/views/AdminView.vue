<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCookies } from 'vue3-cookies'
import Swal from 'sweetalert2'
import { Chart, Grid, Line } from 'vue3-charts'
import { calculateTimeElapse } from '@/utils/utils'

import usersServices from '@/services/users.services'
import carServices from '@/services/car.services'
import reviewServices from '@/services/review.services'

import type { Car } from '@/types/car'
import type { User } from '@/types/users'
import type { Review } from '@/types/review'
import type { CarRequest } from '@/types/carRequest'

import carRequestServices from '@/services/carRequest.services'

const router = useRouter()
const cookies = useCookies()
const token = cookies.cookies.get('Admin Token')

// Chart data
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const plByMonth = ref(months.map((name) => ({ name, pl: 0, avg: 0, inc: 0 })))
const plByMoney = ref(months.map((name) => ({ name, pl: 0, avg: 0, inc: 0 })))

// Convert file to base64
const toBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

// Admin user data
const currentUser = ref({
  accountid: 0,
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

const users = reactive<Partial<User[]>>([])
const cars = reactive<Partial<Car>[]>([])
const topHireCars = reactive<Partial<Car>[]>([])
// Example car data
const car = ref<Partial<Car>>({})
const carRequests = ref<CarRequest[]>([])
const reviews = ref<Review[]>([])
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

const countTotalSaleToday = ref(0)
const countTotalPriceToday = ref(0)
const countTotalPrice = ref(0)
const doneCalculate = ref(false)
const startDate = ref('2025-11-06')
const endDate = ref('2025-11-06')

const filteredHires = computed(() => {
  return carRequests.value.filter((carrequest: any) => {
    const nextDay = new Date(endDate.value)
    nextDay.setDate(nextDay.getDate() + 1) // Add one day to endDate
    return carrequest.createdat >= startDate.value && carrequest.createdat < nextDay.toISOString()
  })
})

const totalRevenue = computed(() => {
  return filteredHires.value.reduce((sum, carRequest: any) => {
    return sum + (carRequest.accept == true ? carRequest.totalprice : 0)
  }, 0)
})

function countToday() {
  const currentDate = new Date().toISOString().split('T')[0]

  for (let i = 0; i < carRequests.value.length; i++) {
    if (carRequests.value[i].createdat.slice(0, 10) == currentDate) {
      countTotalSaleToday.value += 1
      if (carRequests.value[i].accept == true)
        countTotalPriceToday.value += carRequests.value[i].totalprice
    }
  }
}

const maxReview = ref(0)
const fiveStar = ref(0)
const fourStar = ref(0)
const threeStar = ref(0)
const twoStar = ref(0)
const oneStar = ref(0)

function calculateReview() {
  reviews.value.forEach((r) => {
    if (r.star == 5) fiveStar.value += 1
    if (r.star == 4) fourStar.value += 1
    if (r.star == 3) threeStar.value += 1
    if (r.star == 2) twoStar.value += 1
    if (r.star == 1) oneStar.value += 1
  })
  maxReview.value = Math.max(
    fiveStar.value,
    fourStar.value,
    threeStar.value,
    twoStar.value,
    oneStar.value,
  )
}

onMounted(async () => {
  try {
    // Prevent scroll on tagEdit labels
    document.querySelectorAll('label[for^="tagEdit"]').forEach((label) => {
      label.addEventListener('click', (e) => e.preventDefault())
    })

    const respUser = await usersServices.getMe()
    currentUser.value = respUser.data.user

    const respUsers = await usersServices.getAll()
    users.splice(0, users.length, ...respUsers.data.users)

    if (currentUser.value.role !== 'admin' || currentUser.value.accountid === 0) {
      await Swal.fire({
        title: 'Không có quyền!',
        text: 'Vui lòng đăng nhập dưới vai trò admin để xem thông tin',
        icon: 'error',
        confirmButtonText: 'OK',
        timer: 1500,
      })
      return router.push({ name: 'admin login' })
    }

    // Load car data
    const respCars = await carServices.getAll()
    cars.splice(0, cars.length, ...respCars.data.cars)

    const respTopHireCars = await carServices.getTopHireCars()
    topHireCars.splice(0, topHireCars.length, ...respTopHireCars.data.cars)

    const respCarRequests = await carRequestServices.getAll()
    carRequests.value = respCarRequests.data.carrequests

    console.log(carRequests.value)

    let respReviews = await reviewServices.getAll()
    reviews.value = respReviews.data.reviews

    calculateReview()

    countToday()
    for (let i = 0; i < carRequests.value.length; i++) {
      plByMonth.value[Number(carRequests.value[i].createdat.slice(5, 7)) - 1].pl += 1

      if (carRequests.value[i].accept == true) {
        plByMoney.value[Number(carRequests.value[i].createdat.slice(5, 7)) - 1].pl +=
          carRequests.value[i].totalprice

        countTotalPrice.value += carRequests.value[i].totalprice
      }
    }
    doneCalculate.value = true
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div>
    <div id="whole-section" class="bg-white d-flex p-0 mb-5" style="width: 100vw">
      <nav id="sidebarMenu" style="z-index: 0" class="bg-white sticky-top">
        <div class="position-sticky">
          <div ref="fragment" class="list-group list-group-flush mx-3 mt-4">
            <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple active"
              aria-current="true"
              data-bs-toggle="tab"
              data-bs-target="#metric"
            >
              <i class="fas fa-chart-line fa-fw me-3"></i>
              <span>Thống kê</span>
            </a>
            <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple"
              aria-current="false"
              data-bs-toggle="tab"
              data-bs-target="#order"
              aria-controls="order"
            >
              <i class="fa-solid fa-list me-3"></i>
              <span>Lượt thuê</span>
            </a>

            <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple"
              aria-current="false"
              data-bs-toggle="tab"
              data-bs-target="#product"
              aria-controls="product"
            >
              <div class="d-flex justify-content-between">
                <div>
                  <i class="fa-brands fa-product-hunt me-3"></i>
                  <span>Xe</span>
                </div>
              </div>
            </a>
            <!-- <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple"
              aria-current="false"
              data-bs-toggle="tab"
              data-bs-target="#data"
              aria-controls="data"
            >
              <div class="d-flex justify-content-between">
                <div>
                  <i class="fa-solid fa-database me-3"></i>
                  <span>Dữ liệu danh mục</span>
                </div>
              </div>
            </a> -->

            <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple"
              aria-current="false"
              data-bs-toggle="tab"
              data-bs-target="#users"
              aria-controls="users"
            >
              <i class="fa-solid fa-users me-3"></i>
              <span>Người dùng</span>
            </a>
          </div>
        </div>
      </nav>

      <div class="tab-content" id="v-pills-tabContent">
        <!-- Statistics Overview Tab -->
        <div
          class="tab-pane fade show active mt-4"
          id="metric"
          role="tabpanel"
          aria-labelledby="metric-tab"
          style="width: 80vw"
        >
          <div class="content w-100 me-5">
            <h2 class="p-4">Thống kê tổng quan</h2>

            <!-- Sale & Revenue Start -->
            <!-- Overview Statistics -->
            <div class="container-fluid">
              <div class="d-flex mt-3">
                <div
                  class="bg-light w-50 me-4 p-4 d-flex align-items-center justify-content-between"
                >
                  <i class="fa-solid fa-users fa-3x" style="color: #5fcf86"></i>
                  <div class="ms-3">
                    <p class="mb-2 fw-bold">Số lượng người dùng</p>
                    <h6 class="mb-0 text-end">{{ users.length }}</h6>
                  </div>
                </div>
                <div class="bg-light w-50 p-4 d-flex align-items-center justify-content-between">
                  <i class="fa-brands fa-product-hunt fa-3x" style="color: #5fcf86"></i>
                  <div class="ms-3">
                    <p class="mb-2 fw-bold">Số lượng xe</p>
                    <h6 class="mb-0 text-end">{{ cars.length }}</h6>
                  </div>
                </div>
              </div>

              <div class="d-flex mt-3">
                <div
                  class="bg-light w-50 me-4 p-4 d-flex align-items-center justify-content-between"
                >
                  <i class="fa fa-chart-bar fa-3x" style="color: #5fcf86"></i>
                  <div class="ms-3">
                    <p class="mb-2 fw-bold">Tổng lượt thuê</p>
                    <h6 class="mb-0 text-end">{{ carRequests.length }}</h6>
                  </div>
                </div>
                <div class="bg-light w-50 p-4 d-flex align-items-center justify-content-between">
                  <i class="fa fa-chart-pie fa-3x" style="color: #5fcf86"></i>
                  <div class="ms-3">
                    <p class="mb-2 fw-bold">Tổng doanh thu</p>
                    <h6 class="mb-0 text-end" v-if="countTotalPrice > 0">
                      {{
                        countTotalPrice.toLocaleString('it-IT', {
                          style: 'currency',
                          currency: 'VND',
                        })
                      }}
                    </h6>
                  </div>
                </div>
              </div>

              <!-- Charts Section -->
              <div class="row g-4 mt-1">
                <div class="col-sm-12 col-xl-6">
                  <div class="bg-light text-center rounded p-4">
                    <div class="d-flex align-items-center justify-content-between mb-4">
                      <h6 class="mb-0">Thống kê lượt thuê</h6>
                    </div>
                    <div id="worldwide-sales" v-if="doneCalculate">
                      <Chart
                        :size="{ width: 500, height: 400 }"
                        :margin="{ left: 0, top: 20, right: 0, bottom: 0 }"
                        :data="plByMonth"
                        direction="horizontal"
                      >
                        <template #layers>
                          <Grid strokeDasharray="2,2" />
                          <Line :dataKeys="['name', 'pl']" />
                        </template>
                      </Chart>
                    </div>
                  </div>
                </div>

                <div class="col-sm-12 col-xl-6">
                  <div class="bg-light text-center rounded p-4">
                    <div class="d-flex align-items-center justify-content-between mb-4">
                      <h6 class="mb-0">Thống kê doanh thu</h6>
                    </div>
                    <div id="sales-revenue" v-if="doneCalculate">
                      <Chart
                        :size="{ width: 500, height: 400 }"
                        :margin="{ left: 0, top: 20, right: 0, bottom: 0 }"
                        :data="plByMoney"
                        direction="horizontal"
                      >
                        <template #layers>
                          <Grid strokeDasharray="2,2" />
                          <Line
                            :dataKeys="['name', 'pl']"
                            type="monotone"
                            :lineStyle="{ stroke: '#9f7aea' }"
                          />
                          <defs>
                            <linearGradient id="grad" gradientTransform="rotate(90)">
                              <stop offset="0%" stop-color="#be90ff" stop-opacity="1" />
                              <stop offset="100%" stop-color="white" stop-opacity="0.4" />
                            </linearGradient>
                          </defs>
                        </template>
                      </Chart>
                    </div>
                  </div>
                </div>
              </div>

              <div class="p-4 mt-3 text-white" style="background-color: #5fcf86">
                <h6>Xe được thuê nhiều nhất</h6>
                <div class="d-flex justify-content-between">
                  <div class="fw-bold">
                    <a
                      :href="'http://localhost:5173/car' + topHireCars[0]?.id"
                      class="text-decoration-underline text-white"
                    >
                      <div class="text-uppercase">{{ topHireCars[0]?.name }}</div>
                    </a>
                    <a class="fw-bold text-dark" :href="'http://localhost:5173/car/'"> </a>
                  </div>

                  <div class="d-flex flex-column">
                    <div class="fw-bold">Lượt thuê: {{ topHireCars[0]?.totalrequests }}</div>
                    <div class="fw-bold" v-if="(topHireCars[0]?.totalincome ?? 0) > 0">
                      Tổng doanh thu:
                      {{
                        Number(topHireCars[0]?.totalincome ?? 0).toLocaleString('it-IT', {
                          style: 'currency',
                          currency: 'VND',
                        })
                      }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Sale & Revenue End -->

            <!-- <h2 class="p-4">Thống kê lượt thuê và doanh thu</h2> -->

            <!-- Sales Chart Start -->
            <!-- <div class="container-fluid">
              <div class="row g-4">
                <div class="d-flex">
                  <input type="date" class="form-control me-4" v-model="startDate" />
                  <input type="date" class="form-control" v-model="endDate" />
                </div>
                <div class="">
                  <div class="d-flex">
                    <div
                      class="bg-light w-50 me-4 p-4 d-flex align-items-center justify-content-between"
                    >
                      <i class="fa fa-chart-bar fa-3x" style="color: #5fcf86"></i>
                      <div class="ms-3">
                        <p class="mb-2">Tổng lượt thuê trong khoảng thời gian</p>
                        <h6 class="mb-0 text-end">{{ filteredHires.length }}</h6>
                      </div>
                    </div>
                    <div
                      class="bg-light w-50 p-4 d-flex align-items-center justify-content-between"
                    >
                      <i class="fa fa-chart-pie fa-3x" style="color: #5fcf86"></i>
                      <div class="ms-3">
                        <p class="mb-2">Tổng doanh thu trong khoảng thời gian</p>
                        <h6 class="mb-0 text-end">
                          {{
                            totalRevenue.toLocaleString('it-IT', {
                              style: 'currency',
                              currency: 'VND',
                            })
                          }}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> -->

            <!-- Widgets Start -->
            <div class="container-fluid pt-4 d-flex w-100">
              <div class="w-100 me-2">
                <div class="">
                  <div class="h-100 bg-light rounded p-4">
                    <div class="d-flex align-items-center justify-content-between mb-2">
                      <h2 class="">Thống kê đánh giá</h2>
                    </div>
                    <div class="">
                      <div>
                        <div class="fw-bold">
                          <i class="fas fa-star d-inline-block"></i>
                          <i class="fas fa-star d-inline-block"></i>
                          <i class="fas fa-star d-inline-block"></i>
                          <i class="fas fa-star d-inline-block"></i>
                          <i class="fas fa-star d-inline-block"></i>
                        </div>
                      </div>
                      <div class="">
                        <div class="progress" style="margin: 8px 0">
                          <div
                            class="progress-bar bg-warning fw-bold text-end pe-2"
                            role="progressbar"
                            aria-valuenow="5"
                            aria-valuemin="0"
                            aria-valuemax="5"
                            :style="`width: ${(fiveStar * 100) / maxReview}%`"
                          >
                            {{ fiveStar }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="">
                      <div>
                        <div class="fw-bold" style="margin: 5px 0">
                          <i class="fas fa-star d-inline-block"></i>
                          <i class="fas fa-star d-inline-block"></i>
                          <i class="fas fa-star d-inline-block"></i>
                          <i class="fas fa-star d-inline-block"></i>
                        </div>
                      </div>
                      <div class="">
                        <div class="progress" style="margin: 8px 0">
                          <div
                            class="progress-bar bg-warning fw-bold text-end pe-2"
                            role="progressbar"
                            aria-valuenow="4"
                            aria-valuemin="0"
                            aria-valuemax="5"
                            :style="`width: ${(fourStar * 100) / maxReview}%`"
                          >
                            {{ fourStar }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="">
                      <div>
                        <div class="fw-bold" style="margin: 5px 0">
                          <i class="fas fa-star d-inline-block"></i>
                          <i class="fas fa-star d-inline-block"></i>
                          <i class="fas fa-star d-inline-block"></i>
                        </div>
                      </div>
                      <div class="">
                        <div class="progress" style="margin: 8px 0">
                          <div
                            class="progress-bar bg-primary fw-bold text-end pe-2"
                            role="progressbar"
                            aria-valuenow="3"
                            aria-valuemin="0"
                            aria-valuemax="5"
                            :style="`width: ${(threeStar * 100) / maxReview}%`"
                          >
                            {{ threeStar }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="">
                      <div>
                        <div class="fw-bold" style="margin: 5px 0">
                          <i class="fas fa-star d-inline-block"></i>
                          <i class="fas fa-star d-inline-block"></i>
                        </div>
                      </div>
                      <div class="">
                        <div class="progress" style="margin: 8px 0">
                          <div
                            class="progress-bar bg-danger fw-bold text-end pe-2"
                            role="progressbar"
                            aria-valuenow="2"
                            aria-valuemin="0"
                            aria-valuemax="5"
                            :style="`width: ${(twoStar * 100) / maxReview}%`"
                          >
                            {{ twoStar }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <div class="fw-bold" style="margin: 5px 0">
                          <i class="fas fa-star d-inline-block"></i>
                        </div>
                      </div>
                      <div class="">
                        <div class="progress" style="margin: 8px 0">
                          <div
                            class="progress-bar bg-danger fw-bold text-end pe-2"
                            role="progressbar"
                            aria-valuenow="1"
                            aria-valuemin="0"
                            aria-valuemax="5"
                            :style="`width: ${(oneStar * 100) / maxReview}%`"
                          >
                            {{ oneStar }}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      v-for="review in reviews"
                      :key="review.id"
                      class="d-flex align-items-center border-bottom py-3"
                    >
                      <img
                        v-if="review.avatar != '' && review.avatar != null"
                        class="rounded-circle flex-shrink-0 me-3"
                        alt=""
                        :src="review.avatar"
                        style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover"
                      />
                      <img
                        v-else
                        src="https://placehold.co/60x60"
                        class="rounded-circle flex-shrink-0 me-3"
                        alt=""
                      />
                      <div class="ms-3" style="width: 90%">
                        <div class="d-flex w-100 justify-content-between">
                          <h6 class="mb-0 w-75">
                            {{ review.fullname }} đã đánh giá
                            <a :href="'http://localhost:5173/car/' + review.carid">{{
                              review.carname
                            }}</a>
                          </h6>
                          <div class="d-flex flex-column justify-content-end text-end">
                            <small>{{ calculateTimeElapse(review.createdat) }}</small>
                            <div>
                              <i
                                v-for="index in review.star"
                                :key="index"
                                class="fas fa-star d-inline-block"
                                style="color: #f4bb47"
                              ></i>
                            </div>
                          </div>
                        </div>
                        <span style="display: block" class="text-truncate">{{
                          review.content
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal -->
        <div
          class="modal fade"
          id="deleteTag"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="deleteTagLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="deleteTagLabel">Xóa nhãn</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">Bạn có chắc chắn muốn xóa nhãn này?</div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Xóa</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal -->
        <div
          class="modal fade"
          id="deleteProduct"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="deleteProductLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="deleteProductLabel">Xóa xe</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">Bạn có chắc chắn muốn xóa xe này?</div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Xóa</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal -->
        <div
          class="modal fade"
          id="deleteComp"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="deleteCompLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="deleteCompLabel">Xóa thành phần</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">Bạn có chắc chắn muốn xóa thành phần này?</div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Xóa</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal -->
        <div
          class="modal fade"
          id="deleteBrand"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="deleteBrandLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="deleteBrandLabel">Xóa thương hiệu</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">Bạn có chắc chắn muốn xóa thương hiệu này?</div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Xóa</button>
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-light p-4 rounded tab-pane fade show mt-4"
          id="product"
          role="tabpanel"
          aria-labelledby="product-tab"
          style="width: 80vw"
        >
          <h2>Danh sách xe</h2>
          <div class="w-100 align-content-end text-end mb-2">
            <button
              class="btn btn-light text-white fw-bold p-3"
              style="background-color: #5fcf86; border-radius: 50px"
              data-bs-toggle="modal"
              data-bs-target="#addProductModal"
            >
              + Thêm xe
            </button>
          </div>
          <table class="table table-hover">
            <thead>
              <tr>
                <th
                  class="fw-bold text-uppercase text-center"
                  style="vertical-align: middle"
                  scope="col"
                >
                  ID
                </th>
                <th
                  class="fw-bold text-uppercase text-center"
                  style="vertical-align: middle"
                  scope="col"
                >
                  Tên xe
                </th>
                <th
                  class="fw-bold text-uppercase text-center"
                  style="vertical-align: middle"
                  scope="col"
                >
                  Ảnh
                </th>
                <th
                  class="fw-bold text-uppercase text-center"
                  style="vertical-align: middle"
                  scope="col"
                >
                  Giá
                </th>
                <th
                  class="fw-bold text-uppercase text-center"
                  style="vertical-align: middle"
                  scope="col"
                >
                  Biển số xe
                </th>
                <th
                  class="fw-bold text-uppercase text-center"
                  style="vertical-align: middle"
                  scope="col"
                >
                  Thương hiệu
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="car in cars" :key="car.id" class="text-center">
                <th scope="row">{{ car.id }}</th>
                <th scope="row">
                  <a class="fw-bold text-dark" :href="'http://localhost:5173/car/' + car.id">
                    {{ car.name }}
                  </a>
                </th>
                <th scope="row">
                  <img class="img-thumbnail" height="80" width="80" alt="" :src="car.imageurl" />
                </th>
                <th scope="row">
                  {{
                    (car.price ?? 0).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                  }}
                </th>
                <th scope="row">{{ car.licenseplate }}</th>
                <th scope="row" class="text-capitalize">{{ car.brand }}</th>
                <!-- <th scope="row">
                  <button
                    class="btn btn-sm"
                    style="background-color: #fbbfc0; color: white"
                    data-bs-toggle="modal"
                    data-bs-target="#editProduct"
                  >
                    <i class="fa-regular fa-pen-to-square"></i>
                  </button>

                  <button
                    type="button"
                    class="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteProduct"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </th> -->
              </tr>
            </tbody>
          </table>
        </div>

        <div
          class="bg-light p-4 rounded tab-pane fade show mt-4"
          id="data"
          role="tabpanel"
          aria-labelledby="data-tab"
          style="width: 80vw"
        >
          <h2>Dữ liệu danh mục</h2>
          <div class="d-flex">
            <div class="w-50">
              <div class="bg-light text-center rounded p-4">
                <div class="d-flex align-items-center justify-content-between mb-4">
                  <h5 class="mb-0">Danh sách thể loại</h5>
                </div>
                <button
                  class="btn btn-dark fw-bold w-100"
                  data-bs-toggle="modal"
                  data-bs-target="#addCategoryModal"
                >
                  <i class="fa-solid fa-plus"></i>
                </button>

                <!-- Modal -->
                <div
                  class="modal fade"
                  id="addCategoryModal"
                  tabindex="-1"
                  aria-labelledby="addCategoryModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog-centered modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="addCategoryModalLabel">Thêm thể loại</h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body d-flex flex-column w-100">
                        <div class="d-flex w-100 justify-content-between mb-3">
                          <label for="tag-name">Tên thể loại:</label>
                          <input class="w-75 form-control" type="text" id="tag-name" required />
                        </div>

                        <div class="d-flex w-100 justify-content-between">
                          <label for="tag-name">Mô tả:</label>
                          <input class="w-75 form-control" type="text" id="tag-name" required />
                        </div>
                      </div>

                      <div class="modal-footer">
                        <button type="button" class="btn btn-primary">Thêm</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="table-responsive">
                  <table class="table text-start align-middle table-bordered table-hover mb-0">
                    <thead>
                      <tr class="text-dark">
                        <th scope="col" class="fw-bold text-uppercase">Ngày tạo</th>
                        <th scope="col" class="fw-bold text-uppercase">Tên</th>
                        <th scope="col" class="fw-bold text-uppercase">Mô tả</th>
                        <th style="width: 15%" scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>cat.created_at.slice(0, 10)</td>
                        <td>cat.name</td>
                        <td>cat.description</td>
                        <td class="d-flex justify-content-center">
                          <button
                            class="btn btn-sm"
                            style="background-color: #fbbfc0; color: white"
                            data-bs-toggle="modal"
                            data-bs-target="#editCategoryModal"
                          >
                            <i class="fa-regular fa-pen-to-square"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="bg-light text-center rounded p-4 w-50">
              <div class="d-flex align-items-center justify-content-between mb-4">
                <h5 class="mb-0">Danh sách các thương hiệu</h5>
              </div>
              <button
                type="button"
                class="btn btn-dark fw-bold w-100"
                data-bs-toggle="modal"
                data-bs-target="#addBrandModal"
              >
                <i class="fa-solid fa-plus"></i>
              </button>

              <!-- Modal -->
              <div
                class="modal fade"
                id="addBrandModal"
                tabindex="-1"
                aria-labelledby="addBrandModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog-centered modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="addBrandModalLabel">Thêm thương hiệu</h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body text-start d-flex">
                      <div class="d-flex flex-column w-100 justify-content-between mb-3">
                        <div class="w-100">
                          <label class="" for="comp-name">Tên thương hiệu:</label>
                          <input class="w-100 form-control" type="text" id="comp-name" required />
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                        Thêm
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="modal fade"
                id="editBrandModal"
                tabindex="-1"
                aria-labelledby="editBrandModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog-centered modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="editBrandModalLabel">Chỉnh sửa thương hiệu</h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body text-start d-flex">
                      <div class="d-flex w-100 justify-content-between mb-3">
                        <label for="brand-name-edit">Tên thương hiệu:</label>
                        <input
                          class="w-75 form-control"
                          type="text"
                          id="brand-name-edit"
                          required
                        />
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-primary fw-bold"
                        data-bs-dismiss="modal"
                        style="background-color: #fbbfc0; border: 0px"
                      >
                        Cập nhật
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="table-responsive">
                <table class="table text-start align-middle table-bordered table-hover mb-0">
                  <thead>
                    <tr class="text-dark">
                      <th class="fw-bold text-uppercase" scope="col">Ngày tạo</th>
                      <th class="fw-bold text-uppercase" scope="col">Tên</th>
                      <th style="width: 15%" scope="col"></th>
                    </tr>
                  </thead>
                  <tbody class="w-100">
                    <tr>
                      <td>brand.created_at.slice(0, 10)</td>
                      <td class="text-capitalize">brand.name</td>

                      <td class="d-flex justify-content-center">
                        <button
                          class="btn btn-sm"
                          style="background-color: #fbbfc0; color: white"
                          data-bs-toggle="modal"
                          data-bs-target="#editBrandModal"
                        >
                          <i class="fa-regular fa-pen-to-square"></i>
                        </button>

                        <button
                          type="button"
                          class="btn btn-danger"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteBrand"
                        >
                          <i class="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div
                  class="w-100 d-flex justify-content-center align-items-center text-center mt-2"
                >
                  <button
                    class="btn moreUser w-50"
                    style="border-radius: 50px; border: 2px solid black"
                  >
                    Xem thêm >>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="d-flex">
            <div class="bg-light text-center rounded p-4 w-50">
              <div class="d-flex align-items-center justify-content-between mb-4">
                <h5 class="mb-0">Danh sách các thành phần</h5>
              </div>
              <button
                type="button"
                class="btn btn-dark fw-bold w-100"
                data-bs-toggle="modal"
                data-bs-target="#addCompModal"
              >
                <i class="fa-solid fa-plus"></i>
              </button>

              <!-- Modal -->
              <div
                class="modal fade"
                id="addCompModal"
                tabindex="-1"
                aria-labelledby="addCompModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog-centered modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="addCompModalLabel">Thêm thành phần</h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body text-start d-flex">
                      <div class="d-flex flex-column w-100 justify-content-between mb-3">
                        <div class="w-100">
                          <label class="" for="comp-name">Tên thành phần:</label>
                          <input class="w-100 form-control" type="text" id="comp-name" required />
                        </div>

                        <div class="w-100 mt-3">
                          <label for="comp-description">Mô tả thành phần:</label>
                          <input
                            class="w-100 form-control"
                            type="text"
                            id="comp-description"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                        Thêm
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="modal fade"
                id="editCompModal"
                tabindex="-1"
                aria-labelledby="editCompModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog-centered modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="editCompModalLabel">Chỉnh sửa thành phần</h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body text-start d-flex">
                      <div class="w-100 mb-3">
                        <label for="comp-name-edit">Tên thành phần:</label>
                        <input class="w-75 form-control" type="text" id="comp-name-edit" required />

                        <label for="comp-desc-edit">Mô tả:</label>
                        <textarea
                          class="form-control"
                          type="text"
                          id="comp-desc-edit"
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-primary fw-bold"
                        data-bs-dismiss="modal"
                        style="background-color: #fbbfc0; border: 0px"
                      >
                        Cập nhật
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="table-responsive">
                <table class="table text-start align-middle table-bordered table-hover mb-0">
                  <thead>
                    <tr class="text-dark">
                      <th class="fw-bold text-uppercase" style="vertical-align: middle" scope="col">
                        Ngày tạo
                      </th>
                      <th class="fw-bold text-uppercase" style="vertical-align: middle" scope="col">
                        Tên
                      </th>
                      <th class="fw-bold text-uppercase" style="vertical-align: middle" scope="col">
                        Mô tả
                      </th>
                      <th style="width: 15%" scope="col"></th>
                    </tr>
                  </thead>
                  <tbody class="w-100">
                    <tr>
                      <td>component.created_at.slice(0, 10)</td>
                      <td class="text-capitalize">component.name</td>
                      <td class="">component.description</td>

                      <td class="d-flex justify-content-center">
                        <button
                          class="btn btn-sm"
                          style="background-color: #fbbfc0; color: white"
                          data-bs-toggle="modal"
                          data-bs-target="#editCompModal"
                        >
                          <i class="fa-regular fa-pen-to-square"></i>
                        </button>

                        <button
                          type="button"
                          class="btn btn-danger"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteComp"
                        >
                          <i class="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div
                  class="w-100 d-flex justify-content-center align-items-center text-center mt-2"
                >
                  <button
                    class="btn moreUser w-50"
                    style="border-radius: 50px; border: 2px solid black"
                  >
                    Xem thêm >>
                  </button>
                </div>
              </div>
            </div>
            <div class="bg-light text-center rounded p-4 w-50">
              <div class="d-flex align-items-center justify-content-between mb-4">
                <h5 class="mb-0">Danh sách các nhãn dán</h5>
              </div>
              <button
                type="button"
                class="btn btn-dark fw-bold w-100"
                data-bs-toggle="modal"
                data-bs-target="#addTagModal"
              >
                <i class="fa-solid fa-plus"></i>
              </button>

              <!-- Modal -->
              <div
                class="modal fade"
                id="addTagModal"
                tabindex="-1"
                aria-labelledby="addTagModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog-centered modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="addTagModalLabel">Thêm nhãn</h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body text-start d-flex">
                      <div class="d-flex w-100 justify-content-between mb-3">
                        <label for="tag-name">Tên nhãn:</label>
                        <input class="w-75 form-control" type="text" id="tag-name" required />
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                        Thêm
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="table-responsive">
                <table class="table text-start align-middle table-bordered table-hover mb-0">
                  <thead>
                    <tr class="text-dark" style="vertical-align: middle">
                      <th class="fw-bold text-uppercase" style="width: 15%" scope="col">
                        Ngày tạo
                      </th>
                      <th class="fw-bold text-uppercase" scope="col">Tên</th>
                      <th style="width: 15%" scope="col"></th>
                    </tr>
                  </thead>
                  <tbody class="w-100">
                    <tr>
                      <td>tag.created_at.slice(0, 10)</td>
                      <td class="text-capitalize">tag.name</td>
                      <td class="d-flex justify-content-center">
                        <button
                          class="btn btn-sm"
                          style="background-color: #fbbfc0; color: white"
                          data-bs-toggle="modal"
                          data-bs-target="#editTagModal"
                        >
                          <i class="fa-regular fa-pen-to-square"></i>
                        </button>

                        <button
                          type="button"
                          class="btn btn-danger"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteTag"
                        >
                          <i class="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div
                  class="w-100 d-flex justify-content-center align-items-center text-center mt-2"
                >
                  <button
                    class="btn moreUser w-50"
                    style="border-radius: 50px; border: 2px solid black"
                  >
                    Xem thêm >>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="modal fade"
          id="editTagModal"
          tabindex="-1"
          aria-labelledby="editTagModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog-centered modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="editTagModalLabel">Chỉnh sửa nhãn</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body text-start d-flex">
                <div class="d-flex w-100 justify-content-between mb-3">
                  <label for="tag-name-edit">Tên nhãn:</label>
                  <input class="w-75 form-control" type="text" id="tag-name-edit" required />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary fw-bold"
                  data-bs-dismiss="modal"
                  style="background-color: #fbbfc0; border: 0px"
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          class="bg-light rounded tab-pane fade show mt-4"
          id="users"
          role="tabpanel"
          aria-labelledby="users-tab"
          style="width: 80vw"
        >
          <h2 class="p-4">Các người dùng trong hệ thống</h2>
          <div class="container d-flex justify-content-center text-center ">
            <div class="w-100">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col" class="fw-bold text-uppercase">ID</th>
                    <th scope="col" class="fw-bold text-uppercase">Ảnh</th>
                    <th scope="col" class="fw-bold text-uppercase">Tên</th>
                    <th scope="col" class="fw-bold text-uppercase">Email</th>
                    <th scope="col" class="fw-bold text-uppercase">Vai trò</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in users" :key="user?.id" class="text-center">
                    <th scope="row">{{ user?.id }}</th>
                    <td>
                      <img
                        v-if="user?.avatar != null && user?.avatar != ''"
                        :src="user?.avatar"
                        class="rounded-circle me-3"
                        style="height: 60px; width: 60px; border-radius: 50%; object-fit: cover"
                        alt="Profile Image"
                      />
                      <img
                        v-else
                        src="https://placehold.co/60x60"
                        alt=""
                        class="img-fluid rounded-circle me-3"
                      />
                    </td>
                    <td>{{ user?.fullname }}</td>
                    <td>{{ user?.email }}</td>
                    <td v-if="user?.role == 'admin'">Admin</td>
                    <td v-if="user?.role == 'owner'">Chủ xe</td>
                    <td v-if="user?.role == 'member'">Người dùng</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div
          class="bg-light rounded tab-pane fade mt-4"
          id="order"
          role="tabpanel"
          aria-labelledby="order-tab"
          style="width: 80vw"
        >
          <h2 class="ms-4 pt-4">Danh sách các yêu cầu thuê xe</h2>
          <!-- <div class="container justify-content-center align-items-center">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home"
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                  style="color: black"
                >
                  Tất cả
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="contact-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#contact"
                  type="button"
                  role="tab"
                  aria-controls="contact"
                  aria-selected="false"
                  style="color: black"
                >
                  Chờ xác nhận
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                  style="color: black"
                >
                  Chờ thanh toán
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="contact-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#contact"
                  type="button"
                  role="tab"
                  aria-controls="contact"
                  aria-selected="false"
                  style="color: black"
                >
                  Đang chờ giao hàng
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="contact-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#contact"
                  type="button"
                  role="tab"
                  aria-controls="contact"
                  aria-selected="false"
                  style="color: black"
                >
                  Đang vận chuyển
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="contact-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#contact"
                  type="button"
                  role="tab"
                  aria-controls="contact"
                  aria-selected="false"
                  style="color: black"
                >
                  Thành công
                </button>
              </li>

              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="contact-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#contact"
                  type="button"
                  role="tab"
                  aria-controls="contact"
                  aria-selected="false"
                  style="color: black"
                >
                  Đã hủy
                </button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent"></div>
          </div> -->

          <div class="bg-light text-center rounded ps-4 pe-4 pb-4">
            <div class="table-responsive">
              <table class="table text-start align-middle table-bordered table-hover mb-0">
                <thead>
                  <tr class="text-dark">
                    <th style="vertical-align: middle" class="fw-bold text-uppercase" scope="col">
                      Ngày yêu cầu
                    </th>
                    <th style="vertical-align: middle" class="fw-bold text-uppercase" scope="col">
                      Khách hàng
                    </th>
                    <th style="vertical-align: middle" class="fw-bold text-uppercase" scope="col">
                      Xe
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
                    <td>{{ carRequest.fullname }}</td>
                    <td>
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

              <!-- Modal -->
              <div
                class="modal fade"
                id="detailOrder"
                tabindex="-1"
                aria-labelledby="detailOrderLabel"
                aria-hidden="true"
              >
                <div id="orderDetailModal" class="modal-dialog modal-xl modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h4 class="modal-title" id="detailOrderLabel">Chi tiết lượt thuê</h4>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="text-start ms-3">
                      <h5>Thông tin vận chuyển</h5>
                      <div class="text-capitalize fw-bold" for="addressShip ">
                        Địa chỉ nhận hàng: <span> choosenUser.billingAddress </span>
                      </div>
                      <div class="d-flex">
                        <div class="me-5">
                          <div class="fw-bold">Tên: <span> choosenUser.name </span></div>
                          <div class="fw-bold">SĐT: <span> choosenUser.phone </span></div>
                        </div>
                        <div></div>
                      </div>
                      <div class="alert alert-danger me-3 fw-bold" role="alert">Chưa xác nhận</div>
                      <div class="alert alert-success me-3 fw-bold text-success" role="alert">
                        Đã xác nhận
                      </div>
                    </div>
                    <div class="modal-body">
                      <div class="table-responsive">
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col" class="h5">Xe</th>
                              <th scope="col">Đơn vị</th>
                              <th scope="col">Số lượng</th>
                              <th scope="col">Giá</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">
                                <div class="d-flex align-items-center">
                                  <img
                                    class="img-fluid rounded-3"
                                    style="width: 120px"
                                    alt="Book"
                                  />
                                  <div class="flex-column ms-4">
                                    <p class="mb-2">
                                      <a
                                        class="linkp fw-bold"
                                        :href="'http://localhost:5173/products/'"
                                      >
                                        orderDetail.productNames[index]
                                      </a>
                                    </p>
                                    <p class="mb-0">orderDetail.typeNames[index]</p>
                                  </div>
                                </div>
                              </th>
                              <td class="align-middle">
                                <p class="mb-0" style="font-weight: 500">Thỏi</p>
                              </td>
                              <td class="align-middle">
                                <div class="d-flex flex-row justify-content-center">
                                  <input
                                    disabled
                                    id="form1"
                                    min="0"
                                    name="quantity"
                                    type="number"
                                    class="form-control form-control-sm"
                                    style="width: 50px"
                                  />
                                </div>
                              </td>
                              <td class="align-middle">
                                <p class="mb-0" style="font-weight: 500">
                                  orderDetail.sellingPrices[index].toLocaleString("it-IT", { style:
                                  "currency", currency: "VND", })
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="">
                        <div class="d-flex justify-content-end">
                          <div class="row w-50 text-end">
                            <div class="col-lg-4 col-xl-3 w-100">
                              <div class="d-flex justify-content-between" style="font-weight: 500">
                                <p class="mb-2">Tổng giá:</p>
                                <p class="mb-2">
                                  (orderDetail.totalPrice).toLocaleString("it-IT", { style:
                                  "currency", currency: "VND", })
                                </p>
                              </div>

                              <div class="d-flex justify-content-between" style="font-weight: 500">
                                <p class="mb-0">Phí vận chuyển:</p>
                                <p class="mb-0">
                                  (orderDetail.shippingPrice).toLocaleString("it-IT", { style:
                                  "currency", currency: "VND", })
                                </p>
                              </div>

                              <hr class="w-100" />

                              <div class="d-flex justify-content-between" style="font-weight: 500">
                                <p class="mb-0">Tổng cộng:</p>
                                <p class="mb-0 text-danger fw-bold">
                                  (orderDetail.totalPrice +
                                  orderDetail.shippingPrice).toLocaleString("it-IT", { style:
                                  "currency", currency: "VND", })
                                </p>
                              </div>

                              <div class="d-flex justify-content-between" style="font-weight: 500">
                                <p class="mb-0">Ghi chú:</p>
                                <p class="mb-0">orderDetail.note</p>
                              </div>

                              <div
                                class="d-flex justify-content-between mb-4"
                                style="font-weight: 500"
                              >
                                <p class="mb-0">Tình trạng lượt thuê:</p>
                                <p class="mb-0">orderDetail.shipmentTracking</p>
                              </div>

                              <div class="d-flex text-end justify-content-end">
                                <div class="text-danger fw-bold text-uppercase w-100">
                                  Lượt thuê đã bị hủy
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div class="ms-3 me-3">
                      <h5 class="text-start">Phương thức thanh toán</h5>
                      <div class="d-flex justify-content-between" style="font-weight: 500">
                        <p class="mb-0">Phương thức thanh toán: orderDetail.paymentType</p>
                      </div>

                      <div class="d-flex justify-content-between w-100">
                        <div
                          class="text-success fw-bold alert alert-success text-start w-100"
                          role="alert"
                        >
                          Đã thanh toán
                        </div>
                        <div
                          class="text-success fw-bold alert alert-success text-start w-75"
                          role="alert"
                        >
                          Đã thanh toán
                        </div>

                        <div class="alert alert-danger fw-bold w-75 text-start" role="alert">
                          Chưa thanh toán
                        </div>
                        <div class="alert alert-danger fw-bold w-100 text-start" role="alert">
                          Chưa thanh toán
                        </div>
                        <div class="form-check form-switch ms-2">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            :true-value="1"
                            :false-value="0"
                            id="switchPaid"
                          />
                        </div>
                      </div>

                      <button class="btn btn-dark mb-3">Xác nhận lượt thuê</button>
                      <button class="btn btn-dark mb-3">Xác nhận giao hàng</button>
                      <button disabled class="btn btn-dark mb-3">Đã xác nhận giao hàng</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="editCategoryModal"
      tabindex="-1"
      aria-labelledby="editCategoryModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog-centered modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editCategoryModalLabel">Chỉnh sửa loại xe</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body text-start d-flex flex-column">
            <div class="d-flex w-100 justify-content-between mb-3">
              <label for="cate-name-edit">Tên loại:</label>
              <input class="w-75 form-control" type="text" id="cate-name-edit" required />
            </div>

            <label for="cat-description-edit">Mô tả:</label>

            <textarea class="form-control" name="" id="cat-description-edit"></textarea>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary fw-bold"
              data-bs-dismiss="modal"
              style="background-color: #fbbfc0; border: 0px"
            >
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="editProduct"
      tabindex="-1"
      aria-labelledby="editProductLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog-centered modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editProductLabel">Chỉnh sửa xe</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body text-start d-flex flex-column">
            <div class="w-100 mt-3">
              <form class="w-100 justify-content-between mb-5">
                <div class="">
                  <div class="mb-3 mt-3">
                    <label class="fw-bold" for="selectCategory">Loại xe</label>
                    <select
                      id="selectCategory"
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option>cate.name</option>
                    </select>
                  </div>

                  <div class="mb-3">
                    <label class="fw-bold" for="selectBrand">Nhãn hiệu</label>
                    <select
                      id="selectBrand"
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option>brand.name</option>
                    </select>
                  </div>

                  <!-- Name -->
                  <div class="mb-3">
                    <label for="name" class="fw-bold form-label">Tên (*):</label>
                    <input type="text" class="form-control" id="name" required />
                  </div>

                  <!-- description -->
                  <div class="mb-3">
                    <label for="description" class="fw-bold form-label">Mô tả xe (*):</label>
                    <div class="d-flex align-items-center">
                      <textarea class="form-control" id="description" required></textarea>
                    </div>
                  </div>

                  <div class="d-flex">
                    <div class="mb-3 w-75">
                      <label for="guide" class="fw-bold form-label"
                        >Hướng dẫn sử dụng (viết theo định dạng Bước 1.,Bước 2.,Bước 3., ...)
                        (*):</label
                      >
                      <div class="d-flex align-items-center">
                        <textarea class="form-control" id="guide" required> </textarea>
                      </div>
                    </div>

                    <div class="mb-3 w-25">
                      <label for="unit" class="fw-bold form-label">Đơn vị bán (*):</label>
                      <input type="text" id="unit" class="form-control" required />
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="maintain" class="fw-bold form-label">Bảo quản (*): </label>
                    <div class="d-flex align-items-center">
                      <textarea class="form-control" id="maintain" required> </textarea>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="note" class="fw-bold form-label">Lưu ý khi sử dụng (*):</label>
                    <div class="d-flex align-items-center">
                      <textarea class="form-control" id="note" required> </textarea>
                    </div>
                  </div>

                  <div class="mb-3 d-flex">
                    <div class="d-flex flex-column w-50">
                      <div class="d-flex w-100 mt-1">
                        <div class="w-50">
                          <label for="type" class="fw-bold form-label">Loại:</label>
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
                      </div>
                    </div>

                    <div class="d-flex flex-column w-50 ms-3">
                      <div class="fw-bold mb-2">Chọn nhãn cho xe:</div>
                      <div class="d-flex flex-wrap" id="tag-wrap">
                        <div class="me-2 mb-2">
                          <input
                            type="checkbox"
                            class="btn-check"
                            :id="'tagEdit'"
                            autocomplete="off"
                          />
                          <label
                            class="btn btn-outline-dark"
                            :for="'tagEdit'"
                            style="border-radius: 0px"
                          >
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
                        <input
                          type="checkbox"
                          class="btn-check"
                          :id="'componentEdit'"
                          autocomplete="off"
                        />
                        <label
                          class="btn btn-outline-dark"
                          :for="'componentEdit'"
                          style="border-radius: 0px"
                        >
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
                <!-- Profile Picture -->
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-success p-3"
              style="border-radius: 0px"
              data-bs-dismiss="modal"
            >
              Cập nhật xe
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="addProductModal"
      tabindex="-1"
      aria-labelledby="addProductModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addProductModalLabel">Thêm xe</h5>
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
                <div class="mb-3 mt-3">
                  <label class="fw-bold" for="selectCategory">Loại xe</label>
                  <select
                    id="selectCategory"
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option>cate.name</option>
                  </select>
                </div>

                <div class="mb-3">
                  <label class="fw-bold" for="selectBrand">Thương hiệu</label>
                  <select id="selectBrand" class="form-select" aria-label="Default select example">
                    <option>brand.name</option>
                  </select>
                </div>

                <!-- Name -->
                <div class="mb-3">
                  <label for="name" class="fw-bold form-label">Tên:</label>
                  <input type="text" class="form-control" id="name" required />
                </div>

                <!-- description -->
                <div class="mb-3">
                  <label for="description" class="fw-bold form-label">Mô tả xe:</label>
                  <div class="d-flex align-items-center">
                    <textarea class="form-control" id="description" required></textarea>
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
                        <label for="type" class="fw-bold form-label"
                          >Loại (Ví dụ 50ml, 100ml):</label
                        >
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
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              style="border-radius: 0px"
            >
              Hủy
            </button>
            <button type="submit" class="btn btn-danger" style="border-radius: 0px">Tạo xe</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fa-star {
  color: #f4bb47;
}

</style>
