import React from 'react'
import { Link } from 'react-router-dom'

function Card(props) {
    
    return (
        <div className="col-sm-2">                                
            <div key={props.mal_id} className="cardms">
                <div className="cardms-image">
                <Link to={`/anime/${props.mal_id}`}>
                    <img src={props.image_url} className="card-img-top" alt="..."/>
                </Link>
                </div>
                <div className="cardms-desc">
                    <h6><strong>
                    <Link to={`/anime/${props.mal_id}`}>{props.title}</Link>
                    </strong></h6>
                    <p>{new Date(props.start_date).getFullYear()}</p>
                </div>
            </div>
        </div>
    )
}
export default Card