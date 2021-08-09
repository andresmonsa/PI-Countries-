import './Country.css'

export default function Country(props) {

    return (
        <div className='container'>
            <h2>{props.name}</h2>
            <img className="flag" src={props.flag} alt="flag" />
            <h3>Region :{props.region}</h3>
        </div>
    )
}