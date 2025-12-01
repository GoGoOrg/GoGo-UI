<script setup lang="ts">
import 'vue3-carousel/carousel.css'
import { onMounted, ref } from 'vue'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import type { Car } from '@/types/car'
import carServices from '@/services/car.services'
import CarCardComponent from '@/components/CarCardComponent.vue'
import SearchBarComponent from '@/components/SearchBarComponent.vue'

import { useRouter } from 'vue-router'
const router = useRouter()

const images = [
  {
    id: 1,
    url: '/images/offer1-home.jpg',
    contents: [
      '🏝 Mùa hè là mùa của những chuyến đi. Lên lịch khám phá những miền đất mới, mở ra những trải nghiệm mới.',
      'Tận hưởng chuyến đi nghỉ dưỡng mùa hè với xế êm, ngồi điều hòa mát lạnh, bon bon qua từng chặng đường.',
      '✨ Nhập mã HERUCRO - nhận ngay ưu đãi 140k, áp dụng cho chuyến đi ngày 04/07 - 06/07/2025, và thanh toán giữ chỗ sớm ngày 02/07/2025.',
      '🚗 Đặt xe đúng ý, du hè mê ly. Mở app đặt ngay!',
    ],
    title: '🌞 Hè đến rồi! Lên lịch khám phá muôn nơi với ưu đãi 140k',
  },
  {
    id: 2,
    url: '/images/offer2-home.jpg',
    contents: [
      '🌞 Hè đến rồi, cả nhà mình định đi đâu?',
      'Dù ngắn hay dài, hành trình nào cũng thêm ý nghĩa khi có gia đình bên cạnh. Khám phá mọi miền với xe tự lái riêng tư - thoải mái dừng chân, lưu giữ từng khoảnh khắc.',
      '🎈Hè đi chơi xa, nhà ta thêm gần. GoGo tặng bạn ưu đãi 120k - nhập mã MI796, áp dụng cho chuyến đi 27/06 - 29/06/2025, đặt cọc trước 25/06/2025.',
      '🚗 Lên lịch đi ngay!',
    ],
    title: '🚗 Tận hưởng chuyến đi cùng gia đình với ưu đãi 120k - nhập mã MI796',
  },
  {
    id: 3,
    url: '/images/offer3-home.jpg',
    contents: [
      '🌞 Hè sang nắng gọi, là thời điểm lý tưởng để lên kế hoạch chu du muôn nơi!',
      'Có xe riêng đồng hành, chủ động trên từng điểm đến, lưu giữ trọn vẹn những khoảnh khắc trên mọi cung đường.',
      '🚗 Tận hưởng chuyến đi đầy hứng khởi với ưu đãi 8% (tối đa 80k) - nhập mã VUIHE, áp dụng đến hết ngày 30/06/2025.',
      '📅 Lên lịch đi ngay!',
    ],
    title: '✨ Du lịch giải nhiệt mùa hè - Nhận ngay ưu đãi 8%',
  },
]

const carouselConfig = {
  height: 300,
  itemsToShow: 3,
  wrapAround: true,
}

const featuredLocations = [
  {
    name: 'TP Hồ Chí Minh',
    image:
      'https://images.unsplash.com/photo-1602479185069-cf2cfc4c463f?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    vehicles: '5000+ xe',
  },
  {
    name: 'Hà Nội',
    image:
      'https://images.unsplash.com/photo-1676019266474-3538f3f19e6b?q=80&w=2446&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    vehicles: '2500+ xe',
  },
  {
    name: 'Đà Nẵng',
    image:
      'https://images.unsplash.com/photo-1716903197952-440ea3233ba3?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    vehicles: '500+ xe',
  },
  {
    name: 'Cần thơ',
    image:
      'https://plus.unsplash.com/premium_photo-1693237310410-75528c5d5826?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    vehicles: '500+ xe',
  },
]

const airportDeliveries = [
  {
    name: 'Tân Sơn Nhất',
    image: 'https://placehold.co/60',
    vehicles: '2000+ xe',
  },
  {
    name: 'Ga T3 (TSN)',
    image: 'https://placehold.co/60',
    vehicles: '2000+ xe',
  },
  {
    name: 'Nội Bài',
    image: 'https://placehold.co/60',
    vehicles: '200+ xe',
  },
  {
    name: 'Đà Nẵng',
    image: 'https://placehold.co/60',
    vehicles: '100+ xe',
  },
]

const cars = ref<Partial<Car>[]>([
  {
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
    createdat: '',
    updatedat: '',
    deletedat: null,
  },
])

const choosenImage = ref({ id: 0, url: '', contents: [], title: '' })
async function addDataToModal(id: any) {
  choosenImage.value = id
}
onMounted(async () => {
  try {
    let respCars = await carServices.getAll()
    cars.value = respCars.data.cars
  } catch (error) {}
})
</script>

