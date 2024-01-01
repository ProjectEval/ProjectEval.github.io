import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'


const root = resolve(__dirname, 'src')
const outDir = resolve(__dirname, 'dist')

// https://vitejs.dev/config/
export default defineConfig({
  root,
  base: '/',
  plugins: [react()],
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(root,  'index.html'),
        login: resolve(root, 'Login', 'index.html'),
        dashboard: resolve(root, 'Dashboard', 'index.html'),
        project: resolve(root, 'Project','index.html'),
        eval_student: resolve(root, 'Project', 'EvalStudent','index.html'),
        student_profile: resolve(root, 'Project', 'StudentProfile','index.html'),
        editor: resolve(root, 'Project', 'Editor', 'index.html'),
        projects: resolve(root, 'Projects', 'index.html'),
        forgot_password: resolve(root, 'Login','ForgotPassword', 'index.html'),
        reset_password: resolve(root, 'Login','ResetPassword', 'index.html'),
        join_class: resolve(root, 'JoinClass', 'index.html'),


      }
    }
  }
})
