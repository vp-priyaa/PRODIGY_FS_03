import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddShop from "./pages/AddShop";
import AddProduct from "./pages/AddProduct";
import ShopDetails from "./pages/ShopDetails";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderHistory from "./pages/OrderHistory";
import Receipt from "./pages/Receipt";
import SellerDashboard from "./pages/SellerDashboard";
import SellerProducts from "./pages/SellerProducts";
import SellerOrders from "./pages/SellerOrders";
import SellerAnalytics from "./pages/SellerAnalytics";
import SellerProfile from "./pages/SellerProfile";
import SellerInfo from "./pages/SellerInfo";
import SellerPanel from "./pages/SellerPanel";
import EditShop from "./pages/EditShop";
import Reviews from "./pages/Reviews";
import Chat from "./pages/Chat";
import SellerChat from "./pages/SellerChat";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-shop" element={<AddShop />} />
        <Route path="/seller/add-product" element={<AddProduct/>} />
        <Route path="/shop/:id" element={<ShopDetails/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/favorites" element={<Favorites/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/order-history" element={<OrderHistory/>} />
        <Route path="/receipt" element={<Receipt/>} />
<Route path="/sellerpanel" element={<SellerPanel/>} />
<Route path="/seller" element={<SellerDashboard/>}/>
<Route path="/seller/products" element={<SellerProducts/>}/>
<Route path="/seller/orders" element={<SellerOrders/>}/>
<Route path="/seller/analytics" element={<SellerAnalytics/>}/>
<Route path="/seller/profile" element={<SellerProfile/>}/>
<Route path="/seller/info" element={<SellerInfo/>} />
        <Route path="/edit-shop" element={<EditShop/>}/>
        <Route path="/reviews" element={<Reviews/>} />
        <Route path="/chat" element={<Chat/>} />
        <Route path="/seller/chat" element={<SellerChat/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;