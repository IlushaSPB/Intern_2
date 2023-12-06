import {useContext} from 'react'
import { jwtDecode } from "jwt-decode"
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'

function Navbar() {

  const {user, logoutUser} = useContext(AuthContext)
  const token = localStorage.getItem("authTokens")

  if (token){
    const decoded = jwtDecode(token)
    var user_id = decoded.user_id
  }

  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
        <div class="container-fluid">

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/musician">Musician List</a>
              </li>

              {token === null &&
              <>
                <li class="nav-item">
                  <Link class="nav-link" to="/login">Login</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/register">Register</Link>
                </li>
              </>
              }

            {token !== null &&
              <>
                <li class="nav-item">
                  <a class="nav-link" href="/profile">Profile</a>
                </li>
                <li class="nav-item">
              <a class="nav-link" onClick={logoutUser} style={{cursor:"pointer"}}>Logout</a>
                </li>
              </>
              }

            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar