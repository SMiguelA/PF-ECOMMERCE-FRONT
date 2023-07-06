// Third Party Dependencies.
import React from "react";
import { useSelector } from "react-redux";

// Local Dependencies.
import {
  MostSoldContainer,
  MostSoldDetails,
  MostSoldItem,
  MostSoldName,
  MostSoldText,
} from "./MostSold.style";

// MostSold Component.
export default function MostSold() {
  // Get the products from the store.
  const products = useSelector((state) => state.products);

  // Sort the products by the sum of the ratings.
  products?.sort((a, b) => {
    // Get the sum of the ratings for each product.
    const sumRatingA = a.valorations.reduce((sum, val) => sum + val.rating, 0);

    // Get the sum of the ratings for each product.
    const sumRatingB = b.valorations.reduce((sum, val) => sum + val.rating, 0);

    // Return the difference between the sums.
    return sumRatingB - sumRatingA;
  });

  // Select the top 8 products.
  const topProducts = products?.slice(0, 8);

  // Map the rating value to the stars component.
  const mapValueToStars = (value) => {
    // Scale the value to a 0-5 range.
    const scaledValue = (value / 5) * 5;

    // Round the value to the nearest 0.5.
    const roundedValue = Math.round(scaledValue * 10) / 10;

    // Return the value.
    return roundedValue;
  };

  return (
    <MostSoldContainer>
      {topProducts?.map((product) => {
        // Get the valorations from the product.
        const valorations = product.valorations;

        // Get the average rating.
        const averageRating =
          valorations.length > 0
            ? valorations.reduce((sum, val) => sum + val.rating, 0) /
              valorations.length
            : 0;

        // Map the rating value to the stars component.
        const mappedRating = mapValueToStars(averageRating);

        // Return the most sold item.
        return (
          <MostSoldItem
            stock={product.stock}
            to={`/store/detail/${product._id ? product._id : product.id}`}
          >
            <img
              src={product.pictures[0]}
              alt={product.name}
              width="100%"
              height="50%"
            />
            <MostSoldDetails>
              <MostSoldName>{product.name}</MostSoldName>
              <MostSoldText>Price: {product.price}</MostSoldText>
              <MostSoldText>Stock: {product.stock}</MostSoldText>
              <MostSoldText>Rating: {mappedRating}</MostSoldText>
            </MostSoldDetails>
          </MostSoldItem>
        );
      })}
    </MostSoldContainer>
  );
}
