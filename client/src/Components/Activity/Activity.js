import act from './Activity.module.css'
import { NavLink } from 'react-router-dom'

export default function Activities(props) {
    // console.log(props.countries)
    return (

        <div className={act.actDet}>
            <br></br>
            <p> <span className={act.span}>Name: </span>   {props.name}</p>
            <p> <span className={act.span}>Duration: </span>   {props.duration}</p>
            <p> <span className={act.span}>Season: </span> {props.season}</p>
            <div>
                <h5> Countries:</h5>

                {/* {!Array.isArray(props.countries) ?
                    <div className={act.countries} key='det'>
                        <p> {props.name}</p>
                        <img src={props.flagImg} className={props.flagImg} />

                    </div>    : null
            } */}
                { props.countries.length > 0 ?
                    props.countries.map((el,i) => (
                        <NavLink to={`/country/${el.code}`}  key={el.name + i + 'nav'} >
                            <div className={act.countries} key={el.name + i}>
                                <p> {el.name}</p>
                                <img src={el.flagImg} className={act.flagImg} />

                            </div>
                        </NavLink>
                    ))
                    : null}

            </div>
            <br></br>
        </div>
    )
}