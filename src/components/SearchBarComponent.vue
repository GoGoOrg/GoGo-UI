<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { City } from '@/types/city'
import cityServices from '@/services/city.services'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

type SearchMode = 'self-drive' | 'with-driver' | 'long-term'
type RouteType = 'city' | 'suburb' | 'one-way'

const dateRange = ref<[Date, Date]>([
  new Date(),
  new Date(Date.now() + 24 * 60 * 60 * 1000), // +1 day
])

const router = useRouter()

const cities = ref<City[]>([])

const activeMode = ref<SearchMode>('self-drive')
const location = ref('Hà Nội')
const startTime = ref('2026-02-06T21:00')
const endTime = ref('2026-02-07T20:00')

// For with-driver mode
const routeType = ref<RouteType>('city')
const pickupLocation = ref('')
const driverStartTime = ref('2026-02-07T08:00')
const driverEndTime = ref('2026-02-07T10:00')

// For long-term mode
const longTermLocation = ref('Hà Nội')

function onSearch() {
  if (activeMode.value === 'self-drive') {
    router.push({
      name: 'search view',
      query: {
        mode: activeMode.value,
        location: location.value,
        start: startTime.value,
        end: endTime.value,
      },
    })
  } else if (activeMode.value === 'with-driver') {
    router.push({
      name: 'search view',
      query: {
        mode: activeMode.value,
        routeType: routeType.value,
        pickup: pickupLocation.value,
        start: driverStartTime.value,
        end: driverEndTime.value,
      },
    })
  } else if (activeMode.value === 'long-term') {
    router.push({
      name: 'search view',
      query: {
        mode: activeMode.value,
        location: longTermLocation.value,
      },
    })
  }
}

onMounted(async () => {
  try {
    const respCities = await cityServices.getAll()
    cities.value = respCities.data.citys
  } catch (err) {
    console.error(err)
  }
})
</script>

<template>
  <div class="search-wrapper">
    <!-- Tabs -->
    <div class="tabs">
      <button :class="{ active: activeMode === 'self-drive' }" @click="activeMode = 'self-drive'">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"
          />
        </svg>
        Xe tự lái
      </button>

      <button :class="{ active: activeMode === 'with-driver' }" @click="activeMode = 'with-driver'">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
          />
          <path
            d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z"
          />
        </svg>
        Xe có tài xế
      </button>

      <button :class="{ active: activeMode === 'long-term' }" @click="activeMode = 'long-term'">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"
          />
          <path
            d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"
          />
        </svg>
        Thuê xe dài hạn
      </button>
    </div>

    <!-- Search Card Container - maintains consistent size -->
    <div class="search-card-container">
      <!-- Self-drive Card -->
      <div v-show="activeMode === 'self-drive'" class="search-card">
        <div class="card-content">
          <div class="fields-row">
            <div class="field">
              <label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
                  />
                </svg>
                Địa điểm
              </label>
              <select v-model="location">
                <option v-for="value in cities" :key="value.id">{{ value.name }}</option>
              </select>
            </div>

            <div class="field time-field">
              <label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"
                  />
                  <path
                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"
                  />
                </svg>
                Thời gian thuê
              </label>
              <div>
                <Datepicker
                  v-model="dateRange"
                  :enable-time-picker="false"
                  range
                  placeholder="Chọn ngày bắt đầu và kết thúc"
                />
              </div>
            </div>

            <button class="search-btn" @click="onSearch">Tìm Xe</button>
          </div>
        </div>
      </div>

      <!-- With-driver Card -->
      <div v-show="activeMode === 'with-driver'" class="search-card">
        <div class="card-content vertical">
          <div class="route-type">
            <label class="section-title">Lộ trình</label>
            <div class="radio-group">
              <label class="radio-option">
                <input type="radio" value="city" v-model="routeType" />
                <span>Nội thành</span>
              </label>
              <label class="radio-option">
                <input type="radio" value="suburb" v-model="routeType" />
                <span>Liên tỉnh</span>
              </label>
              <label class="radio-option">
                <input type="radio" value="one-way" v-model="routeType" />
                <span>Liên tỉnh (1 chiều)</span>
              </label>
            </div>
            <p class="hint">
              Di chuyển nội thành hoặc lân cận, lộ trình tự do.
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1" fill="none" />
                <text x="8" y="11" font-size="10" text-anchor="middle" fill="currentColor">?</text>
              </svg>
            </p>
          </div>

          <div class="fields-row">
            <div class="field">
              <label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
                  />
                </svg>
                Tôi muốn đón tại...
              </label>
              <input type="text" v-model="pickupLocation" placeholder="Nhập địa điểm đón" />
            </div>

            <div class="field time-field">
              <label class="section-title">Thời gian</label>
              <Datepicker
                v-model="dateRange"
                :enable-time-picker="false"
                range
                placeholder="Chọn ngày bắt đầu và kết thúc"
              />
            </div>

            <button class="search-btn" @click="onSearch">Tìm Xe</button>
          </div>
        </div>
      </div>

      <!-- Long-term Card -->
      <div v-show="activeMode === 'long-term'" class="search-card">
        <div class="card-content vertical">
          <div class="fields-row single-row">
            <div class="field">
              <label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
                  />
                </svg>
                Địa điểm áp dụng hiện tại
              </label>
              <div class="location-display">TP. Hồ Chí Minh</div>
            </div>

            <div class="field time-field">
              <label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"
                  />
                  <path
                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"
                  />
                </svg>
                Thời gian
              </label>
              <Datepicker
                v-model="dateRange"
                :enable-time-picker="false"
                range
                placeholder="Chọn ngày bắt đầu và kết thúc"
              />
            </div>

            <button class="search-btn" @click="onSearch">Tìm Xe</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  bottom: 50px;
}

