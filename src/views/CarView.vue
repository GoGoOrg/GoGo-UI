<script setup lang="ts">
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { onMounted, reactive, ref } from 'vue'
import { height, width } from '@fortawesome/free-brands-svg-icons/fa42Group'
import type { Car } from '@/types/car'
import { useRoute, useRouter } from 'vue-router'
import carServices from '@/services/car.services'
import type { CarouselConfig } from 'vue3-carousel'

const router = useRouter()
const route = useRoute()
const id = ref(0)
const currentSlide = ref(0)

const slideTo = (nextSlide: any) => (currentSlide.value = nextSlide)
const selectedOption = ref('pickup')
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

const cars = reactive<Partial<Car>[]>([])

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
  createdat: '',
  updatedat: '',
  deletedat: null,
})

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: `https://picsum.photos/seed/${Math.random()}/1920/1080`,
}))

onMounted(async () => {
  try {
    id.value = Number(route.params.id)

    let respCar = await carServices.getOne(id.value)
    Object.assign(car, respCar.data.car[0])

    let respCars = await carServices.getAll()
    cars.push(...respCars.data.cars)

    console.log(cars)
  } catch (error) {}
})
</script>

<template>
  <div>
    <div class="container mt-5">
      <div class="row" v-if="car.images && car.images.length > 0">
        <!-- Left Column -->
        <div class="col-8">
          <img :src="car.images[0]" alt="" class="img-fluid rounded-4 w-100 cursor-pointer" />
        </div>

        <!-- Right Column -->
        <div class="col-4 d-flex flex-column justify-content-between">
          <img
            v-for="(img, index) in car.images.slice(1, 4)"
            :key="index"
            :src="img"
            alt=""
            class="img-fluid rounded-4 cursor-pointer"
            style="max-height: 200px; object-fit: cover"
          />
        </div>
      </div>

      <div class="row mt-5 mb-5">
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
          <!-- badge section -->
          <div>
            <span class="badge text-bg-primary me-1 rounded-4 p-2">Primary</span>
            <span class="badge text-bg-success me-1 rounded-4 p-2">Success</span>
            <span class="badge text-bg-warning me-1 rounded-4 p-2">Warning</span>
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
          <div>
            <h4>Các tiện nghi khác</h4>
          </div>

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
                    tin cho GoGo qua email contact@gogo.vn hoặc nhắn tin tại GoGo Fanpage
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- location section -->
          <hr />
          <div>
            <h4>Vị trí xe</h4>
          </div>

          <!-- owner section -->
          <hr />
          <div>
            <h4>Chủ xe</h4>

            <!-- avatar  -->
            <div class="d-flex justify-content-between">
              <div class="d-flex">
                <img
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
            <div class="fw-bold">5.0</div>
            <div class="ms-2">• 12 đánh giá</div>
          </div>

          <div class="d-flex flex-column gap-1">
            <div
              v-for="i in 2"
              :key="i"
              class="mt-3 d-flex justify-content-between align-items-center border rounded p-4"
            >
              <div class="d-flex">
                <img src="https://placehold.co/80x80" alt="" class="rounded-circle m-3" />
                <div class="d-flex flex-column align-content-center justify-content-center">
                  <div class="fw-bold mb-2">Nhan Le</div>
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
                  <div>Xe đời 2024 chạy siêu sướng. Chủ xe dễ thương, vui vẻ.</div>
                </div>
              </div>

              <div class="text-secondary">03/05/2025</div>
            </div>
          </div>
          <div class="text-end mt-2">
            <button class="btn btn-outline-success p-3 fw-bold">Xem thêm</button>
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

            <div class="d-flex justify-content-between">
              <div class="fw-bold">Thành tiền</div>
              <div class="fw-bold">
                {{
                  ((car.price ?? 0) + 96050).toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })
                }}
              </div>
            </div>

            <div class="mt-1">
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

            <button type="button" class="btn btn-success text-uppercase fw-bold p-3 mt-4 w-100">
              Chọn thuê
            </button>

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
          <div class="position-relative text-white mb-4">
            <img
              :src="car.imageurl"
              alt="Gallery Image"
              style="min-height: 700px"
              class="gallery-image"
            />

            <div class="card-img-overlay d-flex flex-column justify-content-end mb-5"></div>
            <h1 class="card-title">
              <a class="text-dark fw-bold" :href="'http://localhost:5173/car/' + car.id" style="">{{
                car.name
              }}</a>
            </h1>
            <p class="card-text text-dark">{{ car.ownername }}</p>
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
</style>
