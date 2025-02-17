import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import My_collection from '../pages/My_collection'
import Games from '../pages/Games'
import News from '../pages/News'
import PortadasBuenas from '../pages/PortadasBuenas'

const My_routes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/Mycollection' element={<My_collection />}/>  
        <Route path='/games' element={<Games />}/>  
        <Route path='/noticias' element={<News />}/>  
        <Route path='/portadasbuenas' element={<PortadasBuenas />}/>  
        <Route path='*' element={<Home />} />
    </Routes>
  )
}

export default My_routes

