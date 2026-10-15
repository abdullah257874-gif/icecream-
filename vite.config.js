import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: If your GitHub repository name is not "dreamy-scoops", change the base below to '/your-repo-name/'.
export default defineConfig({
  base: '/dreamy-scoops/',
  plugins: [react()]
})
