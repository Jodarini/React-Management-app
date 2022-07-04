import React from "react";
import Button from "@mui/material/Button";

export default function YButton({ content, size, openPopup, article }) {
  
  

	return (
		<Button onClick={() => openPopup(article)} size={size} variant="outlined">
			{content}
		</Button>
	);
}
