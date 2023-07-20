import { NavLink } from "react-router-dom"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad, faHouse, faGrip, faDatabase } from '@fortawesome/free-solid-svg-icons'

export const Header = () => {
	
	return (
		<header>
			<NavLink to="/"><h1><FontAwesomeIcon icon={faGamepad} /></h1></NavLink>
			<menu>
				<NavLink to="/"><FontAwesomeIcon icon={faHouse} /></NavLink>
				<NavLink to="/games"><FontAwesomeIcon icon={faGrip} /></NavLink>
				<NavLink to="/about/"><FontAwesomeIcon icon={faDatabase} /></NavLink>
			</menu>
			<span></span>
		</header>
	)
}