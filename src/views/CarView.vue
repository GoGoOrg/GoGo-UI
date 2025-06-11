<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { ref } from 'vue'
import { height, width } from '@fortawesome/free-brands-svg-icons/fa42Group'

const currentSlide = ref(0)

const slideTo = (nextSlide) => (currentSlide.value = nextSlide)

const galleryConfig = {
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

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: `https://picsum.photos/seed/${Math.random()}/1920/1080`,
}))
</script>

<template>
<div>
    <div class="container mt-5">
    <div class="row ">
        <!-- Left Column -->
        <div class="col-8 ">
        <img src="https://placehold.co/900x600" alt="" class="img-fluid rounded-4 w-100 cursor-pointer" />
        </div>

        <!-- Right Column -->
        <div class="col-4 d-flex flex-column justify-content-between">
        <img src="https://placehold.co/400x160" alt="" class="img-fluid rounded-4 cursor-pointer" />
        <img src="https://placehold.co/400x160" alt="" class="img-fluid rounded-4 cursor-pointer" />
        <img src="https://placehold.co/400x160" alt="" class="img-fluid rounded-4 cursor-pointer" />
        </div>
    </div>

    <div class="row mt-5 mb-5">
        <!-- Left column -->
        <div class="col-8 ">
            <!--  Name section -->
            <div class="d-flex flex-row justify-content-between align-items-center">
                <h1 class="display-6 fw-bold">MITSUBISHI XPANDER CROSS 2021</h1>

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
            <hr>
            <div>
                <h4>Đặc điểm</h4>
            </div>

            <!-- description section -->
            <hr>
            <div>
                <h4>Mô tả</h4>
                <pre class="fs-6 text-secondary mt-4">
    - Ngoài các ưu đãi về giá MICARRO còn hổ trợ thêm cho Quý Khách hàng các Chính sách như sau:
    * Hoàn Tiền đổ xăng dư.
    * Miễn phí vượt dưới 1h.
    * Miễn phí vượt dưới 10Km.
    - Sử dụng miễn phí: Nước, Đồ ăn vặt, Khăn giấy có trong gói MICAR KIT khi thuê xe
    - Mitsubishi Xpander là một mẫu MPV 7 chỗ ngồi. Xe được thiết kế hiện đại và thể thao, với đường nét sắc sảo và mạnh mẽ. Xpander trang bị động cơ xăng tiết kiệm nhiên liệu và hiệu suất cao, cung cấp một trải nghiệm lái êm ái và mạnh mẽ. Xe có không gian nội thất rộng rãi và thoải mái, với nhiều tiện nghi hiện đại và tiện lợi cho người sử dụng. Mitsubishi Xpander được xem là một lựa chọn phù hợp cho gia đình hoặc các chuyến đi dài hạn.
                </pre>
            </div>

            <!-- addtional utility section -->
            <hr>
            <div>
                <h4>Các tiện nghi khác</h4>
            </div>

            <!-- location section -->
            <hr>
            <div>
                <h4>Vị trí xe</h4>
            </div>

            <!-- owner section -->
            <hr>
            <div>
                <h4>Chủ xe</h4>

                <!-- avatar  -->
                <div class="d-flex justify-content-between">

                    <div class="d-flex">
                        <img src="https://placehold.co/80x80" alt="" class="img-fluid rounded-circle me-3">
                        <div>
                            <h3>MICARRO</h3>
                            <div class="d-flex justify-content-between">
                                <div class="d-flex align-items-center justify-content-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" style="color: #F6C854;">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                    </svg> 
                                    <div class="ms-1">
                                        5.0
                                    </div>
                                </div>
                                <div class="ms-3 d-flex justify-content-center align-items-center">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-car-front-fill" viewBox="0 0 16 16">
                                            <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17s3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z"/>
                                        </svg>
                                    </div>
                                    <div class="ms-1">
                                        100+ chuyến
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex justify-content-between text-center">
                        <div class="me-4">
                            <div class="fs-5 text-muted">
                                Tỉ lệ phản hồi
                            </div>

                            <div class="fw-bold">100%</div>
                        </div>
                        <div class="me-4">
                            <div class="fs-5 text-muted">
                            Thời gian phản hồi
                            </div>

                            <div class="fw-bold">5 phút</div>
                        </div>
                        <div class="">
                            <div class="fs-5 text-muted">
                                Tỉ lệ đồng ý
                            </div>

                            <div class="fw-bold">100%</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="mt-3 d-flex align-items-center justify-content-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" style="color: #F6C854;">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg> 
                <div class="fw-bold">
                    5.0
                </div>
                <div class="ms-2">
                    • 12 đánh giá
                </div>
            </div>

            
            <div class="d-flex flex-column gap-1">
                <div v-for="i in 2" :key="i" class="mt-3 d-flex justify-content-between align-items-center border rounded p-4">
                    <div class="d-flex">
                        <img src="https://placehold.co/80x80" alt="" class="rounded-circle m-3">
                        <div class="d-flex flex-column align-content-center justify-content-center">

                            <div class="fw-bold mb-2">Nhan Le</div>
                            <div class="d-flex">
                                <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" style="color: #F6C854;">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg> 
                            </div>
                            <div>
                                Xe đời 2024 chạy siêu sướng. Chủ xe dễ thương, vui vẻ.
                            </div>
                        </div>

                    </div>
                    
                    <div class="text-secondary">
                        03/05/2025
                    </div>
                </div>
            </div>
            <div class="text-end mt-2">
                <button class="btn btn-outline-success p-3 fw-bold ">Xem thêm</button>
            </div>
        </div>

        <!-- Right Column -->
        <div class="col-4 d-flex flex-column">
            <div class="d-flex">
                <div class="display-6">856K
                </div>
                <div>/ngày</div>
            </div>
            <hr>
            <div class="d-flex justify-content-between">
                <div>
                    Đơn giá thuê
                </div>
                <div class="fw-bold">
                    975.800 /ngày
                </div>
            </div>
            <div class="d-flex justify-content-between">
                <div>
                    Bảo hiểm thuê xe
                </div>
                <div class="fw-bold">
                    96.050 /ngày
                </div>
            </div>
            <div class="d-flex justify-content-between">
                <div>
                    Tổng cộng
                </div>
                <div class="fw-bold">
                    1.071.850 x 1 ngày
                </div>
            </div>
            <hr>
        </div>


    </div>

