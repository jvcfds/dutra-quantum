/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      xs: "320px",   // Microdevices (feature phones, POS, relógios com browser)
      sm: "375px",   // Smartphones muito pequenos (iPhone SE, Android compact)
      md: "475px",   // Smartphones padrão (iPhone, Galaxy, Xiaomi padrão)
      lg: "640px",   // Phablets e smartphones grandes (Pixel XL, iPhone Plus)
      xl: "768px",   // Tablets pequenos e mini-tablets (iPad mini, Samsung Tab A7)
      "2xl": "1024px",  // Tablets médios/paisagem, notebooks compactos
      "3xl": "1280px",  // Laptops convencionais, desktops básicos, split-screen
      "4xl": "1536px",  // Monitores grandes, setups de programador, ultrawide comum
      "5xl": "1920px",  // FullHD/2K, monitores duplos, ultrawide vertical
      "6xl": "2560px",  // 2K+, programador multitela, ultrawide horizontal, 4K
      "7xl": "3440px",  // 4K+, ultrawide extremo, setups multi-monitor
    },
    extend: {
      colors: {
        qblue: "rgb(36, 186, 255)",
        "qblue/70": "rgba(36, 186, 255, 0.7)",
        "qblue/80": "rgba(36, 186, 255, 0.8)",
        page: "#02060d",
      },
      fontFamily: {
        display: ["Rajdhani", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(36, 186, 255, 0.4)",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
};
