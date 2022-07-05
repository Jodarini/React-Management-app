import React from "react";
import shirt from "../Assets/shirt.jpg";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import YButton from "./YButton";
import { useLongPress } from "use-long-press";
import { useCallback } from "react";
import { useState } from "react";

export default function Article({
	article,
	toggleSelect,
	openPopup,
}) {
	const [enabled, setEnabled] = useState(true);
	const callback = useCallback(event => {
		toggleSelect(article.id);
	}, []);
	const bind = useLongPress(enabled ? callback : null, {
		threshold: 350,
		cancelOnMovement: true,
	});
	return (
		<ListItem
			disablePadding
			className={`article ${
				article.isChecked ? "selected" : " "
			}`}
		>
			<ListItemButton>
				<div {...bind()}>
					<div className="article__content">
						<YButton
							openPopup={openPopup}
							article={article}
							size="small"
							content="EDIT"
						/>
						<div className="article__title">
							<h5>{article.nombre}</h5>
							<p className="article__title__category">
								{article.categoria}
							</p>
						</div>

						<img src={article.image} alt="Foto" />
						<div className="article__properties">
							<p>
								<span>Precio</span>
								<span className="article__properties__value">
									${article.precio}
								</span>
							</p>
							<p>
								<span>Talla</span>
								<span className="article__properties__value">
									{article.talla}
								</span>
							</p>
							<p>
								<span>Referencia</span>
								<span className="article__properties__value">
									{article.referencia}
								</span>
							</p>
						</div>
					</div>
				</div>
			</ListItemButton>
		</ListItem>
	);
}