.tabs {
  display: flex;
  background: #fff;
  border-radius: 12px 12px 0 0;
  overflow: hidden;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

.tabs button {
  flex: 1;
  padding: 16px 24px;
  border: none;
  background: #fff;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.tabs button:hover {
  background: #f8f8f8;
}

.tabs button.active {
  background: #5ecb87;
  color: #fff;
}

.tabs button svg {
  opacity: 0.7;
}

.tabs button.active svg {
  opacity: 1;
}

.search-card-container {
  position: relative;
  min-height: 140px;
}

.search-card {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding: 32px;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15);
}

.card-content {
  width: 100%;
}

.card-content.vertical .route-type {
  margin-bottom: 24px;
}

.fields-row {
  display: flex;
  align-items: flex-end;
  gap: 20px;
}

.fields-row.single-row {
  align-items: flex-end;
}

.field {
  flex: 1;
  min-width: 0;
}

.field label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 600;
  color: #666;
}

.field label svg {
  color: #5ecb87;
  flex-shrink: 0;
}

.section-title {
  font-size: 15px;
  font-weight: 700;
  color: #333;
  margin-bottom: 12px;
  display: block;
}

.field select,
.field input[type='text'] {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-sizing: border-box;
  font-weight: 500;
  color: #333;
}

.field select:focus,
.field input:focus {
  outline: none;
  border-color: #5ecb87;
}

.time-field {
  flex: 1.5;
}

.time-display {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  font-size: 15px;
  font-weight: 500;
  color: #666;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  background: #fff;
}

.time-display:hover {
  border-color: #5ecb87;
}

.time-display svg {
  color: #999;
  flex-shrink: 0;
}

.location-display {
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
}

.route-type {
  margin-bottom: 20px;
}

.radio-group {
  display: flex;
  gap: 20px;
  margin-bottom: 12px;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 15px;
  color: #333;
}

.radio-option input[type='radio'] {
  width: 18px;
  height: 18px;
  accent-color: #5ecb87;
  cursor: pointer;
}

.hint {
  font-size: 13px;
  color: #999;
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0;
}

.hint svg {
  color: #999;
  flex-shrink: 0;
}

.search-btn {
  background: #5ecb87;
  color: #fff;
  border: none;
  padding: 14px 32px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(94, 203, 135, 0.3);
  flex-shrink: 0;
  height: fit-content;
}

.search-btn:hover {
  background: #4fb876;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(94, 203, 135, 0.4);
}

.search-btn:active {
  transform: translateY(0);
}
</style>
