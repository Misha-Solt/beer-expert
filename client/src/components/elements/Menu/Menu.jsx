import { NavLink } from 'react-router-dom'
import { FaBeer, FaHome, FaQuestion, FaSearch } from 'react-icons/fa'

import { useState } from 'react'
import './menu.css'

const Menu = () => {
  const [activeMenu, setActiveMenu] = useState(true)

  const handleClick = () => {
    setActiveMenu(!activeMenu)
  }

  return (
    <nav className={activeMenu ? 'menu' : 'menu active'}>
      <div className="hamburger" onClick={handleClick}></div>
      <div className="list">
        <NavLink className="navLink" to="/" end>
          <div className="element">
            <span className="icon">
              <FaHome />
            </span>
            <span className="text">Home</span>
          </div>
        </NavLink>
        <NavLink className="navLink" to="/addBeerOrBrand">
          <div className="element">
            <span className="icon">
              <FaBeer />
            </span>
            <span className="text">Add beer</span>
          </div>
        </NavLink>
        <NavLink className="navLink" to="/moreAboutBeer">
          <div className="element">
            <span className="icon">
              <FaQuestion />
            </span>
            <span className="text">More...</span>
          </div>
        </NavLink>
        <NavLink className="navLink" to="/find">
          <div className="element">
            <span className="icon">
              <FaSearch />
            </span>
            <span className="text">Find</span>
          </div>
        </NavLink>
      </div>
    </nav>
  )
}

export default Menu
