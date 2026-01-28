import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail, Youtube } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.png"
                alt="Curious Muslim Logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Beautiful Islamic stories for Muslim children. Teaching the love
              of Prophet Muhammad through warm storytelling and stunning
              illustrations.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/curiousmuslim"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#3D5A6C]/10 text-[#3D5A6C] hover:bg-[#3D5A6C] hover:text-white rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/curiousmuslim"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#3D5A6C]/10 text-[#3D5A6C] hover:bg-[#3D5A6C] hover:text-white rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@curiousmuslim"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#3D5A6C]/10 text-[#3D5A6C] hover:bg-[#3D5A6C] hover:text-white rounded-full flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@curiousmuslim.com"
                className="w-10 h-10 bg-[#3D5A6C]/10 text-[#3D5A6C] hover:bg-[#3D5A6C] hover:text-white rounded-full flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4 text-[#3D5A6C]">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-[#5C7A4B] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/book"
                  className="text-gray-600 hover:text-[#5C7A4B] transition-colors"
                >
                  Stories
                </Link>
              </li>
              <li>
                <Link
                  href="/characters"
                  className="text-gray-600 hover:text-[#5C7A4B] transition-colors"
                >
                  Characters
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 hover:text-[#5C7A4B] transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 hover:text-[#5C7A4B] transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonials"
                  className="text-gray-600 hover:text-[#5C7A4B] transition-colors"
                >
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4 text-[#3D5A6C]">
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-[#5C7A4B] transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-gray-600 hover:text-[#5C7A4B] transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-[#5C7A4B] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-[#5C7A4B] transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-[#3D5A6C] text-sm mb-2">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </p>
          <p className="text-gray-600 text-sm">
            © {currentYear} Curious Muslim. All rights reserved. Made with ❤️
            for Muslim families.
          </p>
        </div>
      </div>
    </footer>
  );
}
