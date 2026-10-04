
import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/Title'

const AddRoom = () => {

  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null
  })

  const [Inputs, setInputs] = useState({
    roomType: '',
    pricePerNight: 0,
    amenities: {
      'Free Wifi': false,
      'Free Breakfast': false,
      'Room Service': false,
      'Mountain View': false,
      'Pool Access': false,
    }
  })

  return (
    <form className='ml-4'>

      <Title
        align='left'
        font='outfit'
        title='Add Room'
        subtitle='Fill in the details carefully and accurate room details, pricing and amenities, to enhance the user booking experience'
      />

      <p className='text-gray-800 mt-10'>Images</p>

      <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>

        {Object.keys(images).map((key) => (
          <label
            htmlFor={`roomImage${key}`}
            key={key}
          >

            <img
              src={
                images[key]
                  ? URL.createObjectURL(images[key])
                  : assets.uploadArea
              }
              alt=""
            />

            <input
              type="file"
              accept="image/*"
              id={`roomImage${key}`}
              hidden
              onChange={e =>
                setImages({
                  ...images,
                  [key]: e.target.files[0]
                })
              }
            />

          </label>
        ))}

      </div>

      <div className='w-full flex max-sm:flex-col sm:gap-4 mt-4'>

        <div className='flex-1 max-w-48'>

          <p className='text-gray-800 mt-4'>
            Room Type
          </p>

          <select
            value={Inputs.roomType}
            onChange={e =>
              setInputs({
                ...Inputs,
                roomType: e.target.value
              })
            }
            className='border opacity-70 border-gray-800 mt-1 rounded p-2 w-full'
          >

            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suites">Family Suite</option>

          </select>

        </div>

        <div>

          <p className='mt-4 text-gray-800'>
            Price <span className='text-xs'>/night</span>
          </p>

          <input
            type="number"
            placeholder="0"
            className='border border-gray-300 mt-1 rounded p-2 w-24'
            value={Inputs.pricePerNight}
            onChange={e =>
              setInputs({
                ...Inputs,
                pricePerNight: e.target.value
              })
            }
          />

        </div>

      </div>

      <p className='text-gray-800 mt-4'>
        Amenities
      </p>

      <div className='text-gray-800 mt-4'>

        {Object.keys(Inputs.amenities).map((amenity, index) => (

          <div key={index}>

            <input
              type="checkbox"
              id={`amenities${index + 1}`}
              checked={Inputs.amenities[amenity]}
              onChange={() =>
                setInputs({
                  ...Inputs,
                  amenities: {
                    ...Inputs.amenities,
                    [amenity]: !Inputs.amenities[amenity]
                  }
                })
              }
            />

            <label htmlFor={`amenities${index + 1}`}>
              {amenity}
            </label>

          </div>

        ))}

      </div>

      <button
        type="submit"
        className='bg-primary text-white px-8 py-2 rounded mt-8 cursor-pointer'
      >
        Add Room
      </button>

    </form>
  )
}

export default AddRoom

