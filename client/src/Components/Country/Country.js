import country from './Country.module.css'

export default function Country(props) {
// console.log(props)
    return (
        <div className={country.container}>
            <div  className={country.name} ><h3>{props.name}</h3></div>
            <img className={country.flag} src={props.flag} alt="flag" />
            <h4>Region: {props.region}</h4>
        </div>
    )
}