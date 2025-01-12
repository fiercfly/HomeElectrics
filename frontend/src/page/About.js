import React from 'react';
import premiumCerti from "../asset/premiumCeritfied.jpg"

const About = () => {
  return (
    <div className="bg-gray-50 p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Welcome to Home Electric</h1>
        <p className="text-lg text-gray-700">
          Your trusted partner for high-quality electrical appliances that blend quality with affordability.
        </p>
      </header>

      <section className="max-w-4xl mx-auto mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">About Us</h2>
        <p className="text-base text-gray-700 mb-4">
          At Home Electric, we offer an extensive range of switches, socket boards, wires, and accessories
          meticulously designed to meet stringent performance and durability standards. Our commitment to
          excellence ensures that each product undergoes rigorous testing, guaranteeing reliability and safety
          for all your home or business projects. What sets us apart is our dedication to providing value
          without compromise, offering competitive pricing without sacrificing product integrity.
        </p>
        <p className="text-base text-gray-700 mb-4">
          Moreover, we're deeply committed to sustainability, actively promoting energy-efficient solutions and
          eco-friendly practices to minimize our environmental impact. Backed by our knowledgeable team of
          professionals, we're here to assist you every step of the way, from product selection to installation
          guidance and beyond. Join us at Home Electric and experience the difference that quality, affordability,
          and exceptional customer service can make for your electrical needs.
        </p>
      </section>

      <section className="max-w-4xl mx-auto mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Quality</h2>
        <p className="text-base text-gray-700 mb-4">
          At Home Electric, quality is our cornerstone. We meticulously select and test each of our products
          to ensure they meet the highest standards of performance, durability, and safety. Our dedication to
          quality extends beyond just the products themselves; it's ingrained in every aspect of our operations,
          from our customer service to our commitment to sustainability. With Home Electric, you can trust that
          you're getting not just a product, but a guarantee of excellence that will meet and exceed your expectations.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <img src={premiumCerti} alt="Premium" className="w-full rounded-lg shadow-lg"/>
        </div>
      </section>

      <section className="max-w-4xl mx-auto mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Affordability</h2>
        <p className="text-base text-gray-700 mb-4">
          At Home Electric, affordability is paramount. We understand the importance of staying within budget
          without compromising on quality. That's why we work tirelessly to offer competitive pricing on all our
          products, ensuring that our customers can access high-quality electrical appliances without breaking the bank.
          Our streamlined processes and strong relationships with manufacturers enable us to pass on cost savings to you,
          making top-notch electrical solutions accessible to everyone. With Home Electric, affordability isn't just a promise—it's a
          commitment we uphold every day.
        </p>
      </section>

      <section className="max-w-4xl mx-auto mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Durability</h2>
        <p className="text-base text-gray-700">
          Durability is at the core of what we do at Home Electric. We recognize the importance of products that
          can withstand the test of time, whether in residential, commercial, or industrial settings. That's why
          we meticulously select materials and rigorously test each item in our inventory to ensure they meet our
          stringent durability standards. From switches to socket boards, wires, and accessories, our products are
          built to last, providing long-term reliability and peace of mind for our customers. With Home Electric,
          you can trust that your investment will stand strong for years to come.
        </p>
      </section>
    </div>
  );
};

export default About;
