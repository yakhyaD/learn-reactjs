import { Link, useLocation } from 'react-router-dom'

const Footer = () => {
	const location = useLocation()

	return (
		<div className="footer">
			{location.pathname === '/'	&& <Link  to='/about'>About</Link> }
		</div>
	)
}
export default Footer