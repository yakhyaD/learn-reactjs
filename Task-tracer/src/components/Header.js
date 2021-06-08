import PropTypes from 'prop-types'
import {useLocation} from 'react-router-dom'
import Button from './Button.js'

const Header = ({title, showAddForm, showAdd}) => {
	const location = useLocation()
		const showBtn = location.pathname === '/'
	return(
		<header className="header">
			<h1>{title}</h1>
			{ showBtn && (
				<Button
					showAddForm={showAddForm}
					showBtn={showAdd}
				/>
			)}
			
		</header>
	)
}
Header.defaultProps = {
	title: 'Task Tracer'
}
Header.propsTpes = {
	title: PropTypes.string.isRequired,
}

export default Header