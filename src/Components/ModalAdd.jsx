import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./ModalAdd.scss";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

export default function Form({
	addArticle,
	open,
	handleClose,
}) {
	const defaultArticle = {
		categoria: "",
		nombre: "",
		referencia: "",
		precio: "",
		talla: "",
		cantidad: "",
		id: nanoid(),
	};

	const [article, setArticle] = useState(defaultArticle);

	const handleChange = e => {
		const value = e.target.value;

		setArticle({
			...article,
			[e.target.name]: value,
		});
	};

	function onModalClose(e) {
		e.preventDefault();
		handleClose();
	}

	const handleSubmit = e => {
		e.preventDefault();
		addArticle(article);
		setArticle(defaultArticle);
		handleClose();
	};

	const [disable, setDisable] = useState(false);

	useEffect(() => {
		// mira si un elemento está vacio
		const checkLength = element => element.length === 0;
		// some() para mirar cada valor del objeto article
		setDisable(Object.values(article).some(checkLength));
	}, [article]);

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	};

	return (
		<>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<Box sx={style}>
						<form onSubmit={handleSubmit}>
							<div className="form__inputs">
								<FormControl sx={{ m: 1, minWidth: 120 }}>
									<InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
									<Select
										type="text"
										name="categoria"
										label="Categoría"
										onChange={handleChange}
										value={article.categoria}
									>
										<MenuItem value="camisetas">Camisetas</MenuItem>
										<MenuItem value="pantalones">Pantalónes</MenuItem>
										<MenuItem value="Zapatos">Zapatos</MenuItem>
									</Select>
								</FormControl>
								<FormControl sx={{ m: 1, minWidth: 120 }}>
									<TextField
										type="text"
										name="nombre"
										label="Name"
										onChange={handleChange}
										value={article.nombre}
									/>
								</FormControl>
								<FormControl sx={{ m: 1, minWidth: 120 }}>
									<TextField
										type="text"
										name="referencia"
										label="Reference"
										onChange={handleChange}
										value={article.referencia}
									/>
								</FormControl>
								<FormControl sx={{ m: 1, minWidth: 120 }}>
									<TextField
										type="text"
										name="precio"
										label="Price"
										onChange={handleChange}
										value={article.precio}
									/>
								</FormControl>
								<FormControl sx={{ m: 1, minWidth: 120 }}>
									<InputLabel id="demo-simple-select-helper-label">Talla</InputLabel>
									<Select
										type="text"
										name="talla"
										label="Size"
										onChange={handleChange}
										value={article.talla}
									>
										<MenuItem value="XS">XS</MenuItem>
										<MenuItem value="S">S</MenuItem>
										<MenuItem value="M">M</MenuItem>
										<MenuItem value="L">L</MenuItem>
										<MenuItem value="XL">XL</MenuItem>
									</Select>
								</FormControl>
								<FormControl sx={{ m: 1, minWidth: 120 }}>
									<TextField
										type="number"
										name="cantidad"
										label="Quantity"
										onChange={handleChange}
										value={article.cantidad}
									/>
								</FormControl>
							</div>

							<div className="d-flex justify-content-end gap-1 ModalAdd__button-container">
								<Button onClick={e => onModalClose(e)}>Cancel</Button>
								<Button
									variant="contained"
									id={"boton-" + nanoid()}
									disabled={disable}
									type="primary"
									text="here"
								>
									Add
								</Button>
							</div>
						</form>
					</Box>
				</Fade>
			</Modal>
		</>
	);
}
