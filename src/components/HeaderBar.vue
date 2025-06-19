<script setup lang="ts">
import userServices from '../services/users.services';
import { checkLogin } from '../utilities/utilities';
import { useRouter } from "vue-router";
import { onMounted, ref } from 'vue';
import { useCookies } from "vue3-cookies";
import Swal from "sweetalert2";

const router = useRouter();
const cookies = useCookies();

const repeatPasswordRegister = ref('');
const inputFormRegister = ref({
    username: "",
    password: "",
    fullName: "",
    email: "",
    phone: "",
    role: "member"
});

const inputFormLogin = ref({
    username: "",
    password: ""
});

const currentToken = ref({
    token: "",
    id: "",
});

const showLoginPassword = ref(false);
const showRegisterPassword = ref(false);
const showRepeatPassword = ref(false);

function toggleLoginPassword() {
    showLoginPassword.value = !showLoginPassword.value;
}
function toggleRegisterPassword() {
    showRegisterPassword.value = !showRegisterPassword.value;
}
function toggleRepeatPassword() {
    showRepeatPassword.value = !showRepeatPassword.value;
}

async function onRegister(e: any) {
    e.preventDefault();
    try {
        if (inputFormRegister.value.password !== repeatPasswordRegister.value) {
            Swal.fire({
                icon: "error",
                title: "Lỗi!",
                text: "Mật khẩu nhập lại không khớp.",
            });
            return;
        }

        let resp = await userServices.register(inputFormRegister.value);
        console.log(resp);

        Swal.fire({
            title: "Success!",
            text: "Register success.",
            icon: "success",
            confirmButtonText: "OK",
            timer: 1500
        });

        setTimeout(() => {
            router.push({ name: "login" });
        }, 1500);

    } catch (err: any) {
        Swal.fire({
            title: "Error!",
            text: err || "Đăng ký thất bại!",
            icon: "error",
        });
        console.log(err);
    }
};

async function onLogin(e: any) {
    e.preventDefault();
    try {
        let resp = await userServices.login(inputFormLogin.value);
        console.log(resp);

        cookies.cookies.set("Token", currentToken.value.token);
        Swal.fire({
            title: "Success!",
            text: "Đăng nhập thành công",
            icon: "success",
            confirmButtonText: "OK",
            timer: 1500
        });

        setTimeout(() => {
            router.push({ name: "home" });
        }, 1500);
    } catch (err: any) {
        Swal.fire({
            title: "Lỗi!",
            text: "Sai tài khoản hoặc mật khẩu",
            icon: "error",
            confirmButtonText: "OK",
            timer: 1500
        });
        console.log(err);
    }
};

onMounted(() => {
    if (checkLogin('member')) router.push({ name: "home" });
});
</script>


