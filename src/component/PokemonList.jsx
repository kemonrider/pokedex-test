import React from "react";
import PropType from "prop-types";
import { Card, Empty, Row, Col, Button } from "antd";

function PokemonList(props) {
  const { pokemons } = props;

  if (!pokemons.length) {
    return <Empty />;
  }

  return (
    <Row gutter={10}>
      {pokemons.map(pokemon => {
        return (
          <Col xs={12} sm={4} key={pokemon.number}>
            <Card title={pokemon.name} style={{ marginBottom: "10px" }}>
              <div
                style={{
                  width: "100%",
                  paddingBottom: "100%",
                  marginBottom: "10px",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  backgroundImage: `url(${pokemon.image})`
                }}
              />
              <footer>
                <Button
                  type="primary"
                  block
                  onClick={() => {
                    props.onDetail(pokemon);
                  }}
                >
                  Detail
                </Button>
              </footer>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

PokemonList.propTypes = {
  pokemons: PropType.arrayOf(
    PropType.shape({
      name: PropType.string,
      number: PropType.oneOfType([PropType.string, PropType.number]),
      image: PropType.string,
      weaknesses: PropType.arrayOf(PropType.string),
      resistant: PropType.arrayOf(PropType.string)
    })
  ),
  onDetail: PropType.func
};

PokemonList.defaultProps = {
  pokemons: [],
  onDetail: () => {}
};

export default PokemonList;
