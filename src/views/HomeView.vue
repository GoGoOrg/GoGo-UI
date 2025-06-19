<script setup lang="ts">
import 'vue3-carousel/carousel.css'
import { ref } from 'vue'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

const images = [
  { id: 1, 
    url: '/images/offer1-home.jpg',
    contents: [
      "🏝 Mùa hè là mùa của những chuyến đi. Lên lịch khám phá những miền đất mới, mở ra những trải nghiệm mới.",
      "Tận hưởng chuyến đi nghỉ dưỡng mùa hè với xế êm, ngồi điều hòa mát lạnh, bon bon qua từng chặng đường.",
      "✨ Nhập mã HERUCRO - nhận ngay ưu đãi 140k, áp dụng cho chuyến đi ngày 04/07 - 06/07/2025, và thanh toán giữ chỗ sớm ngày 02/07/2025.",
      "🚗 Đặt xe đúng ý, du hè mê ly. Mở app đặt ngay!"
    ],
    title: "🌞 Hè đến rồi! Lên lịch khám phá muôn nơi với ưu đãi 140k"
  },
  { id: 2, 
    url: '/images/offer2-home.jpg',
    contents: [
      "🌞 Hè đến rồi, cả nhà mình định đi đâu?",
      "Dù ngắn hay dài, hành trình nào cũng thêm ý nghĩa khi có gia đình bên cạnh. Khám phá mọi miền với xe tự lái riêng tư - thoải mái dừng chân, lưu giữ từng khoảnh khắc.",
      "🎈Hè đi chơi xa, nhà ta thêm gần. Mioto tặng bạn ưu đãi 120k - nhập mã MI796, áp dụng cho chuyến đi 27/06 - 29/06/2025, đặt cọc trước 25/06/2025.",
      "🚗 Lên lịch đi ngay!"
    ],
    title: "🚗 Tận hưởng chuyến đi cùng gia đình với ưu đãi 120k - nhập mã MI796"
  },
  { id: 3, 
    url: '/images/offer3-home.jpg',
    contents: [
      "🌞 Hè sang nắng gọi, là thời điểm lý tưởng để lên kế hoạch chu du muôn nơi!",
      "Có xe riêng đồng hành, chủ động trên từng điểm đến, lưu giữ trọn vẹn những khoảnh khắc trên mọi cung đường.",
      "🚗 Tận hưởng chuyến đi đầy hứng khởi với ưu đãi 8% (tối đa 80k) - nhập mã VUIHE, áp dụng đến hết ngày 30/06/2025.",
      "📅 Lên lịch đi ngay!"
    ],
    title: "✨ Du lịch giải nhiệt mùa hè - Nhận ngay ưu đãi 8%"
  },
]

const carouselConfig = {
  height: 300,
  itemsToShow: 3,
  wrapAround: true,
}

const featuredLocations = [
  {
    name: 'TP. Hồ Chí Minh',
    image: 'https://placehold.co/300x300',
    vehicles: '5000+ xe',
  },
  {
    name: 'Hà Nội',
    image: 'https://placehold.co/300x300',
    vehicles: '2500+ xe',
  },
  {
    name: 'Đà Nẵng',
    image: 'https://placehold.co/300x300',
    vehicles: '500+ xe',
  },
  {
    name: 'Bình Dương',
    image: 'https://placehold.co/300x300',
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

const choosenImage = ref({ id: 0, url: '', contents:[], title: ""})
async function addDataToModal(id: any) {
  choosenImage.value = id
}
</script>

<template>
  <div>
    <div class="container">

     <div class="position-relative mt-3 rounded-4 overflow-hidden" style="max-height: 600px;">
        <!-- Background image -->
        <img
          src="/images/wallpaper.jpg"
          class="img-fluid w-100 h-100 object-fit-cover"
          alt="Wallpaper"
        />

        <!-- Dark overlay -->
        <div class="position-absolute top-0 start-0 w-100 h-100" style="background-color: rgba(0,0,0,0.5);"></div>

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
      <h1 class="display-6 fw-bold m-5">Xe Dành Cho Bạn</h1>

      <div class="d-flex flex-wrap justify-content-center">
        <div
          v-for="i in 8"
          :key="i"
          class="card shadow-sm rounded-4 m-3"
          style="width: 20rem; font-size: 14px"
        >
          <div class="position-relative">
            <img src="https://placehold.co/50x50" class="card-img-top rounded-top-4" alt="BMW" />
            <span
              class="badge bg-warning text-dark position-absolute top-0 start-0 m-2 rounded-pill"
            >
              <i class="fas fa-bolt"></i>
            </span>

            <span
              class="badge text-bg-success text-white position-absolute bottom-0 end-0 m-2 rounded-pill p-2"
            >
              Giảm 6%
            </span>
          </div>
          <div class="card-body">
            <span class="badge text-bg-secondary mb-2 fs-6">
              <i class="fas fa-map-marker-alt me-1"></i> Giao xe tận nơi
            </span>

            <RouterLink class="text-decoration-none text-black" to="/car">
              <h6 class="card-title fw-bold mb-2">BMW 520i 2012</h6>
            </RouterLink>

            <div class="d-flex flex-wrap text-muted mb-2">
              <div class="me-3"><i class="fas fa-cogs me-1"></i> Số tự động</div>
              <div class="me-3"><i class="fas fa-user-friends me-1"></i> 4 chỗ</div>
              <div><i class="fas fa-gas-pump me-1"></i> Xăng</div>
            </div>

            <div class="mb-2 text-muted">
              <i class="fas fa-map-pin me-1"></i> Quận Bình Thạnh, TP. Hồ Chí Minh
            </div>

            <hr />
            <div class="d-flex justify-content-between align-items-center">
              <span class="text-muted">Chưa có chuyến</span>
              <div class="text-end">
                <div>
                  <del class="text-muted">2.296K</del>
                  <span class="fw-bold text-success ms-1">2.176K</span>/ngày
                </div>
                <div class="text-primary small">
                  <i class="fas fa-clock me-1"></i> 1.378K gói 4 giờ
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container py-5">
      <h2 class="text-center fw-bold mb-4">Địa Điểm Nổi Bật</h2>
      <div class="d-flex overflow-auto gap-3 justify-content-center">
        <div
          v-for="location in featuredLocations"
          :key="location.name"
          class="card position-relative text-white flex-shrink-0"
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
        </div>
      </div>

      <!-- <div class="mt-5">
      <h4 class="fw-bold mb-3">Giao xe tại sân bay</h4>
      <div class="d-flex align-items-center gap-3">
        <button class="btn btn-light rounded-circle border"><i class="bi bi-chevron-left"></i></button>

        <div class="d-flex gap-3 overflow-auto flex-grow-1">
          <div
            v-for="airport in airportDeliveries"
            :key="airport.name"
            class="bg-light rounded-4 p-3 text-center flex-shrink-0"
            style="min-width: 150px"
          >
            <img
              :src="airport.image"
              alt="airport"
              class="rounded-circle mb-2"
              style="width: 60px; height: 60px; object-fit: cover"
            />
            <div class="fw-semibold">{{ airport.name }}</div>
            <div class="text-muted small">{{ airport.vehicles }}</div>
          </div>
        </div>

        <button class="btn btn-light rounded-circle border"><i class="bi bi-chevron-right"></i></button>
      </div>
    </div> -->
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
</style>