<template>
    <div class="d-flex justify-between w-100 mt-3 container">
        <RouterLink to="/" class=" d-flex flex-grow-1 fw-bold display-6 justify-content-start align-items-center text-decoration-none text-black">
            <img src="/images/logo.png" class="rounded-4 me-1" alt="" style="max-width: 40px; max-width: 40px;">

            <div>GOGO</div>     
        </RouterLink>

        <div class="d-flex">
            <div class="p-3 fw-bold">
                <RouterLink class="text-decoration-none text-black" to="/about">Về GoGo</RouterLink>                
            </div>
            <div class="p-3 fw-bold">
                <RouterLink class="text-decoration-none text-black" to="/owner/register">Trở thành chủ xe</RouterLink>                

            </div>
            <div class="m-1" style="width:1px; height:50px; background-color:#ccc;"></div>

            <div class="d-flex" v-if="!checkLogin('member') && !checkLogin('admin')">
                <div class="p-3 fw-bold" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#registerModal">
                    Đăng ký
                </div>
                <button type="button" class="btn btn-outline-dark fw-bold" data-bs-toggle="modal" data-bs-target="#loginModal">Đăng nhập</button>
            </div>
            <button v-else type="button" class="btn btn-outline-dark fw-bold" >Đăng xuất</button>

            <!-- register modal -->
            <div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">

                    <div class="modal-body">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                    <h1 class="modal-title fs-5 text-center">Đăng ký</h1>

                        <form @submit="onRegister">
                                <div class="mb-3">
                                    <label for="registerUsernameInput" class="form-label">Tài khoản</label>
                                    <input v-model="inputFormRegister.username" type="text" class="form-control" id="registerUsernameInput" aria-describedby="username" required>
                                </div>

                                <div class="mb-3">
                                    <label for="registerPhoneNumberInput" class="form-label">Số điện thoại</label>
                                    <input v-model="inputFormRegister.phone" type="text" class="form-control" id="registerPhoneNumberInput" aria-describedby="phone" required>
                                </div>

                                <div class="mb-3">
                                    <label for="registerNameInput" class="form-label">Họ và tên</label>
                                    <input v-model="inputFormRegister.fullName" type="text" class="form-control" id="registerNameInput" required>
                                </div>

                                <div class="mb-3">
                                    <label for="registerEmailInput" class="form-label">Email</label>
                                    <input v-model="inputFormRegister.email" type="email" class="form-control" id="registerEmailInput" required>
                                </div>

                                <div class="mb-3 position-relative">
                                    <label for="registerPasswordInput" class="form-label">Mật khẩu</label>
                                    <input
                                        v-model="inputFormRegister.password"
                                        :type="showRegisterPassword ? 'text' : 'password'"
                                        class="form-control"
                                        id="registerPasswordInput"
                                        required
                                    />
                                    <i
                                        :class="['bi', showRegisterPassword ? 'bi-eye' : 'bi-eye-slash']"
                                        class="position-absolute"
                                        style="top: 38px; right: 15px; cursor: pointer;"
                                        @click="toggleRegisterPassword"
                                    ></i>
                                </div>


                                <div class="mb-3 position-relative">
                                    <label for="registerPasswordRepeatInput" class="form-label">Lặp lại mật khẩu</label>
                                    <input
                                        v-model="repeatPasswordRegister"
                                        :type="showRepeatPassword ? 'text' : 'password'"
                                        class="form-control"
                                        id="registerPasswordRepeatInput"
                                        required
                                    />
                                    <i
                                        :class="['bi', showRepeatPassword ? 'bi-eye' : 'bi-eye-slash']"
                                        class="position-absolute"
                                        style="top: 38px; right: 15px; cursor: pointer;"
                                        @click="toggleRepeatPassword"
                                    ></i>
                                </div>



                                <button type="submit" class="btn btn-success w-100 fw-bold p-3">Đăng ký</button>

                                <div class="text-center mt-2">
                                    <div>Bạn đã là thành viên? <a href="#" class="text-decoration-none text-success fw-bold">Đăng nhập ngay</a></div>
                                </div>
                            </form>
                    </div>
                   
                    </div>
                </div>
            </div>
            
            
            <!-- login modal -->
            <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">

                        <div class="modal-body">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            <h1 class="modal-title fs-5 text-center">Đăng nhập</h1>

                            <form @submit="onLogin">
                                <div class="mb-3">
                                    <label for="loginUsernameInput" class="form-label">Tài khoản</label>
                                    <input v-model="inputFormLogin.username" type="text" class="form-control" id="loginUsernameInput" aria-describedby="username" required>
                                </div>

                                <div class="mb-3 position-relative">
                                    <label for="loginPasswordInput" class="form-label">Mật khẩu</label>
                                    <input
                                        v-model="inputFormLogin.password"
                                        :type="showLoginPassword ? 'text' : 'password'"
                                        class="form-control"
                                        id="loginPasswordInput"
                                        required
                                    />
                                    <i
                                        :class="['bi', showLoginPassword ? 'bi-eye' : 'bi-eye-slash']"
                                        class="position-absolute"
                                        style="top: 38px; right: 15px; cursor: pointer;"
                                        @click="toggleLoginPassword"
                                    ></i>
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
