import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 去进行设置别名
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:[{
      find:"@",
      replacement:"/src"
    }]
  }
})
