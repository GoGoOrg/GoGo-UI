<script setup lang="ts">
import { ref } from 'vue'

import type { Car } from '@/types/car'

const activeTab = ref('active')

defineProps<{
  car: Car
}>()
</script>
<style scoped></style>

<template>
  <div class="card text-center mb-5">
    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item">
          <a
            class="nav-link text-black"
            :class="{ active: activeTab === 'active' }"
            href="#"
            @click.prevent="activeTab = 'active'"
          >
            Thông tin xe
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link text-black"
            :class="{ active: activeTab === 'link' }"
            href="#"
            @click.prevent="activeTab = 'link'"
          >
            Người thuê
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link text-black"
            href="#"
            :class="{ active: activeTab === 'calendar' }"
            @click.prevent="activeTab = 'calendar'"
          >
            Lịch
          </a>
        </li>
      </ul>
    </div>

    <div class="card-body">
      <template v-if="activeTab === 'active'">
        <div class="card mb-3">
          <div class="row g-0">
            <div class="col-md-4">
              <img
                src="https://placehold.co/500x500"
                class="img-fluid rounded-start h-100 w-100"
                alt="..."
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  This is a wider card with supporting text below as a natural lead-in to additional
                  content. This content is a little bit longer.
                </p>
                <p class="card-text">
                  <small class="text-body-secondary">Last updated 3 mins ago</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-else-if="activeTab === 'link'">
        <h5 class="card-title">Link Tab</h5>
        <p class="card-text">
          This is the content of the Link tab. Feel free to update or replace it with dynamic
          content.
        </p>
        <a href="#" class="btn btn-success">Go to another place</a>
      </template>

      <template v-else-if="activeTab === 'calendar'">
        <h5 class="card-title">Link Tab</h5>
        <p class="card-text">
          This is the content of the Link tab. Feel free to update or replace it with dynamic
          content.
        </p>
        <a href="#" class="btn btn-success">Go to another place</a>
      </template>
    </div>
  </div>
</template>
