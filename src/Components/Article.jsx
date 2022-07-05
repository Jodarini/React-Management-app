import React from "react";
import shirt from "../Assets/shirt.jpg";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import YButton from "./YButton";
import { useLongPress } from "use-long-press";

export default function Article({
	article,
	toggleSelect,
	openPopup,
}) {
	const onLongPress = useLongPress(() => {
		toggleSelect(article.id);
		console.log("longpressed" + article.id);
	});
	return (
		<ListItem
			disablePadding
			className={`article ${
				article.isChecked ? "selected" : " "
			}`}
		>
			<ListItemButton>
				<div {...onLongPress()}>
					<div className="article__content">
						<YButton
							openPopup={openPopup}
							article={article}
							size="small"
							content={
								<svg
									className="button__settings"
									focusable="false"
									aria-hidden="true"
									viewBox="0 0 24 24"
									data-testid="MoreVertIcon"
								>
									<path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
								</svg>
							}
						/>
						<div className="article__title">
							<h5>{article.nombre}</h5>
							<p className="article__title__category">
								{article.categoria}
							</p>
						</div>

						<img src={shirt} alt="Foto" />
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
								<span>Cantidad</span>
								<span className="article__properties__value">
									{article.cantidad}
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
