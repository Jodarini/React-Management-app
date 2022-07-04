import React, { useEffect, useState } from "react";
import ArticleList from "./ArticleList";
import ModalAdd from "./ModalAdd";
import Navbar from "./Navbar";
import ModalEdit from "./ModalEdit";
const backend2 = "http://192.168.1.14:5000/articles";

const backend = "https://62c360c4876c4700f53b819c.mockapi.io/articles/";
// const backend = "https://demo6384318.mockable.io/";
// http://localhost:8000/articles
export default function App() {
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState(null);
	const [articles, setArticles] = useState([]);
	// eslint-disable-next-line
	const [selectedArticles, setSelectedArticles] = useState(
		[]
	);

	const demoJson = {
		articles: [
			{
				categoria: "1111",
				nombre: "Bolso grandes",
				referencia: "123123123e",
				precio: "70000",
				talla: "L",
				cantidad: "1",
				id: "xCXasrZ6kU_O4nasdUvbECNS",
				isChecked: false,
			},
			{
				id: 33,
				categoria: "Busos",
				nombre: "Buso grande",
				referencia: "akjgfhkgjhk23",
				precio: "45000",
				talla: "M",
				cantidad: "5",
			},
			{
				categoria: "Camisetas",
				nombre: "Camiseta ROJA",
				referencia: "qtwreterwt123",
				precio: "20000",
				talla: "xs",
				cantidad: "1",
				id: "xCXasrZ6kU_O4nnbcvnUvbECNS",
				isChecked: false,
			},
			{
				categoria: "Camisetas",
				nombre: "Camiseta AZUL",
				referencia: "dhgfjhgf",
				precio: "15000",
				talla: "xs",
				cantidad: "1",
				id: "xCXasrZ6kU_O4tertyrUvbECNS",
			},
			{
				id: 32,
				categoria: "Busos",
				nombre: "Buso pequeño",
				referencia: "asd123as123",
				precio: "45000",
				talla: "M",
				cantidad: "5",
			},
			{
				id: 31,
				categoria: "Busos",
				nombre: "Buso largo",
				referencia: "asdasdqwe3",
				precio: "45000",
				talla: "M",
				cantidad: "5",
			},
			{
				id: 37,
				categoria: "Busos",
				nombre: "Buso negro",
				referencia: "asd123",
				precio: "45000",
				talla: "M",
				cantidad: "5",
			},
			{
				categoria: "Pantalones",
				nombre: "Pantalon azul",
				referencia: "e123asd",
				precio: "45000",
				talla: "XL",
				cantidad: "1",
				id: "xCXsfdhdjasrZ6kU_O4nUvbECNS",
				isChecked: false,
			},
		],
	};

	const defaultArticle = {
		categoria: "",
		nombre: "",
		referencia: "",
		precio: "",
		talla: "",
		cantidad: "",
	};
	const [editArticle, setEditArticle] =
		useState(defaultArticle);

	useEffect(() => {
		const getArticles = async () => {
			const articlesFromServer = await fetchArticles();
			setArticles(articlesFromServer);
		};
		getArticles();
	}, []);

	const fetchArticles = async () => {
		try {
			const res = await fetch(backend);
			const data = await res.json();

			if (res.ok) {
				setIsLoaded(true);
				return data;
			} else {
				return demoJson.articles;
				// throw new Error("Network error");
			}
		} catch (error) {
			setError(error);
			return error;
		}
	};

	const [modalIsOpen, setModalIsOpen] = useState(false);

	const openModal = () => {
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};

	const addArticle = async newArticle => {
		const res = await fetch(backend, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(newArticle),
		});
		let data = "";
		if (res.ok) {
			data = await res.json();
		} else {
			data = demoJson.articles;
		}
		setArticles(prev => [...prev, data]);
	};

	//Select articles
	const toggleSelect = (id, e) => {
		const thisArticles = [...articles];
		const article = thisArticles.find(
			article => article.id === id
		);
		article.isChecked = !article.isChecked;
		setSelectedArticles(thisArticles);
	};

	//Delete articles
	const deleteArticles = async () => {
		const newArticles = [...articles];
		const toDeleteArticles = newArticles.filter(
			article => article.isChecked
		);
		const remainingArticles = newArticles.filter(
			article => !article.isChecked
		);
		toDeleteArticles.forEach(async element => {
			await fetch(`${backend}${element.id}`, {
				method: "DELETE",
			});
		});

		setArticles(remainingArticles);
		setSelectedArticles([]);
	};

	const editEntry = async editArticle => {
		const res = await fetch(`${backend}${editArticle.id}`, {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(editArticle),
		});
		const data = await res.json();

		const newState = articles.map(obj => {
			if (obj.id === data.id) {
				return { ...data };
			}
			return obj;
		});
		setArticles(newState);
	};

	const [open, setOpen] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [q, setQ] = useState("");

	const search = articles => {
		if (articles) {
			return articles.filter(
				article =>
					article.nombre.toLowerCase().indexOf(q) > -1 ||
					article.categoria.toLowerCase().indexOf(q) > -1 ||
					article.referencia.toLowerCase().indexOf(q) > -1 ||
					article.talla.toLowerCase().indexOf(q) > -1
			);
		} else return;
	};
	const openPopup = (article, e) => {
		setEditArticle(article);
		setOpenEdit(true);
	};

	const closePopup = () => {
		setOpenEdit(false);
	};

	if (!isLoaded) {
		return (
			<>
				<Navbar
					deleteArticles={deleteArticles}
					handleOpen={handleOpen}
					setQ={setQ}
				/>
				<div className="container">
					<ModalAdd
						articles={articles}
						IsModalOpened={modalIsOpen}
						onCloseModal={closeModal}
						addArticle={addArticle}
						open={open}
						handleOpen={handleOpen}
						handleClose={handleClose}
					/>

					<ModalEdit
						articles={articles}
						IsModalOpened={modalIsOpen}
						onCloseModal={closeModal}
						addArticle={addArticle}
						open={openEdit}
						handleOpen={handleOpen}
						handleClose={closePopup}
						addEditArticle={editArticle}
						editEntry={editEntry}
					/>

					<ArticleList
						className="articleList"
						articles={search(articles)}
						onDelete={deleteArticles}
						handleOpen={handleOpen}
						toggleSelect={toggleSelect}
						openModal={openModal}
						openPopup={openPopup}
					/>
				</div>
			</>
		);
	} else {
		return (
			<>
				<Navbar
					deleteArticles={deleteArticles}
					handleOpen={handleOpen}
					setQ={setQ}
				/>
				<div className="container">
					<ModalAdd
						articles={articles}
						IsModalOpened={modalIsOpen}
						onCloseModal={closeModal}
						addArticle={addArticle}
						open={open}
						handleOpen={handleOpen}
						handleClose={handleClose}
					/>

					<ModalEdit
						articles={articles}
						IsModalOpened={modalIsOpen}
						onCloseModal={closeModal}
						addArticle={addArticle}
						open={openEdit}
						handleOpen={handleOpen}
						handleClose={closePopup}
						addEditArticle={editArticle}
						editEntry={editEntry}
					/>

					<ArticleList
						className="articleList"
						articles={search(articles)}
						onDelete={deleteArticles}
						handleOpen={handleOpen}
						toggleSelect={toggleSelect}
						openModal={openModal}
						openPopup={openPopup}
					/>
				</div>
			</>
		);
	}
}
