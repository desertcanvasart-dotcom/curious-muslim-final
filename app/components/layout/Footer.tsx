import Link from "next/link";
import { Facebook, Instagram, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#3D5A6C] text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">🌙</span>
              <div>
                <h3 className="text-2xl font-heading font-bold text-white mb-0">
                  Curious Muslim
                </h3>
                <p className="text-[#F2C94C] text-sm">
                  Stories of the Prophets
                </p>
              </div>
            </div>
            <p className="text-white/90 mb-4 max-w-md">
              Beautiful Islamic stories for Muslim children. Teaching the love
              of Prophet Muhammad through warm storytelling and stunning
              illustrations.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/curiousmuslim"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-[#F2C94C] hover:text-[#3D5A6C] rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/curiousmuslim"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-[#F2C94C] hover:text-[#3D5A6C] rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@curiousmuslim.com"
                className="w-10 h-10 bg-white/10 hover:bg-[#F2C94C] hover:text-[#3D5A6C] rounded-full flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4 text-[#F2C94C]">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/routes/about"
                  className="text-white/90 hover:text-[#F2C94C] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/routes/book"
                  className="text-white/90 hover:text-[#F2C94C] transition-colors"
                >
                  The Book
                </Link>
              </li>
              <li>
                <Link
                  href="/routes/characters"
                  className="text-white/90 hover:text-[#F2C94C] transition-colors"
                >
                  Characters
                </Link>
              </li>
              <li>
                <Link
                  href="/routes/blog"
                  className="text-white/90 hover:text-[#F2C94C] transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/routes/faq"
                  className="text-white/90 hover:text-[#F2C94C] transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4 text-[#F2C94C]">
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/routes/contact"
                  className="text-white/90 hover:text-[#F2C94C] transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/routes/help"
                  className="text-white/90 hover:text-[#F2C94C] transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/routes/privacy"
                  className="text-white/90 hover:text-[#F2C94C] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/routes/terms"
                  className="text-white/90 hover:text-[#F2C94C] transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-white/70 text-sm mb-2">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </p>
          <p className="text-white/90 text-sm">
            © {currentYear} Curious Muslim. All rights reserved. Made with ❤️
            for Muslim families.
          </p>
        </div>
      </div>
    </footer>
  );
}
