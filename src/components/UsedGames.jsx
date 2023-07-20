import { useState, useEffect } from "react"
import { NavLink } from 'react-router-dom'

import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'

export const UsedGames = ({ KEY, BASE_URL, title, id }) => {
	const [games, setGames] = useState([])
	let i = 0
	
	const actuallDate = () => {
		const date = new Date()
		let month = parseInt(date.getMonth()) + 1,
			day = parseInt(date.getDate())
		
		if (month < 10) month = "0" + month
		if (day < 10) day = "0" + day
		
		const dateReturn = date.getFullYear() + "-" + month + "-" + day
		
		return dateReturn
	}
	
	useEffect(() => {
		let url = BASE_URL + "games?ordering=-released&dates="
		url += "1970-01-01," + actuallDate()
		url += "&platforms=" 
		for (let y = 0; y < id.length - 1; y++) {
			url += id[y] + ","
		}
		url += id[id.length - 1] + "&key=" + KEY
		
		axios.get(url)
		.then(res => setGames(res.data.results))
		.catch(err => console.log("ERR => While trying to hit API values:", err))
	}, [])
	
	return (
		<article>
			<h3>latest released on { title }</h3>
			<ul>
				{
					games.map((game, index) => {
						i++
						if (i <= 3) return <li key={ index }><NavLink to={ "/card/" + game.slug }><p>{ game.name }</p><p>{ game.released }<FontAwesomeIcon icon={faCalendar} /></p></NavLink></li>
					})
				}
			</ul>
		</article>
	)
}