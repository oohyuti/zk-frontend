import React from 'react'
import { Route, Routes, HashRouter } from 'react-router-dom'
import Subscribe from '../pages/Subscribe'
import Transfer from '../pages/Transfer'


const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Subscribe />} path='/' />
        <Route element={<Transfer />} path='/Transfer' />
      </Routes>
    </HashRouter>
  )
}

export default Router