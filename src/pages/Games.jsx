import { useState, useEffect } from 'react'

import { List } from '../components/List'

import InfiniteScroll from 'react-infinite-scroll-component'

import axios from 'axios'
const KEY = "cae86541b7054c9b9e2802eb173c1521"

export const Games = () => {
	const [hasMore, setHasMore] = useState(true)
	const [games, setGames] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [page, setPage] = useState(2)
	const [values, setValues] = useState("")
	
	useEffect(() => {
		axios.get("https://api.rawg.io/api/games?page=1&page_size=20&key=" + KEY)
		.then(res => setGames(res.data.results))
		.catch(err => console.log("ERR => While trying to hit API values:", err))
	}, [])
	
	/**
	 * add 20 more games in the list
	 * @param {string} url API url for the call
	 */
	const add20More = () => {
		setIsLoading(true)
		let url = "https://api.rawg.io/api/games?page=" + page + "&page_size=20&key=" + KEY
		axiosGet(url)
	}
	
	/**
	 *
	 * get and set data from API
	 * @param {boolean} isNextGamesUpdate add or not next 20 games in arr
	 * @param {boolean} isPageUpdate modify or not new page
	 *
	 */
	const axiosGet = (url, isPageUpdate = true) => {
		axios.get(url)
		.then(res => {
			let data = res.data.results
			setGames(prevGames => [...prevGames, ...data])
			if (isPageUpdate) setPage(prevPage => (prevPage + 1))
			ifLength(games.length)
		})
		.catch(err => console.log("ERR => While trying to hit API values:", err + " [get == " + url + "]"))
		.finally(() => setIsLoading(false))
	}
	
	/**
	 *
	 * change games with values send
	 *
	 */
	const handleChange = () => {
		let url = "https://api.rawg.io/api/games?search=" + values + "&page=1&page_size=100&key=" + KEY
		setPage(2)
		axios.get(url)
		.then(res => setGames(res.data.results))
		.catch(err => console.log("ERR => While trying to hit API values:", err + " [get == " + url + "]"))
	}
	
	/**
	 * Event on scroll
	 * if window end add 20 more infos
	 */
	const handleScroll = () => {
	  if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading || values != "") {
		return
	  }
	  add20More()
	}
	
	/** 
	 * limit of inifinite load
	 * @param {number} length length of the array
	 */
	const ifLength = length => {
		length >= 120 ? setHasMore(false) : setHasMore(true)
	}
	
	/** 
	 * Effect when isLoading change add more (infinite loading)
	 */
	useEffect(() => {
	  window.addEventListener('scroll', handleScroll)
	  return () => window.removeEventListener('scroll', handleScroll)
	}, [isLoading])
	
	/** 
	 * Effect when games change console values
	 */
	useEffect(() => {
		console.log("Change games:", games)
	}, [games])
	
	/**
	 * Effect when values change console value
	 * modify url
	 * get API
	 */
	useEffect(() => {
		console.log("Change values:", values)
	}, [values])
	
	return (
		<main className='games'>
			<div>
				<form className='search'>
					<input
						onChange={ (e) => {
							setValues(e.target.value)
							handleChange()
						}}
						id="search-value"
						type="search"
						placeholder='Search a games...'
					/>
				</form>
				<h2>Games</h2>
				<InfiniteScroll
					className="list-wrapper"
					dataLength={ games.length }
					hasMore={ hasMore }
					loader={ 
						<div className='loading-wrapper'></div>
					}
					endMessage={ <p className="end-wrapper">No more game left.</p> }
				>
					<List games={ games } />
				</InfiniteScroll>
			</div>
		</main>
	)
}