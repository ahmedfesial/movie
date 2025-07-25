import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return <>
    <nav className='bg-red-900 p-2'>
          <div className='container mx-auto flex justify-between items-center'>
              <div className='flex items-center'>
                  <div className=''>
                     <h1 className='text-4xl ms-10 font-bold text-white'>Movies</h1>
                 </div>
               <div>
                   <ul>
                      <li className='ms-14 rounded-2xl font-bold text-lg mt-2 border-2 px-2 bg-white text-red-900 '><NavLink to={'/'}>Home</NavLink></li>
                  </ul>
               </div>
              </div>
              <div>
                <ul className='flex'>
                  <li><i className="fa-brands mx-4 fa-instagram text-white text-2xl"></i></li>
                  <li><i className="fa-brands  fa-facebook text-white text-2xl"></i></li>
                  <li><i className="fa-brands mx-4 fa-youtube text-white text-2xl"></i></li>
                  <li><i className="fa-brands fa-linkedin text-white text-2xl"></i></li>
                </ul>
              </div>

          </div>
    </nav>
  </>
}
