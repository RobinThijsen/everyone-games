import { Item } from '../components/Item'

export const List = ({ games }) => {
	const options = {
		scale: 1,
		speed: 900,
		max: 30
	}
	
	return (
		<>
			{
				games.map((game, index) => <Item options={ options } game={ game } class={ "list-item" } key={ index } />)
			}
		</>
	)
}