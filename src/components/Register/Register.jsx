import axios from 'axios';
import Joi from 'joi';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom' ;

export default function Register() {
  const [errorList, setErrorList] = useState([]); 
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    age: 0,
    email: '',
    password: '',

  });

  function getUser(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
    console.log(user);
  }

  async function submitRegister(e) {
    e.preventDefault();
    setIsLoading(true)
    let validationResult = validateRegisterForm(user);
    if (validationResult.error) {
      setIsLoading(false)
      setErrorList(validationResult.error.details)
      ///list all errors
    }
    else {
      let { data } = await axios.post(`https://route-egypt-api.herokuapp.com/signup`, user)
      if (data.message === 'success') {
        setIsLoading(false)
        navigate('/login')
        // Navigate to login
      }
      else {
        setError(data.message)
        setIsLoading(false)
      }
    }

  }

  function validateRegisterForm(user) {
    let schema = Joi.object({
      first_name: Joi.string().min(3).max(10).required(),
      last_name: Joi.string().min(3).max(10).required(),
      age: Joi.number().min(16).max(80).required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().pattern(/^[A-Z][a-z]{3,10}$/)
    });
    return schema.validate(user ,{abortEarly: false});
  }


  return (
    <div>

      <h2 className='my-3'>Register Now</h2>
      {errorList.map((error,index)=>{
        if(index === 4){
          return  <div key={index} className="alert alert-danger"> password invalid </div>
        }
        else{
         return  <div key={index} className="alert alert-danger"> {error.message}</div>
        }


   
      } 
   )}
      {error ? <div className=" alert alert-danger">{error}</div> : ''}

      <form className='py-4' onSubmit={submitRegister}>
        <label htmlFor='first_name'>first_name :</label>
        <input onChange={getUser} type="text" className='form-control my-3' name='first_name' id='first_name' />

        <label htmlFor='last_name'>last_name :</label>
        <input onChange={getUser} type="text" className='form-control my-3' name='last_name' id='last_name' />

        <label htmlFor='age'>age :</label>
        <input onChange={getUser} type="number" className='form-control my-3' name='age' id='age' />

        <label htmlFor='email'>email :</label>
        <input onChange={getUser} type="email" className='form-control my-3' name='email' id='email' />

        <label htmlFor='password'>password :</label>
        <input onChange={getUser} type="password" className='form-control my-3' name='password' id='password' />

        <button type='submit' className='btn btn-outline-info'>
          {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'register'}
        </button>

      </form>

    </div>
  )
}
