import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux';

function Header() {
  const {currentUser} = useSelector(state=>state.user); 
  return (
    <header className="bg-slate-200 shadow-md ">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="text-sm sm:text-xl flex font-bold gap-1 flex-wrap">
            <span className="text-slate-400 ">Watalcom</span>
            <span className="text-slate-800">Centre</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          {" "}
          <input
            type="text"
            placeholder="Search"
            id="search"
            className="focus:outline-none bg-transparent w-24 sm:w-80 "
          />
          <FaSearch className="cursor-pointer text-slate-600" />
        </form>
        <ul className="flex gap-2">
          <Link to="/">
            <li className="hover:underline hidden sm:inline cursor-pointer">
              home
            </li>
          </Link>
          <Link to="/About">
            <li className="hover:underline hidden sm:inline cursor-pointer">
              About
            </li>
          </Link>
          
          <Link to="/profile">

          {currentUser ? (<img className="w-6 h-6 rounded-full object-cover flex items-center"  src={currentUser.avatar} alt="profile" /> ): <li className="hover:underline  cursor-pointer">Signin</li> }
            
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
