import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import Card from './animes/Card'
import NavBar from './animes/NavBar'
import Footer from './Footer'

class Animes extends React.Component {
    state = {
        animes: [],
    }

    componentDidMount = async () => {
        try{
            const response = await axios.get("https://api.jikan.moe/v3/top/anime")
            // console.log(response.data.top)
            this.setState({animes: response.data.top})
        }catch(err){
            console.log(err)
        }
    }
    render(){
        // console.log(this.state.animes)
        return (
            <div className='geral'>  
                <NavBar/>     
                {/* <nav className="navbar navbar-expand-lg navbar-light bg-dark menu">
                    <h3 style={{marginRight: '50px', color: 'orange'}}>PaperScreen <small>Animes</small></h3>            
        
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link style={{color: 'orange'}} className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link style={{color: 'orange'}} className="nav-link" to="/series">Séries</Link>
                            </li>
                            <li className="nav-item">
                                <Link style={{color: 'orange'}} className="nav-link" to="/animes">Animes</Link>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <Link style={{color: 'orange'}} className="btn btn-ligth my-2 my-sm-0" to='#' >Search</Link>
                        </form>
                    </div>
                    </nav> */}
                    <div className="container">
                        <div className='title'>
                            <h3>Popular Animes</h3>
                        </div>
                        <div className='row'>
                            <div className='col-sm-12'>
                                <div className="row">
                                    {this.state.animes.map((anime)=>{
                                        return(
                                            <Card
                                                mal_id={anime.mal_id}
                                                image_url={anime.image_url}
                                                title={anime.title}
                                                start_date={anime.start_date}
                                                type={anime.type}
                                            />
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                <Footer />                    
            </div>
        )
    }
}
export default Animes