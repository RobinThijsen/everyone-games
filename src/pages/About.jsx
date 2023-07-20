import website from "../assets/rawg-website.png"
import API from "../assets/API.png"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

export const About = () => {
	
	return (
		<main className="about">
			<h2>RAWG</h2>
			<p>
				RAWG is an API who publicly provide a big data base about video games.<br/>
				I use it in the case of this project for my web developer formation.
			</p>
			<img src={ website } alt="page-example" />
			<div className="separator"></div>
			<h2>RAWG API</h2>
			<p>
				With a big doc and an easy access to the API.<br/>
				Just connect on and receive your key.
			</p>
			<img src={ API } alt="API-example" />
			<div className="separator"></div>
			<div className="link-wrapper">
				<a className="link-button" href="https://rawg.io/" target="_blank">RAWG</a>
				<a className="link-button blue" href="" target="_blank">
					<FontAwesomeIcon icon={faGithub} />My Page
				</a>
			</div>
		</main>
	)
}