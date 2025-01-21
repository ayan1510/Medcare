import React from 'react'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/* ----left section----- */}
        <div>
            <h2 className='mb-5 w-40'>MadeCareHub</h2>
            <p className='w-full md:w-2/3 text-gray-600 leading-6'>Your trusted partner in health and wellness, providing top-tier medical care and seamless access to expert doctors. Experience compassionate healthcare designed for your needs, anytime, anywhere.</p>
        </div>
        {/* ----center section----- */}
        <div>
        <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Contact us</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        {/* ----Right section----- */}
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>9800542729</li>
                <li>ayanmondal151020@gmail.com</li>
            </ul>
        </div>
      </div>
      <div>
        {/* ----copyright text */}
        <hr />
        <p className='py-5 text-sm text-center'>Copyright © 2024 GreatStack - All Right Reserved</p>
      </div>
    </div>
  )
}

export default Footer
