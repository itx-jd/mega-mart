// const express = require("express");
// const { createProxyMiddleware } = require("http-proxy-middleware");
// const app = express(); // Proxy middleware
// const productsProxy = createProxyMiddleware({
//   target: "http://localhost:5000",
//   changeOrigin: true,
//   pathRewrite: { "^/api/products": "/api/products" },
// }); // Proxy routes
// app.use("/api/products", productsProxy); // Start the proxy server
// const port = process.env.PORT || 3001;
// app.listen(port, () => {
//   console.log(`Proxy server is running on port ${port}`);
// });
