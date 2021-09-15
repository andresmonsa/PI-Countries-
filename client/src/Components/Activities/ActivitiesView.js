import Activity from '../Activity/Activity'
import acts from './Activities.module.css'
import NavBar from '../Nav/NavBar'

export default function ActivitiesView ({ options, handleSelect, countries, actualPage }) {
  return (

    <div>
      <NavBar />
      <input
        type='text'
        className='input-text'
        placeholder='Search Activity'
        name='activity'
        value={options.activity}
        onChange={handleSelect}
        autoComplete='off'
      />

      <label htmlFor='season'>Choose a Season :</label>
      <select name='season' id='season' onChange={handleSelect} value={options.season}>
        <option value='All'>All</option>
        <option value='winter'>Winter</option>
        <option value='autumn'>Autumn</option>
        <option value='spring'>Spring</option>
        <option value='summer'>Summer</option>
      </select>

      <label>Dificulty</label>
      <select name='difficulty' id='difficulty' onChange={handleSelect} value={options.difficulty}>
        <option value='All'>All</option>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
      </select>

      <label>Select Country</label>
      <select name='country' id='Country' onChange={handleSelect} value={options.country}>
        <option value='All'>All</option>
        {countries && countries.map(el => (<option value={el.code} key={el.code}>{el.name}</option>))}
      </select>

      <div className={acts.activities}>

        {actualPage !== 'undefined' && actualPage.length === 0
          ? <h2 className={acts.non}>Not Activities Created Yet</h2>
          : actualPage.map((el, i) => (
            <Activity
              key={el.name + i}
              name={el.name}
              duration={el.duration}
              season={el.season}
              countries={el.countries}
              difficulty={el.difficulty}
            />
          ))}

      </div>
    </div>

  )
}
