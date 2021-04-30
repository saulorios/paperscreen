import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import Card from '../components/Card'
import NavBar from './NavBar'
import Footer from './Footer'

class Home extends React.Component {
    state = {
        movies: [],
    }

    componentDidMount = async () => {
        try{
            const response = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=bf5873e6f459f48640236455c6fc00a7&language=en-US&page=1")
            // console.log(response.data)
            this.setState({movies: [...response.data.results]})
        }catch(err){
            console.log(err)
        }
    }
    
    render(){
        return (
            <div className='geral'>
                <NavBar />
                <div className="container">
   
                <div className='title'>
                    <h3>Popular Movies</h3>
                </div>
                <div className='row'>
                    <div className='col-sm-12'>
                        <div className="row">
                            {this.state.movies.map((movie)=>{
                                return(
                                <Card 
                                    id={movie.id}
                                    poster_path={movie.poster_path}
                                    original_title={movie.original_title}
                                    release_date={movie.release_date}
                                    type='movie'
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
export default Home
