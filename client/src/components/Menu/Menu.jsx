import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Main</Link>
        </li>
        <li>
          <Link to="/addBeerOrBrand">Add Beer or Brand</Link>
        </li>
        <li>
          <Link to="/moreAboutBeer">More about Beer</Link>
        </li>
        <li>
          <Link to="/find">Find a Beer</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Menu
