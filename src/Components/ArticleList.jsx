import React from "react";
import Article from "./Article";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";

export default function ArticleList({
	articles,
	toggleSelect,
	handleOpen,
	openPopup,
}) {
	return (
		<List className="article-list">
			<i className="text-right small-font">
				{articles.length > 0
					? articles.length + " items"
					: "no items found"}
			</i>

			<TransitionGroup className="article-list__articles">
				{articles.map(article => (
					<Collapse key={article.id}>
						<Article
							article={article}
							toggleSelect={toggleSelect}
							openPopup={openPopup}
						/>
					</Collapse>
				))}
			</TransitionGroup>

			<Button variant="contained" onClick={handleOpen}>
				Add
			</Button>
		</List>
	);
}
