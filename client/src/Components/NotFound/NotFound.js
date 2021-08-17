import nf from './NotFound.module.css'

import notfound from './nf.png'
export default function NotFound() {

    return (
        <div className='serverDown'>
                <h1 className={nf.msg} > 404. URL NOT FOUND </h1>
            <img src={notfound} alt='Server Down'className={nf.err}   ></img>
        </div>
    )
}