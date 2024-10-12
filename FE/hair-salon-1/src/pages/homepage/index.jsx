import React from "react";
import Banner from "../../components/banner";

function HomePage() {
  return (
    <div className="w-full mx-auto">
      <Banner/>
      <div className="max-w-container mx-auto px-4">
        <h3>Product</h3>
      </div>
    </div>
  )
}

export default HomePage;