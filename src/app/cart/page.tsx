"use client";

import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/getProducts";
import { Cart } from "@/lib/validators/cart";
import { LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const dummyCartItems = [
  {
    id: "1",
    name: "Women's Windproof Jacket",
    brand: "QUECHUA",
    ref: "8916142",
    image:
      "https://contents.mediadecathlon.com/p2483838/k$4a24693f92deefc2dc5855d08cf1ff70/womens-waterproof-hiking-jacket-raincut-full-zip.jpg",
    size: "2XL",
    quantity: 1,
    originalPrice: 1299,
    discountedPrice: 999,
    discountPercent: 23,
  },
];

const CartPage = () => {
  const [deliveryType, setDeliveryType] = useState<"home" | "store">("home");
  const [cartItem, setCartItem] = useState<Cart[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const { products } = useProducts();
  useEffect(() => {
    try {
      const fetchDetails = async () => {
        setLoading(true);
        const response = await fetch(`api/cart`);
        if (!response.ok) {
          console.log("error in fetching response from cart in cart page :: ");
        }

        const data = await response.json();
        setCartItem(data);
      };
      fetchDetails();
    } catch (error) {
      console.log("error in fetching cart items :: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  let cartProducts;
  if (cartItem && cartItem.length > 0 && products) {
    cartProducts = cartItem.map((item) =>
      products.find((product) => product.id === item.productId)
    );
  }

  if (cartProducts && cartProducts.length > 0) {
    console.log("products in cart :: ", cartProducts);
  }
  if (loading) {
    return (
      <div>
        <LoaderCircle className="animate-spin " size={24} />
        Loading cart products
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full p-2 flex flex-col item-centre">
      <div className="w-[70%] mx-auto py-10 grid grid-cols-1 lg:grid-cols-3 gap-6 ">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Options */}
          <div className="border rounded-lg p-5 bg-white shadow-sm">
            <h2 className="text-lg font-semibold mb-4">
              Select Delivery Option
            </h2>
            <div className="flex gap-4">
              <div
                className={`border rounded-lg p-4 w-1/2 cursor-pointer ${
                  deliveryType === "home"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300"
                }`}
                onClick={() => setDeliveryType("home")}
              >
                <p className="font-semibold">Home Delivery</p>
                <p className="text-sm text-gray-600">
                  Get it by <strong>Tomorrow</strong>
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Bengaluru, KARNATAKA, 560002
                </p>
                <Button variant="outline" className="mt-2 text-xs">
                  ADD DELIVERY ADDRESS
                </Button>
              </div>
              <div
                className={`border rounded-lg p-4 w-1/2 cursor-pointer ${
                  deliveryType === "store"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300"
                }`}
                onClick={() => setDeliveryType("store")}
              >
                <p className="font-semibold">Pickup from Store</p>
                <p className="text-sm text-gray-600">
                  Pickup after <strong>4 pm, Today</strong>
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  DSI BRIGADE ROAD, Bangalore
                </p>
                <Button variant="outline" className="mt-2 text-xs">
                  CHANGE PICKUP POINT
                </Button>
              </div>
            </div>
          </div>

          {/* Cart Items */}
          <div className="border rounded-lg p-5 bg-white shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Items in Cart</h2>
            {cartProducts?.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b py-4"
              >
                <div className="flex gap-4 items-start">
                  <input type="checkbox" checked className="mt-2" readOnly />
                  <img
                    src={item?.imageUrl}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    {/* <p className="font-bold">{item.brand}</p> */}
                    <p className="text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {/* Ref: {item.ref} */}
                    </p>
                    <div className="mt-1 text-sm flex gap-3">
                      <span>Size: {item.size}</span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                    <div className="mt-1">
                      <span className="text-lg font-semibold text-black mr-2">
                        ₹ {item.discountedPrice}
                      </span>
                      <span className="line-through text-gray-400 text-sm">
                        ₹ {item.originalPrice}
                      </span>
                      <span className="ml-2 text-green-600 text-sm font-semibold">
                        {item.discountPercent}% Off
                      </span>
                    </div>
                    <p className="text-sm mt-1 text-gray-500">
                      Delivery by <strong>Tomorrow</strong>
                    </p>
                  </div>
                </div>
                <button className="text-gray-500 hover:text-red-500 text-xl">
                  🗑
                </button>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h2 className="text-md font-semibold mb-3">You Might Also Like</h2>
            <div className="flex space-x-4 overflow-x-auto">
              {/* Dummy Products */}
              <div className="min-w-[150px] bg-gray-100 h-32 flex items-center justify-center rounded">
                <span className="text-sm text-gray-600">Product 1</span>
              </div>
              <div className="min-w-[150px] bg-gray-100 h-32 flex items-center justify-center rounded">
                <span className="text-sm text-gray-600">Product 2</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className="bg-white rounded-lg p-6 shadow-sm space-y-4 h-fit">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <div className="flex justify-between text-sm">
            <span>Total price (Inc GST)</span>
            <span>₹ 1,299</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Discount</span>
            <span className="text-green-600">- ₹ 300</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Convenience Fee</span>
            <span className="line-through text-gray-400">₹ 129</span>
          </div>
          <div className="border-t pt-3 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹ 999</span>
          </div>
          <p className="text-green-600 text-sm">You save ₹ 429 in this order</p>
          <Button className="w-full bg-[#3643BA] hover:bg-[#1e2fa3] text-white">
            PROCEED TO CHECKOUT
          </Button>

          <div className="border-t pt-3">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>🏅 Sporty Rewards</span>
              <span className="text-gray-400">₹ 0</span>
            </div>
            <Button variant="outline" className="w-full text-xs">
              Apply Coupon
            </Button>
          </div>

          <div className="flex justify-around pt-4 text-sm text-gray-600">
            <div className="text-center">
              <p>🔁</p>
              <p>Easy returns</p>
            </div>
            <div className="text-center">
              <p>🚚</p>
              <p>Home Delivery</p>
            </div>
            <div className="text-center">
              <p>🛡️</p>
              <p>2yr Warranty</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
