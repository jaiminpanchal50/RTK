import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import "./App.css";
import Home from "./components/Home";
import Product from "./components/Product";
import ProductDetail from "./components/Product-detail";
import Sucess from "./components/Sucess";
import Cancle from "./components/Cancle";
import Cart from "./components/Cart";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/sucess" element={<Sucess />} />
          <Route path="/cancle" element={<Cancle />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
