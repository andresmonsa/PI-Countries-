import './Country.css'

export default function Country(props) {
// console.log(props)
    return (
        <div className='container'>
            <h3>{props.name}</h3>
            <img className="flag" src={props.flag} alt="flag" />
            <h4>Region: {props.region}</h4>
        </div>
    )
}