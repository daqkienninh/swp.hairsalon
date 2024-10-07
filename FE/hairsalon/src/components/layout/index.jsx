import React from 'react'
import Header from '../header'
import { Outlet } from 'react-router-dom'
import Footer from '../footer'

function Layout() {
  return (
    <div>
        <Header/>
        <div
            className='main-content'
            style={
                {
                    padding: 20,
                    minHeight: "100vh"
                }
            }
        >
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default Layout