import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { nanoid } from "nanoid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./ModalAdd.scss";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";

export default function FormEdit({
	open,
	handleClose,
	addEditArticle,
	editEntry,
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

	useEffect(() => {
		setArticle(addEditArticle);
	}, [addEditArticle]);

	const handleChange = e => {
		const value = e.target.value;

		setArticle({
			...article,
			[e.target.name]: value,
		});
	};

	const onModalClose = e => {
		e.preventDefault();
		handleClose();
	};

	const handleSubmit = e => {
		e.preventDefault();
		editEntry(article);
		handleClose();
	};

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
							<TextField
								variant="filled"
								className="form__input"
								type="text"
								name="nombre"
								label="Nombre"
								onChange={handleChange}
								value={article.nombre}
							/>
							<TextField
								variant="filled"
								className="form__input"
								type="text"
								name="categoria"
								label="Categoria"
								onChange={handleChange}
								value={article.categoria}
							/>
							<TextField
								variant="filled"
								className="form__input"
								type="text"
								name="precio"
								label="Precio"
								onChange={handleChange}
								value={article.precio}
							/>
							<TextField
								variant="filled"
								className="form__input"
								type="text"
								name="talla"
								label="Talla"
								onChange={handleChange}
								value={article.talla}
							/>
							<TextField
								variant="filled"
								className="form__input"
								type="text"
								name="referencia"
								label="Referencia"
								onChange={handleChange}
								value={article.referencia}
							/>
							<Button onClick={e => onModalClose(e)}>Cancelar</Button>
							<Button variant="contained" onClick={handleSubmit}>
								OK
							</Button>
						</form>
					</Box>
				</Fade>
			</Modal>
		</>
		// 	<Modal
		// 		aria-labelledby="transition-modal-title"
		// 		aria-describedby="transition-modal-description"
		// 		open={open}
		// 		onClose={handleClose}
		// 		closeAfterTransition
		// 		BackdropComponent={Backdrop}
		// 		BackdropProps={{
		// 			timeout: 500,
		// 		}}
		// 	>
		// 		<Fade in={open}>
		// 			<Box sx={style}>
		// 				<form onSubmit={handleSubmit}>
		// 					EDIT PANEL
		// 					<div className="form__inputs">
		// 						<TextField
		// 							variant="filled"
		// 							className="form__input"
		// 							type="text"
		// 							name="categoria"
		// 							label="Categoría"
		// 							onChange={handleChange}
		// 							value={article.categoria}
		// 						/>
		// 						<TextField
		// 							variant="filled"
		// 							className="form__input"
		// 							type="text"
		// 							name="nombre"
		// 							label="Nombre"
		// 							onChange={handleChange}
		// 							value={article.nombre}
		// 						/>
		// 						<TextField
		// 							variant="filled"
		// 							className="form__input"
		// 							type="text"
		// 							name="referencia"
		// 							label="Referencia"
		// 							onChange={handleChange}
		// 							value={article.referencia}
		// 						/>
		// 						<TextField
		// 							variant="filled"
		// 							className="form__input"
		// 							type="text"
		// 							name="precio"
		// 							label="Precio"
		// 							onChange={handleChange}
		// 							value={article.precio}
		// 						/>
		// 						<TextField
		// 							variant="filled"
		// 							className="form__input"
		// 							type="text"
		// 							name="talla"
		// 							label="Talla"
		// 							onChange={handleChange}
		// 							value={article.talla}
		// 						/>
		// 						<TextField
		// 							variant="filled"
		// 							className="form__input"
		// 							type="number"
		// 							name="cantidad"
		// 							label="Cantidad"
		// 							onChange={handleChange}
		// 							value={article.cantidad}
		// 						/>
		// 					</div>
		// 					<div className="d-flex justify-content-end gap-1 ModalAdd__button-container">
		// 						<Button onClick={e => onModalClose(e)}>Cancelar</Button>
		// 						<Button
		// 							variant="contained"
		// 							id={"boton-" + nanoid()}
		// 							disabled={disable}
		// 							type="primary"
		// 							text="here"
		// 						>
		// 							Agregar
		// 						</Button>
		// 					</div>
		// 				</form>
		// 			</Box>
		// 		</Fade>
		// 	</Modal>
	);
}
