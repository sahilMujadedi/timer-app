import './styles/Navbar.css'

const Navbar = () => {
  return ( 
    <div className="navbar">
      <ul className="navbar-items">
        <li className="navbar-item title">timer-app</li>
        <li className="navbar-item navbar-link"><a href='https://github.com/sahilMujadedi/timer-app' target='_blank' title='Opens in a New Tab'>GitHub</a></li>
        <li className="navbar-item navbar-link">About</li>
        <li className="navbar-item navbar-link">Contact</li>
      </ul>
    </div>
  );
}
 
export default Navbar;