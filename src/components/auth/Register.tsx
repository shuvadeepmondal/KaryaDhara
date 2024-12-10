import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';


const Register: React.FC = () => {
  const router = useNavigate();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRegister = () => {
    console.log('Register:', { name, email, password });
    try {
      toast.success("Registered Successful!",{position: "top-center"});
      router('/login')

    } catch (error) {
      toast.error("Registration Failed!",{position: "top-center"});
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-cover bg-center relative">
      <div className="absolute inset-5 bg-black bg-opacity-20"></div>
      <div className="relative bg-white bg-opacity-5 backdrop-blur-md p-5 rounded-3xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Create an <span className='text-purple-500'>Account</span></h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Enter Your Name</label>
          <input
            type="text"
            className="w-full px-3 py-1 text-black border rounded-xl focus:outline-none focus:ring focus:ring-purple-500"
            placeholder='eg. John Doe'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Enter Your Email</label>
          <input
            type="email"
            className="w-full px-3 py-1 text-black border rounded-xl focus:outline-none focus:ring focus:ring-purple-500"
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
            placeholder='XXXXXXXXXXXXXXXXXX'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          onClick={handleRegister}
          className="w-full bg-purple-500 text-white py-2 mt-5 rounded-2xl hover:bg-purple-600 transition"
        >
          Register
        </button>
        <p className="text-sm mt-4 text-center font-semibold ">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
