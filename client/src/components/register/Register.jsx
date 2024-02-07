import React from 'react'
import { Link } from 'react-router-dom'

const Regitser = () => {
  return (
    <div className='mt-4'>
        <h1 className='text-center text-4xl uppercase'>Login</h1>
        <form action="submit" className='flex flex-col max-w-md mx-auto'>
            <input type="text" placeholder='Saswat Singh' />
            <input type="text" placeholder='your@gmail.com' />
            <input type="text" placeholder='password' />
            <button className='primary'>Login</button>
            <div className='mt-2 text-center'>Already have an account? <Link to="/login" className='text-blue-800 underline'>Login</Link></div>
        </form>
    
    </div>
  )
}

export default Regitser