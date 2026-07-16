// Shared Tailwind theme for every page. Loaded right after the Tailwind CDN
// script so the custom colors/fonts are available before styles are generated.
tailwind.config = {
  theme: {
    extend: {
      colors: {
        graphite: "#17201f",
        ink: "#26302e",
        muted: "#64716d",
        line: "#dce4e1",
        mist: "#f4f8f7",
        teal: "#0f766e",
        tealDark: "#115e59",
        amber: "#d9931d",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      boxShadow: { soft: "0 24px 70px rgba(23, 32, 31, 0.10)" },
    },
  },
};
