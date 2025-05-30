<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: `https://picsum.photos/seed/${Math.random()}/800/600`,
}))

const carouselConfig = {
  height: 200,
  itemsToShow: 3.5,
  wrapAround: true,
}
</script>


<template>
  <div>
    <div class="container">
      <div class="text-center position-absolute top-50 start-50 translate-middle">
        <h1 class="display-4 fw-bold">
          GoGo - Cùng Bạn Đến Mọi Hành Trình
        </h1>
        <hr class="w-50" style="margin: auto;">
        <h5 class="m-3">

          Trải nghiệm sự khác biệt từ hơn 10.000 xe gia đình đời mới khắp Việt Nam
        </h5>
      </div>

      <div class="mt-3 ">
        <img class="rounded-4" src="https://placehold.co/1290x620" alt="">
      </div>

      <div class="text-center m-5">
        <h1 class="display-5 fw-bold">
          Chương Trình Khuyến Mãi
        </h1>
        <h5 class="m-4">
          Nhận nhiều ưu đãi hấp dẫn từ GoGo
        </h5>
      </div>

      
    </div>
    <div clas="m-5">

      <Carousel v-bind="carouselConfig">
        <Slide v-for="image in images" :key="image.id">
          <img :src="image.url" alt="image" class="carousel-img" />
        </Slide>
        
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>

    <div class="mt-5 pb-5 pt-5 text-center w-100" style="background-color: #F6F6F6;">
      <h1 class="display-6 fw-bold m-5">Xe Dành Cho Bạn</h1>

      <div class="d-flex flex-wrap justify-content-center">

        <div v-for="i in 8" :key="i" class="card shadow-sm rounded-4 m-3" style="width: 20rem; font-size: 14px;">
          <div class="position-relative">
            <img src="https://placehold.co/50x50" class="card-img-top rounded-top-4" alt="BMW">
            <span class="badge bg-warning text-dark position-absolute top-0 start-0 m-2 rounded-pill">
              <i class="fas fa-bolt"></i>
            </span>

            <span class="badge text-bg-success text-white position-absolute bottom-0 end-0 m-2 rounded-pill p-2">
              Giảm 6%
            </span>

          </div>
          <div class="card-body">
            <span class="badge text-bg-secondary mb-2 fs-6">
              <i class="fas fa-map-marker-alt me-1"></i> Giao xe tận nơi
            </span>

            <h6 class="card-title fw-bold mb-2">BMW 520i 2012</h6>

            <div class="d-flex flex-wrap text-muted mb-2">
              <div class="me-3">
                <i class="fas fa-cogs me-1"></i> Số tự động
              </div>
              <div class="me-3">
                <i class="fas fa-user-friends me-1"></i> 4 chỗ
              </div>
              <div>
                <i class="fas fa-gas-pump me-1"></i> Xăng
              </div>
            </div>

            <div class="mb-2 text-muted">
              <i class="fas fa-map-pin me-1"></i> Quận Bình Thạnh, TP. Hồ Chí Minh
            </div>

            <hr>
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
  </div>
</template>


<style>
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
</style>

