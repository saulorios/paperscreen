import React from 'react'
import { Link } from 'react-router-dom'

function Card(props) {
    return (
        <div className="col-sm-2">                                
            <div key={props.id} className="cardms">
                <div className="cardms-image">
                <Link to={`/detail/${props.type}/${props.id}`}>
                    <img src={
                        props.poster_path
                        ? `https://image.tmdb.org/t/p/w500${props.poster_path}`
                        : "https://sd.keepcalms.com/i/keep-calm-poster-not-found.png"} className="card-img-top" alt="..."/>
                </Link>
                </div>
                <div className="cardms-desc">
                    <h6><strong>
                    <Link to={`/detail/${props.type}/${props.id}`}>{props.original_title?props.original_title:props.name}</Link>
                        </strong></h6>
                    <p>{props.release_date ? new Date(props.release_date).getFullYear() : new Date(props.first_air_date).getFullYear()}</p>
                </div>
            </div>
        </div>
    )
}
export default Card