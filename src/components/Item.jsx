import { NavLink } from 'react-router-dom'

import { useRef, useEffect } from 'react'

import VanillaTilt from 'vanilla-tilt'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'

export const Item = (props) => {
	const { options, ...rest } = props.options
	const tilt = useRef(null)
	
	useEffect(() => {
		VanillaTilt.init(tilt.current, options)
	}, [options])
	
	return (
		<NavLink key={ props.index } ref={ tilt } { ...rest } to={ "/game/" + props.game.slug } className={ props.class }>
			<figure>
				<img src={ props.game.background_image } alt={ "image of games " + props.game.id } />
					<cite>{ props.game.rating }</cite>
			</figure>
			<div>
				<p>{ props.game.name }</p>
				<cite>{ props.game.released }<FontAwesomeIcon icon={faCalendar} /></cite>
			</div>
		</NavLink>
	)
}