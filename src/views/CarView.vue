<script setup lang="ts">
</script>

<template>
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
                            <div>5.0</div>
                            <div>100+ chuyến</div>
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
    </div>

    <!-- Right Column -->
    <div class="col-4 d-flex flex-column justify-content-between">
     
    </div>
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
</style>