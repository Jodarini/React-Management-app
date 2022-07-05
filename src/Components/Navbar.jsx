import React from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

export default function Navbar({
	deleteArticles,
	handleOpen,
	setQ,
	isAnyChecked,
}) {
	return (
		<nav className={isAnyChecked ? "alternative-color" : null}>
			<ol>
				{isAnyChecked && (
					<li>
						<Button variant="outlined" onClick={deleteArticles}>
							Delete
						</Button>
					</li>
				)}
				{!isAnyChecked && (
					<>
						<li>
							<Button variant="contained" onClick={handleOpen}>
								Add
							</Button>
						</li>
						<li>
							<TextField
								color="primary"
								variant="outlined"
								type="text"
								label="Filter"
								size="small"
								onChange={e => setQ(e.target.value.toLowerCase())}
							/>
						</li>
					</>
				)}
			</ol>
		</nav>
	);
}
