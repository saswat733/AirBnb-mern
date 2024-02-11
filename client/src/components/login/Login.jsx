import axios from 'axios'
import React,{useState} from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [username, setusername] = useState('')
  const [error, seterror] = useState(null)
  const [success, setsuccess] = useState(false)

  const handleLogin=async (e)=>{
    e.preventDefault();
    try {
      const response=await axios.post("http://localhost:8000/api/v1/users/login",{
        username,
        password,
        email,
      });
      console.log('login successfull:',response.data)
      setsuccess(true);
      seterror(null);
    } catch (error) {
      console.log('login failed:',error);
      seterror('Login failed. Please try again!')
    }
  }
  return (
    <div className='mt-4'>
        <h1 className='text-center text-4xl uppercase'>Login</h1>
        <form onSubmit={handleLogin} action="submit" className='flex flex-col max-w-md mx-auto'>
            <input type="text" placeholder='username' value={username} onChange={(e)=>setusername(e.target.value)}/>
            <input type="text" placeholder='your@gmail.com' value={email} onChange={(e)=>setemail(e.target.value)}/>
            <input type="text" placeholder='password' value={password} onChange={(e)=>setpassword(e.target.value)}/>
            {error && <div className='text-red-500'>{error}</div>}
            {success && (<div className='text-green-600'>Login successfull</div>)}
            <button className='primary'>Login</button>

            <div className='mt-2 text-center'>Don't have an account? <Link to="/register" className='text-blue-800 underline'>Register</Link></div>
        </form>
    
    </div>
  )
}

export default Login