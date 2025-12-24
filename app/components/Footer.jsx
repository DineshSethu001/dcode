import React from 'react'
import Image from "next/image"
import assets from '../assets /assets'
function Footer() {
  return (
    <div className='mt-20'>
        <div className="text-center">
            <Image src={assets.logo} className='w-36 mx-auto mb-2' alt=""/>
            <div className="w-max flex items-center gap-2 mx-auto">
                <Image src={assets.mail_icon} className="w-6" alt=""/>
                dineshsethu15981@gmail.com
            </div>
        </div>
        <div className="text-center sm:flex item-center justify-between border-t border-gray-400 mx-[10%] mt-12 py-6">
            <p className="">© 2026 dinesh Codehunt. All rights reserved.
</p>
<ul className="flex items-center gap-10 justify-center mt-4 sm:mt-0">
    <li><a target="_blank" href="">Github</a></li>
        <li><a target="_blank" href="">LinkedIn</a></li>
            <li><a target="_blank" href="">Whatsapp</a></li>


</ul>
        </div>
    </div>
  )
}

export default Footer