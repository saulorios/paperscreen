import React from 'react'
import Card from './Card'
import axios from 'axios'
import NavBar from './NavBar'
import Footer from '../Footer'

class Aresults extends React.Component {
    state = {
        results: [],
    }
    componentDidMount = async () => {
        console.log(this.props)
        this.searchData()                 
    } 
    componentDidUpdate = async (prevProps) =>{
        if(prevProps.match.params.typing !== this.props.match.params.typing){
            this.searchData()
        }
    } 
    searchData = async () => {
        try{
            const response = await axios.get(`https://api.jikan.moe/v3/search/anime?q=${encodeURIComponent(this.props.match.params.typing)}`)              
            console.log(response)
            this.setState({results: [...response.data.results]})
        }catch(err){
            console.log(err)
        }   
    }  
    render(){
        return(
            <div className='geral'>
                <NavBar />
            <div className="container">
               <div className='title'>
                    <h3>{`Termo pesquisado "${this.props.match.params.typing ? this.props.match.params.typing:'termo não encontrado'}"`}</h3>
                </div>
                <div className='row'>
                    {this.state.results.map((lists)=>{
                        return(<Card 
                            mal_id={lists.mal_id}
                            image_url={lists.image_url}
                            title={lists.title}
                            start_date={lists.start_date}
                            type={lists.type}
                        />)
                    })}
                </div>
            </div>
            <Footer />
            </div>
        )
    }
}
export default Aresults