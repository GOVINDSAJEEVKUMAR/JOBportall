import React from 'react';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="App font-sans">
      {/* Header Section */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-700">JobPortal</div>
          <nav className="hidden md:block">
            <ul className="flex space-x-6 text-gray-700">
              <li className="hover:text-blue-700 cursor-pointer">Home</li>
              <li className="hover:text-blue-700 cursor-pointer">About</li>
              <li className="hover:text-blue-700 cursor-pointer">Services</li>
              <li className="hover:text-blue-700 cursor-pointer">Contact</li>
            </ul>
          </nav>
          <button className="bg-blue-700 text-white px-4 py-2 rounded-md ml-4">
            <Link to="/login">Login/SignUp</Link>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="text-center py-16 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://img.freepik.com/free-photo/happy-professional-asian-female-manager-businesswoman-suit-showing-announcement-smiling-pointing-finger-left-product-project-banner-standing-white-background_1258-69508.jpg?t=st=1725383162~exp=1725386762~hmac=d7a8a3d02f4347e969f7d7a48cf063003a42c5052c2cf3d0002acbaf2f9874b3&w=1380")',
          backgroundSize: 'cover',
          height: '650px',
          color: 'white',
        }}
      >
        <div className="container mx-auto px-6 text-left text-blue-800">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Your Out of House HR</h1>
          <p className="text-lg mt-4">Wherever you are, whenever you need!</p>
          <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-blue-700 text-white px-8 py-3 rounded-md">View Our Services</button>
            <button className="bg-white text-blue-700 border border-blue-700 px-8 py-3 rounded-md">
              Join Us
            </button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h2 className="text-5xl font-semibold text-blue-600">
              <CountUp end={368} duration={2} />M
            </h2>
            <p className="text-lg mt-2">4 million daily active users</p>
          </div>
          <div>
            <h2 className="text-5xl font-semibold text-blue-600">
              <CountUp end={120} duration={2} />K
            </h2>
            <p className="text-lg mt-2">Over 12k open job positions</p>
          </div>
          <div>
            <h2 className="text-5xl font-semibold text-blue-600">
              <CountUp end={184} duration={2} />M
            </h2>
            <p className="text-lg mt-2">Over 20 million stories shared</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-800">Services We Offer</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Workplace Efficiency', description: 'Improving productivity and employee engagement.' },
              { title: 'Organizational and Structural Redesign', description: 'Revamping your organizational structure for better efficiency.' },
              { title: 'Career Enhancement Services', description: 'Guiding employees to achieve their career goals.' },
              { title: 'Talent Acquisition & Development', description: 'Attracting and retaining top talent for your organization.' },
              { title: 'General HR Support', description: 'Providing day-to-day HR support for your business needs.' },
              { title: 'Managing Performance', description: 'Helping to align performance with business goals.' },
            ].map((service, index) => (
              <div key={index} className="p-8 border rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-blue-800">{service.title}</h3>
                <p className="text-gray-600 mt-4">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-blue-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-800">We're Here To Help</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            At Freedom HR, we believe in providing a valuable associate when and where you need it, tailored to your specific needs.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-800">Contact Us</h2>
          <form className="mt-8 max-w-lg mx-auto">
            <div className="mb-4">
              <input className="w-full p-4 border rounded-md" type="text" placeholder="Your Name" />
            </div>
            <div className="mb-4">
              <input className="w-full p-4 border rounded-md" type="email" placeholder="Your Email" />
            </div>
            <div className="mb-4">
              <textarea className="w-full p-4 border rounded-md" placeholder="Your Message"></textarea>
            </div>
            <button className="bg-blue-700 text-white px-8 py-3 rounded-md w-full md:w-auto">Send Message</button>
          </form>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; 2024 Freedom HR Consulting. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}