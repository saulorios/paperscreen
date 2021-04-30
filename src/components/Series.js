import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import Card from './Card'
import NavBar from './NavBar'
import Footer from './Footer'

class Series extends React.Component {
    state = {
        series: [],
    }

    componentDidMount = async () => {
        try{
            const response = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=bf5873e6f459f48640236455c6fc00a7&language=pt-BR&page=1`)
            console.log(response.data)
            this.setState({series: [...response.data.results]})
        }catch(err){
            console.log(err)
        }
    }
    render() {
        return (<div className='geral'>
            <NavBar />
            <div className="container">
            <div className='title'>
                <h3>Popular Series</h3>
            </div>
            <div className='row'>
                <div className='col-sm-12'>
                <div className='row'>
                    {this.state.series.map((serie)=>{
                        return(
                            <Card
                                id={serie.id}
                                poster_path={serie.poster_path}
                                name={serie.name}
                                first_air_date={serie.first_air_date}
                                type='tv'
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
export default Series
