import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-white/20">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-4">DecaShop</h2>
          <p className="text-sm leading-relaxed">
            Your one-stop sports and outdoor shop. Quality gear at unbeatable
            prices.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Men
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Women
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Kids
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Accessories
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Shipping & Returns
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Warranty
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <div className="flex items-center gap-2 mb-2 text-sm">
            <Mail size={16} />
            <span>support@decashop.com</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone size={16} />
            <span>+91 98765 43210</span>
          </div>
          <div className="flex gap-4 mt-4">
            <a href="#">
              <Facebook size={20} />
            </a>
            <a href="#">
              <Twitter size={20} />
            </a>
            <a href="#">
              <Instagram size={20} />
            </a>
            <a href="#">
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-sm text-center py-4 text-white/70">
        &copy; {new Date().getFullYear()} DecaShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
