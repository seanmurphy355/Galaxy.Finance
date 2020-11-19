import NavComponent from "./Navbar";
import ghost from "./img/icons/mission.jpg";
import skull from "./img/icons/3.jpg";
import bat from "./img/icons/2.png";
import { faTelegram} from "@fortawesome/free-brands-svg-icons";
import { faMedium } from "@fortawesome/free-brands-svg-icons";
import { faGithubAlt } from "@fortawesome/free-brands-svg-icons";
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faDiscord} from "@fortawesome/free-brands-svg-icons";


import React from "react";
import "./App.css";
export default function HomePage() {
  return (
    <html>
        <body>
            <nav><NavComponent /></nav>
            <header class = "size">
                <div class = "bg">
                    <div class="content">
                    {
                        <div class = "pannel">
                            <div class ="cd" >
                                <img src={skull}/>
                            </div>
                            <div class ="cl" >
                                <h1>The Mission</h1>
                            </div>
                            <div class ="cg" >
                                <div class="info">
                                    <p>idk yet some mission statement or something</p>
                                </div>
                            </div>
                        </div>
                        }
                        <div class = "pannel">
                            <div class ="cd" >
                                <img src={ghost}/>
                            </div>
                            <div class ="cl" >
                            <h1>Galaxy Finance</h1>
                            </div>
                            <div class ="cg" >
                                <div class="info">
                                        <p>Welcome to Galaxy.Finance currently this website is for beta testing only. 
                                            This webiste could be used as a staking platform but that has yet to be determined</p>
                                </div>
                            </div>
                        </div>  
                        { 
                        <div class = "pannel">
                            <div class ="cd" > <img src={bat}/></div>
                            <div class ="cl" ><h1>Socials</h1></div>
                            <div class ="cg" >
                            <button class="button"><FontAwesomeIcon icon={faMedium} class ="social" size="2x"/></button>
                            <div class="divider"/>
                            <button class="button"><FontAwesomeIcon icon={faGithubAlt} class ="social" size="2x"/></button>
                            <div class="divider"/>
                            <button class="button"><FontAwesomeIcon icon={faTwitterSquare } class ="social" size="2x"/></button>
                            <div class="divider"/>
                            <button class="button"><FontAwesomeIcon icon={faDiscord} class ="social" size="2x"/></button>
                            <div class="divider"/>
                            <button class="button"><FontAwesomeIcon icon={faTelegram} class ="social" size="2x"/></button>
                
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </header>
        </body>
    </html>
  );
}