</div>

<div class="text-center p-5" style="background-color: #F6F6F6;">
    <h3 class="mb-5">Xe tương tự</h3>
    <Carousel id="gallery" v-bind="galleryConfig" v-model="currentSlide">
        <Slide v-for="image in images" :key="image.id">
            <div class="position-relative text-white  mb-4">
                <img :src="image.url" alt="Gallery Image" class="gallery-image" />

                <div class="card-img-overlay d-flex flex-column justify-content-end mb-5">
                    <h1 class="card-title ">Tên xe</h1>
                    <p class="card-text">Tên chủ sở hữu</p>
                </div>
            </div>
        </Slide>
    </Carousel>

    <Carousel id="thumbnails" v-bind="thumbnailsConfig" v-model="currentSlide">
        <Slide v-for="image in images" :key="image.id">
        <template #default="{ currentIndex, isActive }">
            <div
            :class="['thumbnail', { 'is-active': isActive }]"
            @click="slideTo(currentIndex)"
            >
            <img :src="image.url" alt="Thumbnail Image" class="thumbnail-image " />
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


<style>
pre {
  font-family: Arial, Helvetica, sans-serif;
    white-space: pre-wrap;       /* Since CSS 2.1 */
    white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
    white-space: -pre-wrap;      /* Opera 4-6 */
    white-space: -o-pre-wrap;    /* Opera 7 */
    word-wrap: break-word;       /* Internet Explorer 5.5+ */
}

:root {
  background-color: #242424;
}

.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}
.thumbnail-image{
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
</style>