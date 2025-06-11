<template>
  <div class="container my-5">
    <div class="hero position-relative">
      <!-- Background image -->
       <div class="rounded-4" style="max-height: 600px; overflow: hidden; ">

         <img
         src="../assets/images/owner-register-image.jpg"
         alt="Hero background"
         class="img-fluid w-100 rounded-4"
         style="max-width: 1800px;  -webkit-transform: scaleX(-1); transform: scaleX(-1); "
         />
        </div>

      <!-- Floating content -->
      <div class="hero-content text-dark bg-white p-4 rounded-4 shadow">
        <h1 class="fw-bold mb-3">
          <span class="text-success">Cho Thuê Xe</span> Trên<br />
          Mioto Để Gia Tăng<br />
          Thu Nhập Đến <br />10tr/Tháng!
        </h1>
        <p class="mb-3">
          Mioto không thu phí khi bạn đăng xe. Bạn chỉ chia sẻ phí dịch vụ với
          Mioto khi có giao dịch cho thuê thành công.
        </p>
        <hr />
        <p class="mb-2">
          <strong>Hotline:</strong> 1900 9217 (T2-T7 9AM–9PM)<br />
          Hoặc để lại tin nhắn cho Mioto qua Fanpage
        </p>
        <button class="btn btn-dark mt-2">Đăng ký ngay</button>
      </div>
    </div>


  </div>


</template>

<script setup lang="ts">
// No logic required for static hero
</script>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  margin: auto;
}

.hero-content {
  position: absolute;
  top: 10%;
  left: 5%;
  max-width: 500px;
}

/* @media (max-width: 768px) {
  .hero-content {
    position: static;
    width: 100%;
    max-width: 100%;
    margin-top: 1rem;
  }
} */
</style>
