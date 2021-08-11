import React from 'react'
import './About.css'
import NavBar from '../Nav/NavBar';

import Express from './Img/express.svg'
import Postgres from './Img/postgres.svg'
import ReactSvg from './Img/react.svg'
import Redux from './Img/redux.svg'
import Sequelize from './Img/sequelize.svg'
import Linkedin from './Img/linkedin.svg'
import Gmail from './Img/gmail.svg'
import Github from './Img/github.svg'


const About = () => {
    return (
        <div className="About">
              <NavBar/>
                    <div className="About-Background">
            <div className="About-Title">
                <h1 >Thanks for visiting this page! </h1>
                <p>This page was created for an individual work, proposed to us by the Soy Henry Bootcamp.</p>
            </div>
                        
                        <h1 className="About-Text">Using the following technologies:</h1>
                        <div className="technologies-div">
                            <img  className="technologies" alt="ExpressImg" src={Express}></img>
                            <img  className="technologies" alt="PostgresImg" src={Postgres}></img>
                            <img  className="technologies" alt="ReactSvg" src={ReactSvg}></img>
                            <img  className="technologies" alt="ReduxImg" src={Redux}></img>
                            <img  className="technologies" alt="SequelizeImg" src={Sequelize}></img>
                        </div>

                        <div className="About-Me">
                            <h1 className="About-Text">My social networks and where to contact me.</h1>
                            <a href="https://www.google.com/" target="_blank" rel="noreferrer"> <img className="links" alt="LinkedinImg" src={Linkedin}></img> </a>
                            <a href="https://www.google.com/" target="_blank" rel="noreferrer"> <img className="links" alt="GmailImg" src={Gmail}></img> </a>
                            <a href="https://www.google.com/" target="_blank" rel="noreferrer"> <img className="links" alt="Github" src={Github}></img> </a>
                        </div>
            </div>

                            <h3 className="Bottom-About">A site created by Andrés Monsalbe</h3>
        </div>
    )
}

export default About
