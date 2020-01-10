module.exports = {
  publicPath: "/pwa-share-target-data-revealer/",
  pwa: {
    name: "PWA Share Target Data Revealer",
    themeColor: "#4DBA87", // The Vue color
    manifestPath: "manifest.webmanifest",
    manifestOptions: {
      short_name: "Share Target Revealer",
      start_url: ".",
      display: "standalone",
      share_target: {
        action: "/",
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
