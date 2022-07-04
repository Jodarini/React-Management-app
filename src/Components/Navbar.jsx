import React from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

export default function Navbar({
	deleteArticles,
	handleOpen,
    setQ
}) {
	return (
	<nav>
		<ol>
			<li>
				<Button onClick={deleteArticles}>Delete</Button>
			</li>
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
					label="Filtrar"
					size="small"
					onChange={e => setQ(e.target.value)}
				/>
			</li>
		</ol>
	</nav>
);
}
