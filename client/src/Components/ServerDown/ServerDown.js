import './ServerDown.css'
import cat from './500.jpg'
export default function ServerDown() {

    return (
        <div className='serverDown'>
            {/* <div className='error' /> */}
            <img src={cat} alt='Server Down' className='cat'   ></img>
        </div>
    )
}