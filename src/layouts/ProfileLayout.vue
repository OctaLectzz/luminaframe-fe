<template>
  <div class="q-mb-xl">
    <div v-if="loading" class="row justify-center">
      <!-- Avatar -->
      <q-skeleton type="QAvatar" size="110px" class="q-my-md" />
      <div class="col-12 text-center">
        <!-- Name -->
        <div class="flex flex-center text-h5 text-bold">
          <q-skeleton width="200px" />
        </div>

        <!-- Username & Pronouns -->
        <div class="flex flex-center q-mt-sm">
          <q-skeleton width="120px" height="15px" />
        </div>

        <div class="flex flex-center q-mt-sm">
          <!-- URL & About -->
          <q-skeleton width="300px" />
        </div>
      </div>
    </div>
    <div v-else class="row justify-center">
      <!-- Avatar -->
      <q-avatar size="110px" class="q-my-md">
        <img :src="url + '/avatars/' + user.avatar" />
      </q-avatar>
      <div class="col-12 text-center">
        <!-- Name -->
        <div class="text-h5 text-bold">{{ user.name }}</div>

        <!-- Username & Pronouns -->
        <div class="text-subtitle2 text-grey-7">
          {{ user.username }}
          <span v-if="user.pronouns">• {{ user.pronouns }}</span>
        </div>

        <!-- URL & About -->
        <a v-if="user.url" :href="user.url" target="_blank" rel="noopener noreferrer" class="permission__link text-bold" :class="$q.dark.isActive ? 'text-secondary' : 'text-primary'">
          {{ user.url }} •
        </a>
        {{ user.about }}
      </div>
    </div>
  </div>

  <q-tabs :class="$q.dark.isActive ? 'bg-primary' : 'bg-secondary'" align="justify" no-caps dense>
    <q-route-tab name="index" label="Created" :to="{ name: 'indexprofile' }" />
    <q-route-tab name="collection" label="Collections" :to="{ name: 'collectionsprofile' }" />
    <q-route-tab name="like" label="Likes" :to="{ name: 'likesprofile' }" />
  </q-tabs>

  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>

  <div style="padding-bottom: 500px"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { url } from '/src/boot/axios'
import { useUserStore } from '/src/stores/user-store'
import { useAuthStore } from '/src/stores/auth-store'

const route = useRoute()
const userStore = useUserStore()
const authStore = useAuthStore()

// User
const user = ref([])
const loading = ref(true)
const getUser = async (username) => {
  try {
    const res = await userStore.show(username)

    user.value = res.data.data
    loading.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

// Profile
const profile = ref([])
const getProfile = async () => {
  try {
    const res = await authStore.profile()

    profile.value = res.data.data
    loading.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  getUser(route.params.username)
  getProfile()
})
</script>

<style scoped>
.permission__link {
  text-decoration: none;
}
.permission__link:hover {
  text-decoration: underline;
}
</style>