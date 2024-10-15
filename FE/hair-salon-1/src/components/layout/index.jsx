import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/footertop'
import Header from '../header/headertop'
import HeaderBottom from '../header/headerbottom'
import FooterBottom from '../footer/footerbottom'

function Layout() {
  return (
    <div>
        <Header/>
        <HeaderBottom/>
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
        <FooterBottom/>
    </div>
  )
}

export default Layout