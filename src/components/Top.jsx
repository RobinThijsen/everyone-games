import { useState, useEffect } from "react"
import { NavLink } from 'react-router-dom'

import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'


export const Top = ({ KEY }) => {
	const [games, setGames] = useState([])
	let i = 0
	
	useEffect(() => {
		axios.get("https://api.rawg.io/api/games?ordering=-rating&key=" + KEY)
		.then(res => setGames(res.data.results))
		.catch(err => console.log("ERR => While trying to hit API values:", err))
	}, [])
	
	return (
		<article className="top-article">
			<h3>Big 3 (top 3 most populars)</h3>
			<ul>
				{
					games.map((game, index) => {
						i++
						if (i <= 3) return <li key={ index }><NavLink to={ "/card/" + game.slug }><p>{ game.name }</p><p>{ game.rating }<FontAwesomeIcon icon={faTrophy} /></p></NavLink></li>
					})
				}
			</ul>
		</article>
	)
}