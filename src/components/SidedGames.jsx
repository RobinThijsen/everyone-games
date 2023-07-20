import { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDesktop } from '@fortawesome/free-solid-svg-icons'
import { faPlaystation, faXbox } from '@fortawesome/free-brands-svg-icons'

import axios from 'axios'

export const SidedGames = ({ KEY, setGames }) => {
	const [platforms, setPlatforms] = useState(() => {
		const local = JSON.parse(localStorage.getItem('everyone-games_platforms'))
		if (local != undefined) return local
		return { play: false, xbox: false, pc: false }
	})
	
	const handleSubmit = () => {
		console.log("submit")
		let url = "https://api.rawg.io/api/games?key=" + KEY
		if (platforms.play || platforms.xbox || platforms.pc) {
			url += "&platforms="
			
			if (platforms.play) {
				url += "16,18,187"
				
				if (platforms.xbox) {
					url += ",1,14,186"
					
					if (platforms.pc) url += ",4"
				}
			} else if (platforms.xbox) {
				url += "1,14,186"
				
				if (platforms.pc) url += ",4"
			} else url += "4"
		}
		
		url += "&page=1&page_size=60"
		console.log(url)
		axios.get(url)
		.then(res => setGames(res.data.results))
		.catch(err => console.log("ERR => While trying to hit API values:", err + " [get == " + url + "]"))
	}
	
	useEffect(() => {
		console.log("platforms:", platforms)
		localStorage.setItem('everyone-games_platforms', JSON.stringify(platforms))
	}, [platforms])
	
	return (
		<form onSubmit={ handleSubmit }>
			<div className="platforms-wrapper">
				<span>
					
					{ platforms.play
						? <input
							type="checkbox" 
							name="play" 
							onChange={ () => {
								const updatedPlatforms = { ...platforms, play: !platforms.play}
								setPlatforms(updatedPlatforms)
							}}
							checked
						/>
						: <input
							type="checkbox" 
							name="play" 
							onChange={ () => {
								const updatedPlatforms = { ...platforms, play: !platforms.play}
								setPlatforms(updatedPlatforms)
							}}
						/>
					}
					<div><FontAwesomeIcon icon={faPlaystation} /></div>
				</span>
				<span>
				{ platforms.xbox
					? <input
						type="checkbox" 
						name="xbox" 
						onChange={ () => {
							const updatedPlatforms = { ...platforms, xbox: !platforms.xbox}
							setPlatforms(updatedPlatforms)
						}}
						checked
					/>
					: <input
						type="checkbox" 
						name="xbox" 
						onChange={ () => {
							const updatedPlatforms = { ...platforms, xbox: !platforms.xbox}
							setPlatforms(updatedPlatforms)
						}}
					/>
				}
					<div><FontAwesomeIcon icon={faXbox} /></div>
				</span>
				<span>
					{ platforms.pc
						? <input
							type="checkbox" 
							name="pc" 
							onChange={ () => {
								const updatedPlatforms = { ...platforms, pc: !platforms.pc}
								setPlatforms(updatedPlatforms)
							}}
							checked
						/>
						: <input
							type="checkbox" 
							name="pc" 
							onChange={ () => {
								const updatedPlatforms = { ...platforms, pc: !platforms.pc}
								setPlatforms(updatedPlatforms)
							}}
						/>
					}
					<div><FontAwesomeIcon icon={faDesktop} /></div>
				</span>
			</div>
			<input type="date" defaultValue={ dates.start } />
			<input type="date" defaultValue={ dates.end } />
			<button className='link-button blue' type="submit">Filter</button>
		</form>
	)
}