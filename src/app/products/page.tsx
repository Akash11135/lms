import { Star, Heart } from "lucide-react";
import React from "react";

const ProductDetailPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Product Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="w-full border rounded-lg p-4">
          <img
            src="https://contents.mediadecathlon.com/p1587979/7813db01883c118aebbc2d12db109eef/p1587979.jpg?format=auto&quality=70&f=768x0"
            alt="product"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-between space-y-6">
          <div>
            <h2 className="text-2xl font-bold">QUECHUA MH100 Hiking Shoes</h2>
            <p className="text-sm text-gray-500 mt-1">by DecaShop</p>
            <div className="flex items-center gap-1 mt-2">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="text-yellow-400 fill-yellow-400"
                  />
                ))}
              <span className="ml-2 text-sm text-gray-600">(120 reviews)</span>
            </div>
            <p className="mt-4 text-xl font-bold text-primary">₹3,299</p>
          </div>

          {/* Size Selector */}
          <div>
            <h4 className="font-semibold mb-2">Select Size:</h4>
            <div className="flex gap-3">
              {["UK 6", "UK 7", "UK 8", "UK 9"].map((size) => (
                <button
                  key={size}
                  className="border px-4 py-1 rounded hover:bg-primary hover:text-white transition"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-4">
            <button className="bg-primary text-white px-6 py-2 rounded hover:opacity-90">
              Add to Cart
            </button>
            <button className="border border-primary text-primary px-6 py-2 rounded flex items-center gap-2 hover:bg-primary hover:text-white transition">
              <Heart size={16} /> Wishlist
            </button>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Product Description</h3>
            <p className="text-sm text-gray-700">
              Lightweight and durable hiking shoes designed for comfortable
              walking on all terrains. Water-resistant, cushioned, and excellent
              grip.
            </p>
          </div>
        </div>
      </div>

      {/* Product Highlights / Specs */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-4">Highlights</h3>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
          <li>Water-resistant upper mesh</li>
          <li>Non-slip rubber outsole</li>
          <li>Comfort padding & ankle support</li>
          <li>Ideal for mountain & trail hikes</li>
        </ul>
      </div>

      {/* Reviews Section */}
      <div className="mt-14">
        <h3 className="text-xl font-semibold mb-6">Customer Reviews</h3>

        {/* Single Review Example */}
        <div className="border-t pt-6 space-y-6">
          {[1, 2].map((_, index) => (
            <div key={index} className="border-b pb-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold">John Doe</h4>
                <div className="flex">
                  {[...Array(4)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  ))}
                  <Star size={16} className="text-gray-300" />
                </div>
              </div>
              <p className="text-sm text-gray-700 mt-2">
                Great hiking shoes for the price. Comfortable, breathable, and
                have good grip.
              </p>
            </div>
          ))}
        </div>

        {/* Leave a Review */}
        <div className="mt-10">
          <h4 className="font-semibold mb-2">Write a Review</h4>
          <textarea
            placeholder="Share your experience..."
            className="w-full border p-3 rounded min-h-[100px]"
          />
          <button className="mt-4 bg-primary text-white px-6 py-2 rounded hover:opacity-90">
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
