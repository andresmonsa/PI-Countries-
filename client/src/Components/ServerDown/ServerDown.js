import './ServerDown.css'

import Err from './Err.gif'
export default function ServerDown() {

    return (
        <div className='serverDown'>
                <h1 className='msg'>Error in server, please try later... </h1>
            <img src={Err} alt='Server Down' className='err'   ></img>
        </div>
    )
}