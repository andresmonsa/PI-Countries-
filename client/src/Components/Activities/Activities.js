import acts from './Activities.module.css'
import NavBar from '../Nav/NavBar'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Activity from '../Activity/Activity'

export default function Activities() {

    const [activities, setActivities] = useState([])

    useEffect(() => {
        try {
            const data = async () => {
                let json = await axios('http://localhost:3001/activities/')
                // console.log(json.data)
                setActivities(json.data)
            }
            data()

        } catch (e) {
            console.log('No se puede acceder a la base de datos')
        }
    }, [])


    return (
        <div>
            <NavBar />
            <div className={acts.activities}>
                {activities.length === 0 ? <h2 className={acts.non}>Not Activities Created Yet</h2> :
                    activities.map((el, i) => (
                        <Activity key={el.name + i} name={el.name} duration={el.duration} season={el.season} countries={el.countries} />
                    ))
                }


            </div>
        </div>

    )
}