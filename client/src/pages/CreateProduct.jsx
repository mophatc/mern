import React from "react";

export default function createProduct() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Product{" "}
      </h1>
      <form className="flex flex-col sm:flex-row gap-5">
        <div className="flex flex-col gap-4 flex-1 ">
          <input
            type="text"
            placeholder="Product Name"
            id="name"
            className="border p-3 rounded-lg "
            maxLength={70}
            minLength={3}
          />

          <textarea
            type="text"
            placeholder="Description"
            id="description"
            className="border p-3 rounded-lg "
            maxLength={700}
            minLength={30}
          />

          <input
            type="text"
            placeholder="Address"
            id="address"
            className="border p-3 rounded-lg "
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex  gap-2 flex-wrap">
            <div className="flex gap-3 items-center">
              <input
                type="number"
                className="p-3 border border-gray-300 rounded-lg"
                name=""
                id="bedrooms"
                min="1"
                max="10"
              />
              <p>Beds</p>
            </div>
            <div className="flex gap-3 items-center">
              <input
                type="number"
                className="p-3 border border-gray-300 rounded-lg"
                name=""
                id="bathrooms"
                min="1"
                max="10"
              />
              <p>Baths</p>
            </div>
            <div className="flex gap-3 items-center">
              <input
                type="number"
                className="p-3 border border-gray-300 rounded-lg"
                name=""
                id="regularPrice"
                min="1"
                max="10"
              />
              <div className="flex flex-col items-center" >
                <p>Regular Price</p>
                <span className="text-xs">(Kshs./Month)</span>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <input
                type="number"
                className="p-3 border border-gray-300 rounded-lg"
                name=""
                id="discountedPrice"
                min="1"
                max="10"
              />
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                <span className="text-xs">(Kshs./Month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="fle flex-1 ">
          <p className="font-semibold">Images: 
            <span className="font-normal text-gray-500 ml-2">
              The first image will be the cover </span></p> 
        <div className="flex gap-4">
          <input type="file" className="p-3 border border-gray-300 rounded w-full" name="" id="images"  accept="images/*" multiple/>
          <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">Upload</button>
        </div>
        <button className="uppercase w-full mt-3 p-3 bg-slate-700 text-white rounded-lg hover:opacity-95 disabled:opacity-80">Create Product </button>
        </div>
      </form>
    </main>
  );
}
