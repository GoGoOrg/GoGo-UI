<script setup lang="ts">
// No script logic needed for this static layout
</script>
<template>
  <hr />
  <section class="container mt-2">
    <div class="row align-items-center mb-5">
      <div class="col-md-6">
        <h1 class="fw-bold display-5 mb-4">GoGo - Cùng bạn đến mọi hành trình</h1>
      </div>
      <div class="col-md-6">
        <p class="mb-3">
          Mỗi chuyến đi là một hành trình khám phá cuộc sống và thế giới xung quanh, là cơ hội học
          hỏi và chinh phục những điều mới lạ của mỗi cá nhân để trở nên tốt hơn. Do đó, chất lượng
          trải nghiệm của khách hàng là ưu tiên hàng đầu và là nguồn cảm hứng của đội ngũ GOGO.
        </p>
        <p>
          GoGo là nền tảng chia sẻ ô tô, sứ mệnh của chúng tôi không chỉ dừng lại ở việc kết nối chủ
          xe và khách hàng một cách Nhanh chóng - An toàn - Tiện lợi, mà còn hướng đến việc truyền
          cảm hứng KHÁM PHÁ những điều mới lạ đến cộng đồng qua những chuyến đi trên nền tảng của
          chúng tôi.
        </p>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-md-6">
        <img src="/images/map.jpg" alt="Map navigation" class="img-fluid rounded-4 w-100" />
      </div>
      <div class="col-md-6">
        <img
          src="/images/car-dashboard.avif"
          alt="Car dashboard"
          class="img-fluid rounded-4 w-100"
        />
      </div>
    </div>
  </section>

  <section class="container mb-5">
    <div class="row align-items-center">
      <div class="col-lg-6">
        <h2 class="fw-bold display-4 mb-4">Drive. Explore. Inspire</h2>
        <p class="fw-semibold mb-2">
          <strong>Cầm lái</strong> và <strong>Khám phá</strong> thế giới đầy
          <strong>Cảm hứng</strong>.
        </p>
        <p>
          GoGo đặt mục tiêu trở thành cộng đồng người dùng ô tô Văn minh &amp; Uy tín #1 tại Việt
          Nam, nhằm mang lại những giá trị thiết thực cho tất cả những thành viên hướng đến một cuộc
          sống tốt đẹp hơn.
        </p>
        <p>
          Chúng tôi tin rằng mỗi hành trình đều quan trọng, vì vậy đội ngũ và các đối tác của GOGO
          với nhiều kinh nghiệm về lĩnh vực cho thuê xe, công nghệ, bảo hiểm &amp; du lịch sẽ mang
          đến cho hành trình của bạn thêm nhiều trải nghiệm mới lạ, thú vị cùng sự an toàn ở mức cao
          nhất.
        </p>
      </div>

      <div class="col-lg-6">
        <img
          src="/images/drive-explore.avif"
          alt="Drive Explore Inspire"
          class="img-fluid rounded-4 w-100"
        />
      </div>
    </div>
  </section>

  <section class="container my-5">
    <h2 class="text-center fw-bold display-5 mb-5">Bắt đầu ngay hôm nay</h2>

    <div class="row g-4">
      <!-- Self-drive card -->
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
</template>

<style scoped>
/* Optional: Adjust rounded corners or add custom spacing here if needed */
</style>
