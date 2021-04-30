import React from 'react'
import Card from '../Card'
import axios from 'axios'
import NavBar from '../NavBar'
import Footer from '../Footer'

class Results extends React.Component {
    state = {
        resultsList: [],
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
            const response = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=bf5873e6f459f48640236455c6fc00a7&query=${encodeURIComponent(this.props.match.params.typing)}&page=1&include_adult=false`)              
            console.log(response)
            this.setState({resultsList: [...response.data.results]})
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
                    {this.state.resultsList.map((lists)=>{
                        return(<Card 
                            id={lists.id}
                            poster_path={lists.poster_path}
                            original_title={lists.original_title? lists.original_title : lists.name}
                            release_date={lists.release_date?lists.release_date:lists.first_air_date}
                            type={lists.media_type}
                        />)
                    })}
                </div>
            </div>
            <Footer />
            </div>
        )
    }
}
export default Results