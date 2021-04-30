import React from 'react'
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
    state = {
        typing: '',
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }
    render(){
        return (
            <div>        
            <nav className="navbar navbar-expand-lg navbar-light bg-light menu">
                <h3 style={{marginRight: '50px'}}>PaperScreen</h3>            
    
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/series">Séries</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/animes">#ANIMES#</Link>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" name='typing' onChange={this.handleChange} aria-label="Search" />
                    <Link className="btn btn-light my-2 my-sm-0" to={`/search/${this.state.typing}`} >Search</Link>
                    </form>
                </div>
                </nav>
        </div>
        )
    }
}
export default NavBar