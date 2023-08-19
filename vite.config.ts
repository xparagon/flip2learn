import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

// Context from Code Snippet vite.config.ts:
const manifestForPlugin: Partial<VitePWAOptions> = {
    registerType: "prompt",
    includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
    manifest: {
        name: "flip2learn",
        short_name: "Flip",
        description: "An an app to help you to learn Norwegian",
        icons: [
            {
                src: "assets/icons/icon-72x72.png",
                sizes: "72x72",
                type: "image/png",
                purpose: "maskable any",
            },
            {
                src: "assets/icons/icon-96x96.png",
                sizes: "96x96",
                type: "image/png",
                purpose: "maskable any",
            },
            {
                src: "assets/icons/icon-128x128.png",
                sizes: "128x128",
                type: "image/png",
                purpose: "maskable any",
            },
            {
                src: "assets/icons/icon-144x144.png",
                sizes: "144x144",
                type: "image/png",
                purpose: "maskable any",
            },
            {
                src: "assets/icons/icon-152x152.png",
                sizes: "152x152",
                type: "image/png",
                purpose: "maskable any",
            },
            {
                src: "assets/icons/icon-192x192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "maskable any",
            },
            {
                src: "assets/icons/icon-384x384.png",
                sizes: "384x384",
                type: "image/png",
                purpose: "maskable any",
            },
            {
                src: "assets/icons/icon-512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable any",
            },
        ],
        theme_color: "#1976d2",
        background_color: "#fafafa",
        display: "standalone",
        scope: "./",
        start_url: "./",
        orientation: "portrait",
    },
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), VitePWA(manifestForPlugin)],
});
