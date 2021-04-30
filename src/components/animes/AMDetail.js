import React from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios'
import Card from './Card'
import NavBar from './NavBar'
import Footer from '../Footer'

class AMDetail extends React.Component {
    state = {
        item: [],
        genres: [],
        recommendations: [],
        images: [],
    }
    componentDidMount = async () => {
        this.simLink()
    }
    componentDidUpdate = async (prevProps) =>{
        if(prevProps.match.params.id !== this.props.match.params.id){
            this.simLink()
        }
    }
    simLink = async () =>{
        try{
            const response = await axios.get(`https://api.jikan.moe/v3/anime/${this.props.match.params.id?this.props.match.params.id:this.props.match.params.mal_id}`)
            const imagesDetail = await axios.get(`https://api.jikan.moe/v3/anime/${this.props.match.params.id}/pictures`)
            const recommendations = await axios.get(`https://api.jikan.moe/v3/anime/${this.props.match.params.id}/recommendations`)
            // const genres = await axios.get(`https://api.themoviedb.org/3/${this.props.match.params.type}/${this.props.match.params.id}/watch/providers?api_key=bf5873e6f459f48640236455c6fc00a7`)
            // console.log(recommendations)
            this.setState({item: response.data})
            this.setState({genres: response.data.genres})
            this.setState({images: imagesDetail.data.pictures})
            this.setState({recommendations: recommendations.data.recommendations})
        }catch(err){
            console.log(err)
        }
    }
    render(){ 
        // console.log(this.state.recommendations)
        return (<div className='geral'>
            <NavBar />
            <div className="container">
            <div className='detail'>
                <div className='banner-anime-detail'> 
                    <img src={this.state.item.image_url}/>
                    <div className='banner-title'>
                        <div className='title-anime-detail'>
                            <h1><strong>{this.state.item.title}</strong> <small>({this.state.item.premiered})</small></h1>
                        </div>
                        <div className='title-anime-detail'>
                            <p>{this.state.item.rating}</p>
                            <ul>
                                {this.state.genres.map((index)=>{
                                    return(
                                        <li>{index.name}</li>
                                    )
                                })}
                            </ul>
                            <span>Epsódios: {this.state.item.episodes}</span><br/>
                            <span>Duração: {this.state.item.duration}</span><br/>
                            <span>Tipo: {this.state.item.source}</span><br/>
                            <span>Status: {this.state.item.status}</span>
                        </div>
                    </div>
                </div>
                <div style={{padding: '30px'}}>
                    <div className='overview'>
                        <h2>Sinopse</h2>
                        <p>{this.state.item.synopsis}</p>
                    </div>
                    <div className='scroll-acting'>
                          
                    </div>
                    <div className='providers-details'>
                          
                    </div>
                    <div className='subtitle-detail'>
                        <h3><strong>Imagens</strong></h3>
                    </div>
                    <div className='images-details'>
                           {this.state.images.map((img)=>{
                               return(
                                <div key={img.large} className='images'>
                                    <img src={img.small} />
                                </div>
                               )
                           })}
                    </div>
                    <div className='subtitle-detail'>
                        <h3><strong>Recomendações</strong></h3>
                    </div>
                    <div className='images-details'>
                        {this.state.recommendations.map((recom)=>{
                            return(
                                <Link to={`/anime/${recom.mal_id}`}>
                                    <div key={recom.mal_id} className='reco'>
                                        <img src={recom.image_url} />
                                    </div>
                                </Link>
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
export default AMDetail

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