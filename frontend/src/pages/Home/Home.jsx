import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useWindowSize } from "@/helpers/hooks/useWindowSize";
import Profile from "@/pages/Profile";
import Feed from "@/pages/Feed";
import "./Home.css";

function Home() {
	const location = useLocation();
	const { width } = useWindowSize();

	const [mobile, setMobile] = useState(true);
	const [page, setPage] = useState("feed");

	useEffect(() => {
		if (width > 896) {
			setMobile(false);
		} else {
			setMobile(true);
		}
	}, [width]);

	useEffect(() => {
		if (location.pathname == "/signup" || location.pathname == "/login") {
			setPage("profile");
		}
	}, [location]);

	return (
		<>
			{/* Desktop page */}
			{!mobile && (
				<>
					<Feed />
					<Profile />
				</>
			)}

			{/* Mobile page and navigation */}
			{mobile && (
				<>
					{page === "feed" ? <Feed /> : <Profile />}
					<div className="navigation">
						<div
							className="navi navi-feed"
							onClick={() => setPage("feed")}
						>
							<div
								className={`navi-activity ${
									page === "feed" && "navi-active"
								}`}
							>
								<img src="/icons/feed.svg" alt="" />
							</div>
							<span>Feed</span>
						</div>
						<div
							className="navi navi-profile"
							onClick={() => setPage("profile")}
						>
							<div
								className={`navi-activity ${
									page === "profile" && "navi-active"
								}`}
							>
								<img src="/icons/profile.svg" alt="" />
							</div>
							<span>Profile</span>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default Home;
