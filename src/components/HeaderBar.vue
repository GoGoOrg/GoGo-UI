<script setup lang="ts">

</script>

<template>
    <div class="d-flex justify-between w-100 mt-3 container">
        <div class="flex-grow-1 fw-bold">MIOTO</div>

        <div class="d-flex">
            <div class="p-3 fw-bold">Về Mioto</div>
            <div class="p-3 fw-bold">Trở thành chủ xe</div>
            <div class="m-1" style="width:1px; height:50px; background-color:#ccc;"></div>

            <div class="p-3 fw-bold" data-bs-toggle="modal" data-bs-target="#registerModal">Đăng ký</div>

            <!-- register modal -->
            <div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">

                    <div class="modal-body">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        <h1 class="modal-title fs-5 text-center">Đăng ký</h1>

                        <form>
                                <div class="mb-3">
                                    <label for="registerPhoneNumberInput" class="form-label">Số điện thoại</label>
                                    <input type="number" class="form-control" id="registerPhoneNumberInput" aria-describedby="emailHelp">
                                </div>

                                <div class="mb-3">
                                    <label for="registerNameInput" class="form-label">Họ và tên</label>
                                    <input type="text" class="form-control" id="registerNameInput">
                                </div>

                                <div class="mb-3">
                                    <label for="registerPasswordInput" class="form-label">Mật khẩu</label>
                                    <input type="password" class="form-control" id="registerPasswordInput">
                                </div>

                                <div class="mb-3">
                                    <label for="registerPasswordRepeatInput" class="form-label">Lặp lại mật khẩu</label>
                                    <input type="password" class="form-control" id="registerPasswordRepeatInput">
                                </div>

                                <button type="submit" class="btn btn-success w-100 fw-bold p-3">Đăng nhập</button>

                                <div class="text-center mt-2">
                                    <div>Bạn đã là thành viên? <a href="#" class="text-decoration-none text-success fw-bold">Đăng nhập ngay</a></div>
                                </div>
                            </form>
                    </div>
                   
                    </div>
                </div>
            </div>
            
            
            <button type="button" class="btn btn-outline-dark fw-bold" data-bs-toggle="modal" data-bs-target="#loginModal">Đăng nhập</button>
            <!-- login modal -->
            <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">

                        <div class="modal-body">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            <h1 class="modal-title fs-5 text-center">Đăng nhập</h1>

                            <form>
                                <div class="mb-3">
                                    <label for="loginPhoneNumberInput" class="form-label">Số điện thoại</label>
                                    <input type="number" class="form-control" id="loginPhoneNumberInput" aria-describedby="emailHelp">
                                </div>

                                <div class="mb-3">
                                    <label for="loginPasswordInput" class="form-label">Mật khẩu</label>
                                    <input type="password" class="form-control" id="loginPasswordInput">
                                </div>

                                <div class="text-end mb-4">
                                    <a href="#" class="text-decoration-none text-success fw-bold">Quên mật khẩu?</a>
                                </div>

                                <button type="submit" class="btn btn-success w-100 fw-bold p-3">Đăng nhập</button>

                                <div class="text-center mt-2">
                                    <div>Bạn chưa là thành viên? <a href="#" class="text-decoration-none text-success fw-bold">Đăng ký ngay</a></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
