import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "../../axios";
import "./NewProduct.css";

import { createProduct } from "../../Redux/Actions";

export default function NewProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notify = () => {
    toast("Game creation successful!", {
      icon: "🎮",
      style: {
        borderRadius: "10px",
        background: "#fff",
        color: "#333",
      },
      duration: 3000,
      position: "bottom-right",
    });
  };

  const notifyError = () => {
    toast.error("Please fill out all the fields.", {
      icon: "❌",
      style: {
        borderRadius: "10px",
        background: "#fff",
        color: "#333",
      },
      duration: 3000,
      position: "bottom-right",
    });
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [platform, setPlatform] = useState("");
  const [pictures, setPictures] = useState([]);
  const [imgToRemove, setImgToRemove] = useState(null);

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
      !stock ||
      !pictures.length
    ) {
      return notifyError();
    }

    //Aca el dispatch de create product
    console.log(stock, "stock");
    dispatch(
      createProduct(
        name,
        description,
        price,
        category,
        platform,
        pictures,
        stock
      )
    );

    setTimeout(() => {
      notify();
      navigate("/store");
    }, 1000);
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
    <form className="containerForm" onSubmit={handleSubmit}>
      <h1>Create Product</h1>
      <hr />
      <div className="productName">
        <label>Name</label>
        <input
          type="text"
          placeholder="Product name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="productDescription">
        <label>Description</label>
        <textarea
          placeholder="Product description"
          style={{ height: "100px" }}
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="productInfoExtra">
        <div>
          <label>Price(USD)</label>
          <input
            type="number"
            placeholder="$"
            value={price}
            required
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label>Category</label>
          <select onChange={(e) => setCategory(e.target.value)}>
            <option disabled selected>
              Select...
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
          <label>Platform</label>
          <select onChange={(e) => setPlatform(e.target.value)}>
            <option disabled selected>
              Select...
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
          <label>Stock</label>
          <input
            type="number"
            placeholder="#"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
      </div>

      <div className="imgsProducts">
        <button type="button" onClick={showWidget}>
          Upload Images
        </button>
        <div className="images-preview-container">
          {pictures.length ? (
            pictures.map((image) => (
              <div className="image-preview">
                <img src={image.url} alt="Preview" />
                {imgToRemove !== image.public_id && (
                  <i onClick={() => handleRemoveImg(image)}>X</i>
                )}
              </div>
            ))
          ) : (
            <label>Upload an image</label>
          )}
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
  );
}
