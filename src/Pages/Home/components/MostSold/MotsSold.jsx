import React from 'react';
import { useSelector } from 'react-redux';
import { MostSoldContainer, MostSoldDetails, MostSoldItem, MostSoldName, MostSoldText } from './MostSold.style';

export default function MostSold() {
  const products = useSelector(state => state.products);

  // Ordena los productos por la suma de los ratings de las valoraciones
  products.sort((a, b) => {
    const sumRatingA = a.valorations.reduce((sum, val) => sum + val.rating, 0);
    const sumRatingB = b.valorations.reduce((sum, val) => sum + val.rating, 0);
    return sumRatingB - sumRatingA;
  });

  const topProducts = products.slice(0, 8);

  return (
    <MostSoldContainer>
      {topProducts.map(product => (
        <MostSoldItem stock={product.stock}  to={`/store/detail/${product?.id}`}>
          {/* Pictures array , picture adaptate to container */}
          <img src={product.pictures[0]} alt={product.name}  width="100%" height="50%" />
          <MostSoldDetails>
            <MostSoldName>{product.name}</MostSoldName>
            <MostSoldText>Price: {product.price}</MostSoldText>
            <MostSoldText>Stock: {product.stock}</MostSoldText>
            <MostSoldText>Rating: {product.stock}</MostSoldText>
          </MostSoldDetails>

        </MostSoldItem>      
      ))}
    </MostSoldContainer>
  );
}
