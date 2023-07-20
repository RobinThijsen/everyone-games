import { useState, useEffect } from "react"

import { useParams } from "react-router-dom"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faLink } from '@fortawesome/free-solid-svg-icons'
import { faReddit } from '@fortawesome/free-brands-svg-icons'

import axios from 'axios'

const API_URL = "https://api.rawg.io/api/"
const API_KEY = "cae86541b7054c9b9e2802eb173c1521"

export const Card = () => {
	const { name } = useParams()
	const [game, setGame] = useState([])
	const [more, setMore] = useState("+ more")
	
	useEffect(() => {
		let url = API_URL + "games/" + name + "?key=" + API_KEY
		axios.get(url)
		.then(res => setGame(res.data))
		.catch(err => console.log("ERR => While trying to hit API values:", err + " [get == " + url + "]"))
	}, [])
	
	useEffect(() => {
		console.log("Change game:", game)
		console.log("type game:", typeof game)
	}, [game])
	
	return (
		<main className="card">
			<section>
				<figure>
					<img src={ game.background_image } />
					<cite>{ game.rating }</cite>
				</figure>
				<div>
					<h3>{ game.name }</h3>
					<cite>{ game.released }<FontAwesomeIcon icon={faCalendar} /></cite>
				</div>
				<p className='desc'>
					{ game.description_raw }
				</p>
				<span onClick={ () => {
					const desc = document.querySelector(".desc")
					more == "+ more" ? setMore("- less") : setMore("+ more")
					desc.classList.contains("moreLine") ? desc.classList.remove("moreLine") : desc.classList.add("moreLine")
				}} className="more">{ more }</span>
				<div className="list-info-wrapper">
					<article>
						<h3>Platforms</h3>
						<ul>
							{
								game.parent_platforms?.map((platform, i) => {
									<li key={i}>{platform.name}</li>
								})
							}
						</ul>
					</article>
					<article>
						<h3>stores</h3>
						<ul>
							{
								game.stores?.map((store, i) => {
									<a href={ store.domain } key={i}>{store.name}</a>
								})
							}
						</ul>
					</article>
					<article>
						<h3>Genres</h3>
						<ul>
							{
								game.genres?.map((genre, i) => {
									<li key={i}>{genre.name}</li>
								})
							}
						</ul>
					</article>
				</div>
				<h3>Additional Links</h3>
				<ul className="add-link">
					<li>
						<a href={ game.reddit_url } target="_blank">
							<FontAwesomeIcon icon={faReddit} />
						</a>
					</li>
					<li>
						<a href={ game.website } target="_blank">
							<FontAwesomeIcon icon={faLink} />
						</a>
					</li>
					<li>
						<a href={ game.metacritic_url } target="_blank">
						<span>m</span>
						</a>
					</li>
				</ul>
			</section>
		</main>
	)
}