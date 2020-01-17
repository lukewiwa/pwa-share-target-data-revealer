module.exports = {
  publicPath: "/pwa-share-target-data-revealer/",
  pwa: {
    name: "PWA Share Target Data Revealer",
    themeColor: "#4FD1C5",
    manifestPath: "manifest.webmanifest",
    manifestOptions: {
      short_name: "Share Target Revealer",
      background_color: "#E6FFFA",
      start_url: ".",
      display: "standalone",
      share_target: {
        action: "/pwa-share-target-data-revealer/",
        method: "GET",
        params: {
          title: "title",
          text: "text",
          url: "url"
        }
      }
    }
  }
};
