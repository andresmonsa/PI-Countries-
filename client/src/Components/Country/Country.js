import './Country.css'

export default function Country(props) {
// console.log(props)
    return (
        <div className='container'>
            <div  className="name" ><h3>{props.name}</h3></div>
            <img className="flag" src={props.flag} alt="flag" />
            <h4>Region: {props.region}</h4>
        </div>
    )
}