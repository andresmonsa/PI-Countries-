import act from './Activity.module.css'
import { NavLink } from 'react-router-dom'

export default function Activities (props) {
  return (

    <div className={act.actDet}>
      <br />
      <p> <span className={act.span}>Name: </span>   {props.name}</p>
      <p> <span className={act.span}>Duration: </span>   {props.duration}</p>
      <p> <span className={act.span}>Season: </span> {props.season}</p>
      <p> <span className={act.span}>Difficulty: </span> {props.difficulty}</p>
      <div>
        <h3> Countries:</h3>

        {props.countries.length > 0
          ? props.countries.map((el, i) => (
            <NavLink to={`/country/${el.code}`} key={el.name + i + 'nav'}>
              <div className={act.countries} key={el.name + i}>
                <p> {el.name}</p>
                <img src={el.flagImg} className={act.flagImg} alt={`${el.flagImg}img`} />

              </div>
            </NavLink>
            ))
          : null}

      </div>
      <br />
    </div>
  )
}
