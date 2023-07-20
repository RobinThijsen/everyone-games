import { useState, useEffect } from 'react'

import { List } from '../components/List'
import { Top } from '../components/Top'
import { UsedGames } from '../components/UsedGames'

import { NavLink } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'

const API_URL = import.meta.env.API_URL
const KEY = import.meta.env.API_KEY

export const Home = () => {
	const [games, setGames] = useState([])
	
	const handleToggle = () => {
		const list = document.querySelector(".home")
		const section = document.querySelector(".sided-info")
		
		list.classList.contains("on") ? list.classList.remove("on") : list.classList.add("on")
		section.classList.contains("on") ? section.classList.remove("on") : section.classList.add("on")
	}
	
	useEffect(() => {
		axios.get(API_URL + "games?pages=1&pages_size=9&key=" + KEY)
		.then(res => setGames(res.data.results))
		.catch(err => console.log("ERR => While trying to hit API values:", err))
	}, [])
	
	useEffect(() => console.log("games:", games), [games])
	
	return (
		<main className='home'>
			<div>
				<h2>Legendary Games</h2>
				<section className='list-wrapper'>
					<List games={ games } />
				</section>
				<h2>Links to know</h2>
				<section className='link-wrapper'>
					<NavLink to="/about/" className='link-button'>RAWG API</NavLink>
					<NavLink to="/games" className='link-button blue'>List of games</NavLink>
				</section>
			</div>
			<section className="sided-info">
				<button onClick={ handleToggle }>
					<FontAwesomeIcon icon={faAngleLeft} />
				</button>
				<h2>Big 3 (Most populars games)</h2>
				<Top KEY={ KEY } API_URL={ API_URL } />
				<UsedGames 
					KEY={ KEY }
					API_URL={ API_URL } 
					title="playstation" 
				    id={ [16, 18, 187] } />
				<UsedGames 
					KEY={ KEY }
					API_URL={ API_URL }
					title="xbox"
					id={ [1, 14, 186] }
				/>
			</section>
		</main>
	)
}