"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Mail, Calendar } from "lucide-react";

export default function PrivacyPolicyPage() {
  const lastUpdated = "January 15, 2025";

  return (
    <div className="bg-[#FDFBF7]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#3D5A6C] to-[#5C7A4B] text-white overflow-hidden min-h-[550px] flex items-center">
        <div className="container-custom py-16 relative z-10 w-full">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#F2C94C] text-[#3D5A6C] px-4 py-2 rounded-full font-semibold text-sm mb-6">
              <Shield className="w-4 h-4" />
              <span>Legal</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Privacy Policy
            </h1>

            <div className="flex items-center justify-center gap-2 text-white">
              <Calendar className="w-4 h-4" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="#FDFBF7"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </svg>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-soft p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                {/* Introduction */}
                <p className="text-gray-600 leading-relaxed text-lg">
                  At Curious Muslim, we take your privacy seriously. This Privacy Policy
                  explains how we collect, use, disclose, and safeguard your information
                  when you visit our website or purchase our products.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  Please read this privacy policy carefully. If you do not agree with
                  the terms of this privacy policy, please do not access the site.
                </p>

                {/* Section 1 */}
                <h2 className="text-2xl font-heading font-bold text-[#3D5A6C] mt-10 mb-4">
                  1. Information We Collect
                </h2>

                <h3 className="text-xl font-heading font-bold text-[#3D5A6C] mt-6 mb-3">
                  Personal Information
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We may collect personal information that you voluntarily provide when you:
                </p>
                <ul className="text-gray-600 space-y-2 list-disc pl-6">
                  <li>Register for our newsletter</li>
                  <li>Make a purchase</li>
                  <li>Contact us through our contact form</li>
                  <li>Use the Ask Noor AI feature</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  This information may include your name, email address, shipping address,
                  and payment information.
                </p>

                <h3 className="text-xl font-heading font-bold text-[#3D5A6C] mt-6 mb-3">
                  Automatically Collected Information
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  When you visit our website, we may automatically collect certain information
                  about your device, including your IP address, browser type, operating system,
                  and browsing patterns. This helps us improve our website and services.
                </p>

                {/* Section 2 */}
                <h2 className="text-2xl font-heading font-bold text-[#3D5A6C] mt-10 mb-4">
                  2. How We Use Your Information
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We use the information we collect to:
                </p>
                <ul className="text-gray-600 space-y-2 list-disc pl-6">
                  <li>Process and fulfill your orders</li>
                  <li>Send you newsletters and updates (with your consent)</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Improve our website and products</li>
                  <li>Personalize your experience</li>
                  <li>Protect against fraudulent transactions</li>
                </ul>

                {/* Section 3 */}
                <h2 className="text-2xl font-heading font-bold text-[#3D5A6C] mt-10 mb-4">
                  3. Ask Noor AI and Children&apos;s Privacy
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Ask Noor AI is designed to be used by children under parental supervision.
                  We do not knowingly collect personal information from children under 13
                  without parental consent.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Conversations with Ask Noor may be logged to improve the service, but
                  these logs are anonymized and do not contain personally identifiable
                  information. Parents can request deletion of any data associated with
                  their child&apos;s use of the service.
                </p>

                {/* Section 4 */}
                <h2 className="text-2xl font-heading font-bold text-[#3D5A6C] mt-10 mb-4">
                  4. Information Sharing
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We do not sell, trade, or rent your personal information to third parties.
                  We may share your information with:
                </p>
                <ul className="text-gray-600 space-y-2 list-disc pl-6">
                  <li>
                    <strong>Service providers:</strong> Companies that help us process payments,
                    ship orders, and send emails (e.g., Shopify, ConvertKit)
                  </li>
                  <li>
                    <strong>Legal requirements:</strong> When required by law or to protect
                    our rights
                  </li>
                </ul>

                {/* Section 5 */}
                <h2 className="text-2xl font-heading font-bold text-[#3D5A6C] mt-10 mb-4">
                  5. Cookies and Tracking
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We use cookies and similar tracking technologies to enhance your experience
                  on our website. Cookies are small files stored on your device that help us:
                </p>
                <ul className="text-gray-600 space-y-2 list-disc pl-6">
                  <li>Remember your preferences</li>
                  <li>Understand how you use our website</li>
                  <li>Improve our services</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  You can control cookies through your browser settings. However, disabling
                  cookies may affect some features of our website.
                </p>

                {/* Section 6 */}
                <h2 className="text-2xl font-heading font-bold text-[#3D5A6C] mt-10 mb-4">
                  6. Data Security
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We implement appropriate security measures to protect your personal information.
                  However, no method of transmission over the Internet is 100% secure. While we
                  strive to protect your data, we cannot guarantee absolute security.
                </p>

                {/* Section 7 */}
                <h2 className="text-2xl font-heading font-bold text-[#3D5A6C] mt-10 mb-4">
                  7. Your Rights
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  You have the right to:
                </p>
                <ul className="text-gray-600 space-y-2 list-disc pl-6">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt out of marketing communications</li>
                  <li>Withdraw consent at any time</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  To exercise these rights, please contact us at{" "}
                  <a href="mailto:privacy@curiousmuslim.com" className="text-[#3D5A6C] font-medium hover:underline">
                    privacy@curiousmuslim.com
                  </a>
                </p>

                {/* Section 8 */}
                <h2 className="text-2xl font-heading font-bold text-[#3D5A6C] mt-10 mb-4">
                  8. Third-Party Links
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Our website may contain links to third-party websites. We are not responsible
                  for the privacy practices of these external sites. We encourage you to read
                  their privacy policies before providing any personal information.
                </p>

                {/* Section 9 */}
                <h2 className="text-2xl font-heading font-bold text-[#3D5A6C] mt-10 mb-4">
                  9. Changes to This Policy
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We may update this privacy policy from time to time. We will notify you of
                  any changes by posting the new policy on this page and updating the
                  &quot;Last updated&quot; date.
                </p>

                {/* Section 10 */}
                <h2 className="text-2xl font-heading font-bold text-[#3D5A6C] mt-10 mb-4">
                  10. Contact Us
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  If you have questions about this Privacy Policy or our practices, please
                  contact us:
                </p>
                <div className="bg-[#F5EFD4] rounded-xl p-6 mt-4">
                  <p className="text-[#3D5A6C] font-medium mb-2">Curious Muslim</p>
                  <p className="text-gray-600">
                    Email:{" "}
                    <a href="mailto:privacy@curiousmuslim.com" className="text-[#3D5A6C] hover:underline">
                      privacy@curiousmuslim.com
                    </a>
                  </p>
                  <p className="text-gray-600">
                    General inquiries:{" "}
                    <a href="mailto:hello@curiousmuslim.com" className="text-[#3D5A6C] hover:underline">
                      hello@curiousmuslim.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Related Links */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link
                href="/terms"
                className="text-[#3D5A6C] hover:underline font-medium"
              >
                Terms of Service
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                href="/help"
                className="text-[#3D5A6C] hover:underline font-medium"
              >
                Help Center
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                href="/contact"
                className="text-[#3D5A6C] hover:underline font-medium"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
