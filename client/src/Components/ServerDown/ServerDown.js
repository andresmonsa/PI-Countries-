import server from './ServerDown.module.css'

import Err from './Err.gif'
export default function ServerDown() {

    return (
        <div className={server.serverDown}>
                <h1 className={server.msg}>Error in server, please try later... </h1>
            <img src={Err} alt='Server Down' className={server.err}   ></img>
        </div>
    )
}