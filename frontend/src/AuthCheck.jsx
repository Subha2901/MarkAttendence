import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthCheck = (props) => {
  const { Component } = props
  const navigate = useNavigate()

  
  useEffect(() => {
    console.log(typeof(localStorage.getItem('isAuthenticated')))

    if(!localStorage.getItem('isAuthenticated') || localStorage.getItem('isAuthenticated') === 'false'){
      console.log('IsAthenticated is false');
      navigate('/login')
    }
  }, [])

  return (
    <div>
      <Component />
    </div>
  )
}

export default AuthCheck
