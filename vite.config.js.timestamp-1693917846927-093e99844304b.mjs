// vite.config.js
import { defineConfig } from "file:///C:/Users/User/TMI/node_modules/.pnpm/vite@4.4.5/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/User/TMI/node_modules/.pnpm/@vitejs+plugin-react@4.0.3_vite@4.4.5/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "node:path";
import { env } from "node:process";
import viteImagemin from "file:///C:/Users/User/TMI/node_modules/.pnpm/@vheemstra+vite-plugin-imagemin@1.0.11_vite@4.4.5/node_modules/@vheemstra/vite-plugin-imagemin/dist/index.js";
import imageminGifSicle from "file:///C:/Users/User/TMI/node_modules/.pnpm/imagemin-gifsicle@7.0.0/node_modules/imagemin-gifsicle/index.js";
import imageminMozjpeg from "file:///C:/Users/User/TMI/node_modules/.pnpm/imagemin-mozjpeg@10.0.0/node_modules/imagemin-mozjpeg/index.js";
import imageminPngQuant from "file:///C:/Users/User/TMI/node_modules/.pnpm/imagemin-pngquant@9.0.2/node_modules/imagemin-pngquant/index.js";
import imageminSvgo from "file:///C:/Users/User/TMI/node_modules/.pnpm/imagemin-svgo@10.0.1/node_modules/imagemin-svgo/index.js";
import imageminWebp from "file:///C:/Users/User/TMI/node_modules/.pnpm/imagemin-webp@8.0.0/node_modules/imagemin-webp/index.js";
var __vite_injected_original_dirname = "C:\\Users\\User\\TMI";
var isDev = env.NODE_ENV;
var vite_config_default = defineConfig({
  // base:'/learn-react/',
  plugins: [
    react(),
    viteImagemin({
      plugins: {
        jpg: imageminMozjpeg(),
        png: imageminPngQuant(),
        gif: imageminGifSicle(),
        svg: imageminSvgo()
      },
      makeWebp: {
        plugins: {
          jpg: imageminWebp(),
          png: imageminWebp()
        }
      }
    })
  ],
  css: {
    devSourcemap: true,
    modules: {
      generateScopedName: isDev ? "[name]_[local]__[hash:base64:5]" : "[hash:base64:4]"
    }
  },
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "./src")
    }
  },
  // 빌드 시, 청크 파일 생성 매뉴얼 구성
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          reactRouter: ["react-router-dom"],
          extra: ["zustand", "@tanstack/react-query"]
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxVc2VyXFxcXFRNSVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcVXNlclxcXFxUTUlcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL1VzZXIvVE1JL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwibm9kZTpwYXRoXCI7IC8vIE5vZGUuanMgXHVCN0YwXHVEMEMwXHVDNzg0XHVDNzc0IFx1QUUzMFx1QkNGOCBcdUM4MUNcdUFDRjVcdUQ1NThcdUIyOTQgXHVCQUE4XHVCNEM4IChcdUQzMENcdUM3N0MgXHVBQ0JEXHVCODVDKVxuaW1wb3J0IHsgZW52IH0gZnJvbSBcIm5vZGU6cHJvY2Vzc1wiO1xuaW1wb3J0IHZpdGVJbWFnZW1pbiBmcm9tICdAdmhlZW1zdHJhL3ZpdGUtcGx1Z2luLWltYWdlbWluJztcbmltcG9ydCBpbWFnZW1pbkdpZlNpY2xlIGZyb20gJ2ltYWdlbWluLWdpZnNpY2xlJztcbmltcG9ydCBpbWFnZW1pbk1vempwZWcgZnJvbSAnaW1hZ2VtaW4tbW96anBlZyc7XG5pbXBvcnQgaW1hZ2VtaW5QbmdRdWFudCBmcm9tICdpbWFnZW1pbi1wbmdxdWFudCc7XG5pbXBvcnQgaW1hZ2VtaW5TdmdvIGZyb20gJ2ltYWdlbWluLXN2Z28nO1xuaW1wb3J0IGltYWdlbWluV2VicCBmcm9tICdpbWFnZW1pbi13ZWJwJztcblxuY29uc3QgaXNEZXYgPSBlbnYuTk9ERV9FTlZcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIC8vIGJhc2U6Jy9sZWFybi1yZWFjdC8nLFxuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICB2aXRlSW1hZ2VtaW4oe1xuICAgICAgcGx1Z2luczoge1xuICAgICAgICBqcGc6IGltYWdlbWluTW96anBlZygpLFxuICAgICAgICBwbmc6IGltYWdlbWluUG5nUXVhbnQoKSxcbiAgICAgICAgZ2lmOiBpbWFnZW1pbkdpZlNpY2xlKCksXG4gICAgICAgIHN2ZzogaW1hZ2VtaW5TdmdvKCksXG4gICAgICB9LFxuICAgICAgbWFrZVdlYnA6IHtcbiAgICAgICAgcGx1Z2luczoge1xuICAgICAgICAgIGpwZzogaW1hZ2VtaW5XZWJwKCksXG4gICAgICAgICAgcG5nOiBpbWFnZW1pbldlYnAoKSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGNzczoge1xuICAgIGRldlNvdXJjZW1hcDogdHJ1ZSxcbiAgICBtb2R1bGVzOiB7XG4gICAgICBnZW5lcmF0ZVNjb3BlZE5hbWU6IGlzRGV2XG4gICAgICAgID8gJ1tuYW1lXV9bbG9jYWxdX19baGFzaDpiYXNlNjQ6NV0nXG4gICAgICAgIDogJ1toYXNoOmJhc2U2NDo0XScsXG4gICAgfSxcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcbiAgICB9LFxuICB9LFxuICAvLyBcdUJFNENcdUI0REMgXHVDMkRDLCBcdUNDQURcdUQwNkMgXHVEMzBDXHVDNzdDIFx1QzBERFx1QzEzMSBcdUI5RTRcdUIyNzRcdUM1QkMgXHVBRDZDXHVDMTMxXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgIHJlYWN0OiBbJ3JlYWN0JywgJ3JlYWN0LWRvbSddLFxuICAgICAgICAgIHJlYWN0Um91dGVyOiBbJ3JlYWN0LXJvdXRlci1kb20nXSxcbiAgICAgICAgICBleHRyYTogWyd6dXN0YW5kJywgJ0B0YW5zdGFjay9yZWFjdC1xdWVyeSddLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUE2TyxTQUFTLG9CQUFvQjtBQUMxUSxPQUFPLFdBQVc7QUFDbEIsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsV0FBVztBQUNwQixPQUFPLGtCQUFrQjtBQUN6QixPQUFPLHNCQUFzQjtBQUM3QixPQUFPLHFCQUFxQjtBQUM1QixPQUFPLHNCQUFzQjtBQUM3QixPQUFPLGtCQUFrQjtBQUN6QixPQUFPLGtCQUFrQjtBQVR6QixJQUFNLG1DQUFtQztBQVd6QyxJQUFNLFFBQVEsSUFBSTtBQUdsQixJQUFPLHNCQUFRLGFBQWE7QUFBQTtBQUFBLEVBRTFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLGFBQWE7QUFBQSxNQUNYLFNBQVM7QUFBQSxRQUNQLEtBQUssZ0JBQWdCO0FBQUEsUUFDckIsS0FBSyxpQkFBaUI7QUFBQSxRQUN0QixLQUFLLGlCQUFpQjtBQUFBLFFBQ3RCLEtBQUssYUFBYTtBQUFBLE1BQ3BCO0FBQUEsTUFDQSxVQUFVO0FBQUEsUUFDUixTQUFTO0FBQUEsVUFDUCxLQUFLLGFBQWE7QUFBQSxVQUNsQixLQUFLLGFBQWE7QUFBQSxRQUNwQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxjQUFjO0FBQUEsSUFDZCxTQUFTO0FBQUEsTUFDUCxvQkFBb0IsUUFDaEIsb0NBQ0E7QUFBQSxJQUNOO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUNqQztBQUFBLEVBQ0Y7QUFBQTtBQUFBLEVBRUEsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBLFVBQ1osT0FBTyxDQUFDLFNBQVMsV0FBVztBQUFBLFVBQzVCLGFBQWEsQ0FBQyxrQkFBa0I7QUFBQSxVQUNoQyxPQUFPLENBQUMsV0FBVyx1QkFBdUI7QUFBQSxRQUM1QztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
