const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
const productsProxy = createProxyMiddleware({
  target: "http://localhost:5000/api/products",
  changeOrigin: true
});

app.use("/api/products", productsProxy);


//order proxy
const ordersProxy = createProxyMiddleware({
    target: "http://localhost:5002/api/orders",
    changeOrigin: true
  });
  
  
  app.use("/api/orders", ordersProxy);


//auth proxy
const authProxy = createProxyMiddleware({
    target: "http://localhost:5001/auth",
    changeOrigin: true
  });
  
  
  app.use("/auth", authProxy);





const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
