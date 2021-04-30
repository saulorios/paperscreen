import React from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios'
import Card from './Card'
import NavBar from '../NavBar'
import Footer from '../Footer'

class Detail extends React.Component {
    state = {
        item: [],
        genres: [],
        creditsCast: [],
        providers: [],
        images: [],
        similar: [],
        loading: false,
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
        this.setState({loading: true})
        try{
            const response = await axios.get(`https://api.themoviedb.org/3/${this.props.match.params.type}/${this.props.match.params.id}?api_key=bf5873e6f459f48640236455c6fc00a7&language=pt-BR&page=1`)
            const respActing = await axios.get(`https://api.themoviedb.org/3/${this.props.match.params.type}/${this.props.match.params.id}/credits?api_key=bf5873e6f459f48640236455c6fc00a7&language=pt-BR`)
            const providers = await axios.get(`https://api.themoviedb.org/3/${this.props.match.params.type}/${this.props.match.params.id}/watch/providers?api_key=bf5873e6f459f48640236455c6fc00a7`)
            const imagesDetail = await axios.get(`https://api.themoviedb.org/3/${this.props.match.params.type}/${this.props.match.params.id}/images?api_key=bf5873e6f459f48640236455c6fc00a7`)
            const similar = await axios.get(`https://api.themoviedb.org/3/${this.props.match.params.type}/${this.props.match.params.id}/similar?api_key=bf5873e6f459f48640236455c6fc00a7&language=pt-BR&page=1`)

            console.log(providers)
            this.setState({item: response.data})
            this.setState({genres: response.data.genres})
            this.setState({creditsCast: respActing.data.cast})
            this.setState({images: imagesDetail.data.backdrops})
            this.setState({similar: similar.data.results})
            this.setState({providers: providers.data.results.BR.rent ? providers.data.results.BR.rent : (providers.data.results.BR.flatrate?providers.data.results.BR.flatrate: [])})
            this.setState({loading: false})
        }catch(err){
            console.log(err)
        }
    }
    render(){ 
        // console.log(this.state.similar.id)
        return (<div className='geral'>
            <NavBar />
            {this.state.loading 
            ? (<div className="spinner-border" id='load' role="status">
                <span className="sr-only">Loading...</span>
                </div>)
            : (<div className="container">
            <div className='detail'>
                <div className='banner-detail'> 
                    <img src={`https://image.tmdb.org/t/p/w500${this.state.item.backdrop_path}`}/>
                </div>
                <div style={{padding: '30px'}}>
                    <div className='title-detail'>
                        <h1><strong>{this.state.item.original_title?this.state.item.original_title:this.state.item.name}</strong> <small>({this.state.item.release_date ? new Date(this.state.item.release_date).getFullYear() : new Date(this.state.item.first_air_date).getFullYear()})</small></h1>
                    </div>
                    <div className='title-info'>
                        <ul>
                            {this.state.genres.map((genre)=>{
                                return(
                                    <li key={genre.id}>{genre.name}</li>
                                )
                            })}          
                        </ul>
                    </div>
                    <div className='overview'>
                        <h2>Sinopse</h2>
                        <p>{this.state.item.overview}</p>
                    </div>
                    <div className='scroll-acting'>
                           {this.state.creditsCast.map((acting)=>{
                               return(
                                <Card 
                                key={acting.id}
                                profile_path={acting.profile_path}
                                original_name={acting.original_name}
                                character={acting.character}
                                />   
                               )
                           })}  
                    </div>
                    <div className='subtitle-detail'>
                        <h3><strong>Disponível</strong></h3>
                    </div>
                    <div className='providers-details'>
                           {this.state.providers.map((provider) =>{return(
                                   <div key={provider.provider_id} className='card-provider'>
                                       <img src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`} />
                                   </div>
                               )
                           })}
                    </div>
                    <div className='subtitle-detail'>
                        <h3><strong>Imagens</strong></h3>
                    </div>
                    <div className='images-details'>
                           {this.state.images.map((img)=>{
                               return(
                                <div key={img.aspect_ratio?img.aspect_ratio:img.file_path}>
                                    <img src={`https://image.tmdb.org/t/p/w500${img.file_path}`} />
                                </div>
                               )
                           })}
                    </div>
                    <div className='subtitle-detail'>
                        <h3><strong>Similares</strong></h3>
                    </div>
                    <div className='images-details'>
                        {this.state.similar.map((sim)=> {
                            return(
                                <Link to={`/detail/${this.props.match.params.type}/${sim.id}`}>
                                    <div key={sim.id} className='card-similar'>
                                        <div className='card-similar-img'>
                                            <img src={
                                                sim.backdrop_path
                                                ? `https://image.tmdb.org/t/p/w500${sim.backdrop_path}`
                                                : "https://sd.keepcalms.com/i-w600/keep-calm-poster-not-found-2.jpg"} />
                                        </div>
                                            <p>{sim.title?sim.title:sim.name}</p>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
            </div>)}
            <Footer />
            </div>
        )
    }
}
export default Detail