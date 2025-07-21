// vite.config.ts
import { defineConfig } from "file:///home/runner/workspace/node_modules/vite/dist/node/index.js";
import react from "file:///home/runner/workspace/node_modules/@vitejs/plugin-react/dist/index.mjs";
import themePlugin from "file:///home/runner/workspace/node_modules/@replit/vite-plugin-shadcn-theme-json/dist/index.mjs";
import path from "path";
import { fileURLToPath } from "url";
import runtimeErrorOverlay from "file:///home/runner/workspace/node_modules/@replit/vite-plugin-runtime-error-modal/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///home/runner/workspace/vite.config.ts";
var __filename = fileURLToPath(__vite_injected_original_import_meta_url);
var __dirname = path.dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("file:///home/runner/workspace/node_modules/@replit/vite-plugin-cartographer/dist/index.mjs").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  root: "client",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@shared": path.resolve(__dirname, "./shared"),
      "@assets": path.resolve(__dirname, "attached_assets")
    }
  },
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, "client/index.html"),
      output: {
        manualChunks: {
          // Split vendor libraries
          vendor: ["react", "react-dom"],
          ui: ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu", "@radix-ui/react-toast"],
          charts: ["recharts"],
          utils: ["date-fns", "clsx", "tailwind-merge"],
          icons: ["lucide-react", "react-icons"],
          forms: ["react-hook-form", "@hookform/resolvers"],
          query: ["@tanstack/react-query"]
        }
      }
    }
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    hmr: {
      port: 5173
    }
  },
  preview: {
    host: "0.0.0.0",
    port: 5173
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9ydW5uZXIvd29ya3NwYWNlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9ydW5uZXIvd29ya3NwYWNlL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3J1bm5lci93b3Jrc3BhY2Uvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHRoZW1lUGx1Z2luIGZyb20gXCJAcmVwbGl0L3ZpdGUtcGx1Z2luLXNoYWRjbi10aGVtZS1qc29uXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gXCJ1cmxcIjtcbmltcG9ydCBydW50aW1lRXJyb3JPdmVybGF5IGZyb20gXCJAcmVwbGl0L3ZpdGUtcGx1Z2luLXJ1bnRpbWUtZXJyb3ItbW9kYWxcIjtcblxuY29uc3QgX19maWxlbmFtZSA9IGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKTtcbmNvbnN0IF9fZGlybmFtZSA9IHBhdGguZGlybmFtZShfX2ZpbGVuYW1lKTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgcnVudGltZUVycm9yT3ZlcmxheSgpLFxuICAgIHRoZW1lUGx1Z2luKCksXG4gICAgLi4uKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJlxuICAgIHByb2Nlc3MuZW52LlJFUExfSUQgIT09IHVuZGVmaW5lZFxuICAgICAgPyBbXG4gICAgICAgICAgYXdhaXQgaW1wb3J0KFwiQHJlcGxpdC92aXRlLXBsdWdpbi1jYXJ0b2dyYXBoZXJcIikudGhlbigobSkgPT5cbiAgICAgICAgICAgIG0uY2FydG9ncmFwaGVyKCksXG4gICAgICAgICAgKSxcbiAgICAgICAgXVxuICAgICAgOiBbXSksXG4gIF0sXG4gIHJvb3Q6IFwiY2xpZW50XCIsXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9jbGllbnQvc3JjXCIpLFxuICAgICAgXCJAc2hhcmVkXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zaGFyZWRcIiksXG4gICAgICBcIkBhc3NldHNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJhdHRhY2hlZF9hc3NldHNcIiksXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiZGlzdC9wdWJsaWNcIiksXG4gICAgZW1wdHlPdXREaXI6IHRydWUsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgaW5wdXQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiY2xpZW50L2luZGV4Lmh0bWxcIiksXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgLy8gU3BsaXQgdmVuZG9yIGxpYnJhcmllc1xuICAgICAgICAgIHZlbmRvcjogWydyZWFjdCcsICdyZWFjdC1kb20nXSxcbiAgICAgICAgICB1aTogWydAcmFkaXgtdWkvcmVhY3QtZGlhbG9nJywgJ0ByYWRpeC11aS9yZWFjdC1kcm9wZG93bi1tZW51JywgJ0ByYWRpeC11aS9yZWFjdC10b2FzdCddLFxuICAgICAgICAgIGNoYXJ0czogWydyZWNoYXJ0cyddLFxuICAgICAgICAgIHV0aWxzOiBbJ2RhdGUtZm5zJywgJ2Nsc3gnLCAndGFpbHdpbmQtbWVyZ2UnXSxcbiAgICAgICAgICBpY29uczogWydsdWNpZGUtcmVhY3QnLCAncmVhY3QtaWNvbnMnXSxcbiAgICAgICAgICBmb3JtczogWydyZWFjdC1ob29rLWZvcm0nLCAnQGhvb2tmb3JtL3Jlc29sdmVycyddLFxuICAgICAgICAgIHF1ZXJ5OiBbJ0B0YW5zdGFjay9yZWFjdC1xdWVyeSddXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IFwiMC4wLjAuMFwiLFxuICAgIHBvcnQ6IDUxNzMsXG4gICAgaG1yOiB7XG4gICAgICBwb3J0OiA1MTczLFxuICAgIH0sXG4gIH0sXG4gIHByZXZpZXc6IHtcbiAgICBob3N0OiBcIjAuMC4wLjBcIixcbiAgICBwb3J0OiA1MTczLFxuICB9LFxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUFvUCxTQUFTLG9CQUFvQjtBQUNqUixPQUFPLFdBQVc7QUFDbEIsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMscUJBQXFCO0FBQzlCLE9BQU8seUJBQXlCO0FBTG9ILElBQU0sMkNBQTJDO0FBT3JNLElBQU0sYUFBYSxjQUFjLHdDQUFlO0FBQ2hELElBQU0sWUFBWSxLQUFLLFFBQVEsVUFBVTtBQUV6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixvQkFBb0I7QUFBQSxJQUNwQixZQUFZO0FBQUEsSUFDWixHQUFJLFFBQVEsSUFBSSxhQUFhLGdCQUM3QixRQUFRLElBQUksWUFBWSxTQUNwQjtBQUFBLE1BQ0UsTUFBTSxPQUFPLDRGQUFrQyxFQUFFO0FBQUEsUUFBSyxDQUFDLE1BQ3JELEVBQUUsYUFBYTtBQUFBLE1BQ2pCO0FBQUEsSUFDRixJQUNBLENBQUM7QUFBQSxFQUNQO0FBQUEsRUFDQSxNQUFNO0FBQUEsRUFDTixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxXQUFXLGNBQWM7QUFBQSxNQUMzQyxXQUFXLEtBQUssUUFBUSxXQUFXLFVBQVU7QUFBQSxNQUM3QyxXQUFXLEtBQUssUUFBUSxXQUFXLGlCQUFpQjtBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUSxLQUFLLFFBQVEsV0FBVyxhQUFhO0FBQUEsSUFDN0MsYUFBYTtBQUFBLElBQ2IsZUFBZTtBQUFBLE1BQ2IsT0FBTyxLQUFLLFFBQVEsV0FBVyxtQkFBbUI7QUFBQSxNQUNsRCxRQUFRO0FBQUEsUUFDTixjQUFjO0FBQUE7QUFBQSxVQUVaLFFBQVEsQ0FBQyxTQUFTLFdBQVc7QUFBQSxVQUM3QixJQUFJLENBQUMsMEJBQTBCLGlDQUFpQyx1QkFBdUI7QUFBQSxVQUN2RixRQUFRLENBQUMsVUFBVTtBQUFBLFVBQ25CLE9BQU8sQ0FBQyxZQUFZLFFBQVEsZ0JBQWdCO0FBQUEsVUFDNUMsT0FBTyxDQUFDLGdCQUFnQixhQUFhO0FBQUEsVUFDckMsT0FBTyxDQUFDLG1CQUFtQixxQkFBcUI7QUFBQSxVQUNoRCxPQUFPLENBQUMsdUJBQXVCO0FBQUEsUUFDakM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLEtBQUs7QUFBQSxNQUNILE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
