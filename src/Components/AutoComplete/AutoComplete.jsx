import { useState } from "react";
import Autosuggest from "react-autosuggest";
import "./AutoComplete.css";

const Autocomplete = () => {
  const data = [
    { name: "assasyn creed", category: "history" },
    { name: "crash car", category: "race" },
    { name: "crash bandycoot", category: "adventure" },
  ];

  const [products, setProducts] = useState(data);
  const [value, setValue] = useState("");
  const [productSelected, setProductSelected] = useState({});

  const onSuggestionsFetchRequested = ({ value }) => {
    setProducts(filterProducts(value));
  };

  const filterProducts = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    var filtrado = data.filter((product) => {
      var textoCompleto = product.name + " - " + product.category;

      if (
        textoCompleto
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(inputValue)
      ) {
        return product;
      }
    });

    return inputLength === 0 ? [] : filtrado;
  };

  const onSuggestionsClearRequested = () => {
    setProducts([]);
  };

  const getSuggestionValue = (suggestion) => {
    return `${suggestion.name} - ${suggestion.category}`;
  };

  const renderSuggestion = (suggestion) => (
    <div className="sugerencia" onClick={() => selectProduct(suggestion)}>
      {`${suggestion.name} - ${suggestion.category}`}
    </div>
  );

  const selectProduct = (product) => {
    setProductSelected(product);
  };

  const onChange = (e, { newValue }) => {
    setValue(newValue);
  };

  const inputProps = {
    placeholder: "Name or category",
    value,
    onChange,
  };

  const eventEnter = (e) => {
    if (e.key == "Enter") {
      var split = e.target.value.split("-");
      var product = {
        product: split[0].trim(),
        pais: split[1].trim(),
      };
      selectProduct(product);
    }
  };

  return (
    <div className="autosuggest-container">
      <Autosuggest
        suggestions={products}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={eventEnter}
      />
      <br />
      <button
        className="btn btn-primary"
        onClick={() => console.log(productSelected)}
      >
        Checar estado
      </button>
    </div>
  );
};
export default Autocomplete;
