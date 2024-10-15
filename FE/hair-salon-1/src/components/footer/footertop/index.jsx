import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-50 py-10 border-t border-gray-200">
  <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
    {/* Column 1 */}
    <div>
      <h3 className="text-lg font-semibold mb-4">More about Harmony</h3>
      <p className="text-sm text-gray-600">
        Lorem ipsum dolor sit amet consectetur adipiscing elit. Enim sint ab ullam.
      </p>
    </div>

    {/* Column 2 */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Shop</h3>
      <ul className="space-y-2">
        <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800">Accessories</a></li>
        <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800">Clothing</a></li>
        <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800">Shoes</a></li>
      </ul>
    </div>

    {/* Column 3 */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Your Account</h3>
      <ul className="space-y-2">
        <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800">Profile</a></li>
        <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800">Orders</a></li>
        <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800">Addresses</a></li>
      </ul>
    </div>

    {/* Column 4 */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Subscribe to our newsletter</h3>
      <form>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
        />
        <button className="mt-4 w-full py-2 bg-black text-white font-semibold rounded hover:bg-gray-800">
          Subscribe
        </button>
      </form>
    </div>
  </div>
</footer>

  )
}

export default Footer