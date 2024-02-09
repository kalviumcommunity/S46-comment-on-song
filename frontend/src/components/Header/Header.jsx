import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
	return (
		<div className="brand">
			<Link to="/" className="wordmark">
				<h1>
					Comment <br /> on Song
				</h1>
			</Link>
			<div className="credits">
				Created by
				<br />
				<a
					href="http://alwinsunil.in"
					target="_blank"
					rel="noopener noreferrer"
				>
					Alwin Sunil
				</a>
			</div>
		</div>
	);
}

export default Header;
