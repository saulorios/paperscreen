import React from 'react'
import { Link } from 'react-router-dom'

function Card(props) {
    return (
        <div className="col-sm-2">                                
            <div key={props.id} className="cardact">
                <div className="cardact-image">
                    <img src={
                        props.profile_path
                        ? `https://image.tmdb.org/t/p/w500${props.profile_path}`
                        : "https://sd.keepcalms.com/i/keep-calm-poster-not-found.png"} className="card-img-top" alt="..."/>
                </div>
                <div className="cardact-desc">
                    <h6><strong>{props.original_name}</strong></h6>
                    <p>{props.character}</p>
                </div>
            </div>
        </div>
    )
}
export default Card