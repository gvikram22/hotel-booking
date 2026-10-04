
import React, { useState } from "react";
import Title from "../components/Title";
import { userBookingsDummyData } from "../assets/assets";

const MyBookings = () => {
  const [bookings, setBookings] = useState(userBookingsDummyData);

  return (
    <div className="py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">

      <Title
        title="My Bookings"
        subtitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks."
        align="left"
      />

      <div className="max-w-6xl mt-8 w-full text-gray-800">

        {/* Header */}
        <div className="hidden md:grid grid-cols-[3fr_2fr_2fr] w-full border-b border-gray-300 font-medium text-base py-3">
          <div>Hotels</div>
          <div>Date & Timings</div>
          <div>Payment</div>
        </div>

        {/* Bookings */}
        {bookings.map((booking, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-[3fr_2fr_2fr] w-full py-5 border-b border-gray-200 gap-5"
          >

            {/* Hotel */}
            <div className="flex gap-4">

              <img
                src={booking.room.images[0]}
                alt={booking.room.hotel.name}
                className="w-28 h-20 rounded-lg object-cover"
              />

              <div>
                <p className="font-medium text-lg">
                  {booking.room.hotel.name}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {booking.room.roomType}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {booking.room.hotel.address}
                </p>
              </div>

            </div>

            {/* Date & Timings */}
            <div className="flex flex-col justify-center">
              <p className="text-sm">
                Check-in: {booking.checkInDate}
              </p>

              <p className="text-sm mt-1">
                Check-out: {booking.checkOutDate}
              </p>
            </div>

            {/* Payment */}
            {/* Payment */}
          {/* Payment */}
<div className="flex flex-col justify-center">
  <p
    className={`text-sm font-medium ${
      booking.isPaid ? "text-green-600" : "text-red-500"
    }`}
  >
    {booking.isPaid ? "Paid" : "Unpaid"}
  </p>

  <p className="text-sm text-gray-500 mt-1">
    ${booking.totalPrice}
  </p>

  {!booking.isPaid && (
    <button className="w-fit px-4 py-1.5 mt-3 text-xs border border-gray-400 rounded-full hover:bg-gray-50 transition-all cursor-pointer">
      Pay Now
    </button>
  )}
</div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default MyBookings;

