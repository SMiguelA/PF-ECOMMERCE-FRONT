import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "../../axios";
import "./NewProduct.css";

import { createProduct } from "../../Redux/Actions";

export default function NewProduct() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [platform, setPlatform] = useState("");
  const [pictures, setPictures] = useState([]);
  const [imgToRemove, setImgToRemove] = useState(null);
  const navigate = useNavigate();

  function handleRemoveImg(imgObj) {
    setImgToRemove(imgObj.public_id);
    axios
      .delete(`/images/${imgObj.public_id}/`)
      .then((res) => {
        setImgToRemove(null);
        setPictures((prev) =>
          prev.filter((img) => img.public_id !== imgObj.public_id)
        );
      })
      .catch((e) => console.log(e));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !platform ||
      !pictures.length
    ) {
      return alert("Please fill out all the fields");
    }

    //Aca el dispatch de create product

    dispatch(
      createProduct(name, description, price, category, platform, pictures)
    );
  }

  function showWidget() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "diiu7oy9z",
        uploadPreset: "front-end-preset",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setPictures((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    widget.open();
  }

  return (
    <div>
      <h1>1</h1>
      <h1>1</h1>
      <h1>Create a product</h1>
      <form style={{ width: "100%" }} onSubmit={handleSubmit}>
        <div>
          <label>Product name</label>
          <input
            type="text"
            placeholder="Enter product name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Product description</label>
          <textarea
            placeholder="Product description"
            style={{ height: "100px" }}
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label>Price($)</label>
          <input
            type="number"
            placeholder="Price ($)"
            value={price}
            required
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label>Category</label>
          <select onChange={(e) => setCategory(e.target.value)}>
            <option disabled selected>
              -- Select One --
            </option>
            <option value="Estrategia por Turnos">Estrategia por turnos</option>
            <option value="Aventura">Aventura</option>
            <option value="Indie">Indie</option>
            <option value="Mundo Abierto">Mundo abierto</option>
            <option value="Accion">Acción</option>
            <option value="Juegos de ritmo">Juegos de ritmo</option>
            <option value="Carrera">Carrera</option>
            <option value="Deportes">Deportes</option>
          </select>
        </div>

        <div>
          <label>Plataforma</label>
          <select onChange={(e) => setPlatform(e.target.value)}>
            <option disabled selected>
              -- Select One --
            </option>
            <option value="PlayStation">Play Station</option>
            <option value="Xbox Live">Xbox live</option>
            <option value="Steam">Steam</option>
            <option value="Epic Games">Epic Games</option>
            <option value="Battle.Net">Battle net</option>
            <option value="Origin">Origin</option>
            <option value="Ubisoft">Ubisoft</option>
          </select>
        </div>

        <div>
          <button type="button" onClick={showWidget}>
            Upload Images
          </button>
          <div className="images-preview-container">
            {pictures.map((image) => (
              <div className="image-preview">
                <img src={image.url} alt="Preview" />
                {imgToRemove !== image.public_id && (
                  <i onClick={() => handleRemoveImg(image)}>X</i>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <button
            type="submit"
            //   disabled={isLoading || isSuccess}
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
}
