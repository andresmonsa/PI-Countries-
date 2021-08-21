import React from 'react'
import NavBar from '../Nav/NavBar';
import Express from './Img/express.svg'
import Postgres from './Img/postgres.svg'
import ReactSvg from './Img/react.svg'
import Redux from './Img/redux.svg'
import Sequelize from './Img/sequelize.svg'
import Linkedin from './Img/linkedin.svg'
import Gmail from './Img/gmail.svg'
import Github from './Img/github.svg'
import about from './About.module.css'


const About = () => {
    return (
        <div >
            <NavBar />
            <div className={about.Background}>
                <div className={about.Title}>
                    <h1 >Thanks for visiting this page! </h1>
                    <p>This page was created for an individual work, proposed to us by the Soy Henry Bootcamp.</p>
                </div>

                <h2>Using the following technologies:</h2>
                <div className={about.technologiesDiv}>
                    <img className={about.technologies} alt="ExpressImg" src={Express}></img>
                    <img className={about.technologies} alt="PostgresImg" src={Postgres}></img>
                    <img className={about.technologies} alt="ReactSvg" src={ReactSvg}></img>
                    <img className={about.technologies} alt="ReduxImg" src={Redux}></img>
                    <img className={about.technologies} alt="SequelizeImg" src={Sequelize}></img>
                </div>

                <div className="About-Me">
                    <h2 className="About-Text">My social networks and where to contact me.</h2>
                    <a href="https://www.linkedin.com/in/andr%C3%A9s-monsalbe-65130ab7/" target="_blank" rel="noreferrer"> <img className={about.links} alt="LinkedinImg" src={Linkedin}></img> </a>
                    <a  href="mailto:monsalbefotografia@gmail.com.com" target="_blank" rel="noreferrer"> <img className={about.links} alt="GmailImg" src={Gmail}></img> </a>
                    <a href="https://github.com/andresmonsa/" target="_blank" rel="noreferrer"> <img className={about.links} alt="Github" src={Github}></img> </a>
                </div>
            </div>

            <h3 className="Bottom-About">A site created by Andrés Monsalbe</h3>
        </div>
    )
}

export default About
