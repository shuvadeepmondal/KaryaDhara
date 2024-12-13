import React, { useState } from 'react';
// import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Login: React.FC = () => {
  const router = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    console.log('Login:', { email, password });
    try {
      // const res = await axios.post("localhost:3000/login",{
      //   email : email,
      //   password : password
      // });
      toast.success("Login Successful!",{position: "top-center"});
      router('/dashboard')

    } catch (error) {
      toast.error("Login Failed!",{position: "top-center"});
    }
    // toast.success("Login Successfull!",{ position: 'top-center',})
    // toast.error("Login Successfull!",{ position: 'top-center',})

  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-cover bg-center relative">
      <div className="relative bg-white bg-opacity-5 backdrop-blur-md p-5 rounded-3xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center ">Welcome <span className='text-purple-500'>Back</span> !</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Enter Your Email</label>
          <input
            type="email"
            className="w-full px-3 py-1 border text-black rounded-xl focus:outline-none focus:ring focus:ring-purple-500"
            placeholder='example@gmail.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Enter Your Password</label>
          <input
            type="password"
            className="w-full px-3 py-1 text-black border rounded-xl focus:outline-none focus:ring focus:ring-purple-500"
            placeholder='XXXXXXXXXX'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-purple-500 text-white py-2 hover:bg-purple-700 transition rounded-2xl mt-5"
        >
          Login
        </button>
        <p className="text-sm font-semibold mt-3 text-center justify-between">
          Don't have an account?{' '}
          <Link to="/register" className="text-purple-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
