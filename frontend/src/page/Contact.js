import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send the form data to the server)
    console.log('Form Submitted:', formData);
  };

  return (
    <div className="bg-gray-50 p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4 tracking-tight">Contact Us</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-4">
          Feel free to reach out to us for any inquiries or assistance. We're here to help! At Home Electric, we are
          dedicated to providing the best assistance to our customers, and we are always available to support you in any way we can.
          Visit our website for more information.
        </p>
      </header>

      <section className="max-w-4xl mx-auto mb-12 px-4 sm:px-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Address</h2>
        <p className="text-base text-gray-700 mb-4">
          <strong>HO:</strong> No 14, Ashoka Mews, Khondhwa Khurd, Pune 411048 Maharashtra
        </p>
        <p className="text-base text-gray-700 mb-4">
          <strong>Phone:</strong> 9123418583
        </p>
        <p className="text-base text-gray-700 mb-4">
          <strong>Email:</strong> care@homeelectric.co.in
        </p>
      </section>

      <section className="max-w-4xl mx-auto mb-12 px-4 sm:px-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Get In Touch</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows="4"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            >
              Send
            </button>
          </div>
        </form>
      </section>

      <footer className="text-center text-gray-700 mt-12">
        <p className="text-sm">
          © 2025 Home Electric. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Contact;
