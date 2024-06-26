import { defineStore } from 'pinia'
import { server, headers, headersImage } from '/src/boot/axios'

export const usePhotoStore = defineStore('photo', {
  state: () => ({
    id: null,
    photo_number: null,
    user_id: null,
    category_id: null,
    user: null,
    image: null,
    title: null,
    description: null,
    category: null,
    tags: null,
    likes: null,
    collections: null
  }),
  getters: {},
  actions: {
    async all() {
      return await server.get('api/photo')
    },

    async dashboard() {
      return await server.get('api/dashboard/photo', { headers })
    },

    async chart() {
      return await server.get('api/dashboard/photo/chart', { headers })
    },

    async show(photo_number) {
      return await server.get(`api/photo/${photo_number}`)
    },

    async create(data) {
      return await server.post('api/photo', data, { headers: headersImage })
    },

    async edit(data) {
      return await server.put(`api/photo/${data.id}`, data, { headers })
    },

    async delete(data) {
      return await server.delete(`api/photo/${data}`, { headers })
    },

    async download(data) {
      const res = await server.get(`api/photo/download/${data.image}`, {
        responseType: 'arraybuffer'
      })

      const blob = new Blob([res.data], { type: res.headers['content-type'] })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')

      link.href = url
      link.setAttribute('download', data.image)
      document.body.appendChild(link)
      link.click()

      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    }
  },
  persist: true
})