<template>
  <div>
    <div class="container">
      <div class="position-relative mt-3 rounded-4 overflow-hidden" style="max-height: 600px">
        <!-- Background image -->
        <img
          src="/images/wallpaper.jpg"
          class="img-fluid w-100 h-100 object-fit-cover"
          alt="Wallpaper"
        />

        <!-- Dark overlay -->
        <div
          class="position-absolute top-0 start-0 w-100 h-100"
          style="background-color: rgba(0, 0, 0, 0.5)"
        ></div>

        <!-- Text content -->
        <div class="position-absolute top-50 start-50 translate-middle text-center text-white px-3">
          <h1 class="display-4 fw-bold mb-3">
            GoGo - Cùng Bạn Đến Mọi
            <span>Hành Trình</span>
          </h1>
          <hr class="w-50 mx-auto" />
          <h5 class="mt-3">
            Trải nghiệm sự khác biệt từ hơn 10.000 xe gia đình đời mới khắp Việt Nam
          </h5>
        </div>

        <div
          class="search-container-main w-50 mt-5 position-absolute bottom-0 start-50 translate-middle"
        >
          <SearchBarComponent></SearchBarComponent>
        </div>
      </div>

      <div class="text-center m-5">
        <h1 class="display-5 fw-bold">Chương Trình Khuyến Mãi</h1>
        <h5 class="m-4">Nhận nhiều ưu đãi hấp dẫn từ GoGo</h5>
      </div>
    </div>
    <div class="m-5">
      <Carousel v-bind="carouselConfig">
        <Slide v-for="image in images" :key="image.id">
          <img
            :src="image.url"
            alt="image"
            class="carousel-img"
            data-bs-toggle="modal"
            data-bs-target="#offerModal"
            @click="addDataToModal(image)"
          />
        </Slide>

        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>

    <!-- Offer Modal -->
    <div
      class="modal fade"
      id="offerModal"
      tabindex="-1"
      aria-labelledby="offerModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <div class="text-end">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <img :src="choosenImage.url" alt="" class="img-fluid w-100 mt-3" />
            <div class="p-5 pt-4">
              <h4 class="text-center mb-3">
                {{ choosenImage.title }}
              </h4>
              <div v-for="content in choosenImage.contents" :key="content">
                {{ content }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-5 pb-5 pt-5 text-center w-100" style="background-color: #f6f6f6">
      <h1 class="display-6 fw-bold">Xe Dành Cho Bạn</h1>

      <div class="d-flex flex-wrap justify-content-center">
        <CarCardComponent v-for="car in cars" :car="car"></CarCardComponent>
      </div>

      <RouterLink class="text-decoration-none" :to="'/hire'">
        <button class="btn btn-outline-success fw-bold p-4">Xem tất cả</button>
      </RouterLink>
    </div>

    <div class="container py-5">
      <h2 class="text-center fw-bold mb-4">Địa Điểm Nổi Bật</h2>
      <div class="d-flex gap-3 justify-content-center">
        <a
          :href="'/city/' + location.name"
          v-for="location in featuredLocations"
          :key="location.name"
          class="card-city card position-relative text-white flex-shrink-0"
          style="min-width: 250px; border-radius: 20px; overflow: hidden"
        >
          <img
            :src="location.image"
            class="card-img"
            alt="..."
            style="height: 300px; object-fit: cover"
          />
          <div class="card-img-overlay d-flex flex-column justify-content-end">
            <h5 class="card-title card-title-city">{{ location.name }}</h5>
            <p class="card-text cart-text-city small">{{ location.vehicles }}</p>
          </div>
        </a>
      </div>
    </div>
  </div>

  <section class="container my-5">
    <h2 class="text-center fw-bold display-5 mb-5">Dịch vụ của GoGo</h2>

    <div class="row g-4">
      <div class="col-md-6">
        <div class="position-relative rounded-4 overflow-hidden" style="aspect-ratio: 4/3">
          <img
            src="/images/start-now-1.jpg"
            alt="Tự lái"
            class="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
          />
          <div
            class="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-4"
            style="background: rgba(0, 0, 0, 0.4); color: #fff"
          >
            <div>
              <h3 class="fw-bold">Xe đã sẵn sàng.<br />Bắt đầu hành trình ngay!</h3>

              <p class="mb-3">
                Tự tay cầm lái chiếc xe bạn yêu thích cho hành trình thêm hứng khởi.
              </p>
              <RouterLink class="text-decoration-none" :to="'/hire'">
                <button class="btn btn-success fw-semibold px-4">Thuê xe tự lái</button>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <!-- With-driver card -->
      <div class="col-md-6">
        <div class="position-relative rounded-4 overflow-hidden" style="aspect-ratio: 4/3">
          <img
            src="/images/start-now-2.avif"
            alt="Có tài xế"
            class="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
          />
          <div
            class="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-4"
            style="background: rgba(0, 0, 0, 0.4); color: #fff"
          >
            <div>
              <h3 class="fw-bold">Tài xế của bạn đã đến!</h3>

              <p class="mb-3">Chuyến đi thêm thú vị cùng các bác tài 5★ trên GoGo.</p>

              <RouterLink class="text-decoration-none" :to="'/hire'">
                <button class="btn btn-success fw-semibold px-4">Thuê xe có tài xế</button>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="container mt-5 mb-5 pb-5 pt-5 text-center">
    <h1 class="fw-bold">Hướng Dẫn Thuê Xe</h1>
    <p class="mb-5 fs-5">
      Chỉ với 4 bước đơn giản để trải nghiệm thuê xe Mioto một cách nhanh chóng
    </p>

    <div class="row g-4">
      <div class="col-6 col-md-3">
        <div class="d-flex flex-column align-items-center">
          <img
            src="/images/homepage-step1.svg"
            style="max-width: 200px; max-height: 200px"
            alt="Đặt xe"
            class="img-fluid mb-3"
          />

          <div class="d-flex fs-5 text-start" style="max-width: 200px">
            <p class="fw-bold text-success me-2">01</p>
            <p class="fw-bold">Đặt xe trên app/web GoGo</p>
          </div>
        </div>
      </div>

      <div class="col-6 col-md-3">
        <div class="d-flex flex-column align-items-center">
          <img
            src="/images/homepage-step2.svg"
            style="max-width: 200px; max-height: 200px"
            alt="Nhận xe"
            class="img-fluid mb-3"
          />

          <div class="d-flex fs-5 text-start" style="max-width: 200px">
            <p class="fw-bold text-success me-2">02</p>
            <p class="fw-bold">Nhận xe</p>
          </div>
        </div>
      </div>

      <div class="col-6 col-md-3">
        <div class="d-flex flex-column align-items-center">
          <img
            src="/images/homepage-step3.svg"
            style="max-width: 200px; max-height: 200px"
            alt="Bắt đầu hành trình"
            class="img-fluid mb-3"
          />

          <div class="d-flex fs-5 text-start" style="max-width: 200px">
            <p class="fw-bold text-success me-2">03</p>
            <p class="fw-bold">Bắt đầu hành trình</p>
          </div>
        </div>
      </div>

      <div class="col-6 col-md-3">
        <div class="d-flex flex-column align-items-center">
          <img
            src="/images/homepage-step4.svg"
            style="max-width: 200px; max-height: 200px"
            alt="Trả xe & kết thúc chuyến đi"
            class="img-fluid mb-3"
          />

          <div class="d-flex fs-5 text-start" style="max-width: 200px">
            <p class="fw-bold text-success me-2">04</p>
            <p class="fw-bold">Trả xe & kết thúc chuyến đi</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container p-5 bg-light rounded-4">
    <div class="row align-items-center">
      <div class="col-md-6 mb-4 mb-md-0">
        <img
          src="/images/about-us-homepage.jpg"
          alt="Car rental"
          class="img-fluid rounded-4 shadow-sm"
        />
      </div>
      <div class="col-md-6 text-center">
        <div class="mb-3">
          <i class="bi bi-car-front display-5 text-success"></i>
        </div>
        <h1 class="fw-bold mb-3">Bạn muốn biết thêm về GoGo?</h1>
        <p class="mb-4">
          Mioto kết nối khách hàng có nhu cầu thuê xe với hàng ngàn chủ xe ô tô ở TPHCM, Hà Nội &
          các tỉnh thành khác. Mioto hướng đến việc xây dựng cộng đồng người dùng ô tô văn minh & uy
          tín tại Việt Nam.
        </p>
        <RouterLink to="/about">
          <button class="btn btn-success pe-5 ps-5 pt-3 pb-3 fw-bold">Tìm hiểu thêm</button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
:root {
  --carousel-transition: 300ms;
  --carousel-opacity-inactive: 0.7;
  --carousel-opacity-active: 1;
  --carousel-opacity-near: 0.9;

  background-color: #242424;
}

.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

.carousel-img {
  cursor: pointer;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition:
    opacity var(--carousel-transition),
    transform var(--carousel-transition);
}

.carousel.is-dragging .carousel__slide {
  transition:
    opacity var(--carousel-transition),
    transform var(--carousel-transition);
}

.carousel__slide {
  opacity: var(--carousel-opacity-inactive);
  transform: translateX(10px) rotateY(-12deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: var(--carousel-opacity-near);
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: var(--carousel-opacity-active);
  transform: rotateY(0) scale(1);
}

.carousel__slide--next {
  opacity: var(--carousel-opacity-near);
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--next ~ .carousel__slide {
  opacity: var(--carousel-opacity-inactive);
  transform: translateX(-10px) rotateY(12deg) scale(0.9);
}

.card-title-city {
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
}
.card-text-city {
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
}
.card-city {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.card-city:hover {
  transform: scale(1.1);
}
</style>
