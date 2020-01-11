import React from "react";
import PropType from "prop-types";
import { Card, Empty, Row, Col } from "antd";

const generatePokemonCards = pokemons => {
  return pokemons.map(pokemon => {
    return (
      <Col span={4}>
        <Card cover={<img alt={pokemon.name} src={pokemon.image} />}>
          <Card.Meta title={pokemon.name} />
        </Card>
      </Col>
    );
  });
};

function PokemonList(props) {
  const { pokemons } = props;

  if (!pokemons.length) {
    return <Empty />;
  }

  return <Row gutter={10}>{generatePokemonCards(pokemons)}</Row>;
}

PokemonList.propTypes = {
  pokemons: PropType.arrayOf(
    PropType.shape({
      name: PropType.string,
      number: PropType.number,
      image: PropType.string,
      weaknesses: PropType.arrayOf(PropType.string),
      resistant: PropType.arrayOf(PropType.string)
    })
  )
};

PokemonList.defaultProps = {
  pokemons: []
};

export default PokemonList;
