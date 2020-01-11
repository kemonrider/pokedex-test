import React from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Select,
  Button,
  Spin,
  message,
  Empty
} from "antd";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import PokemonListComponent from "../component/PokemonList";
import PokemonDetailComponent from "../component/PokemonDetail";
// import pokemonList from "../_mock/pokemonList.json"; // for development purpose

// pokemon list query
const POKEMON_LIST = gql`
  {
    pokemons(first: 151) {
      number
      name
      image
      types
      classification
      weaknesses
      resistant
    }
  }
`;

// populate pokemon type from available pokemon list
const populatePokemonType = pokemons => {
  const types = [];

  pokemons.forEach(pokemon => {
    pokemon.types.forEach(type => {
      if (!types.includes(type)) {
        types.push(type);
      }
    });

    pokemon.weaknesses.forEach(type => {
      if (!types.includes(type)) {
        types.push(type);
      }
    });

    pokemon.resistant.forEach(type => {
      if (!types.includes(type)) {
        types.push(type);
      }
    });
  });

  return types;
};

// main component function
function HomeScreen() {
  const [typeList, setTypeList] = React.useState([]);
  const [filterType, setFilterType] = React.useState("");
  const [filterWeakness, setFilterWeakness] = React.useState("");
  const [filterResistant, setFilterResistant] = React.useState("");
  const [filteredPokemonList, setFilteredPokemonList] = React.useState([]);
  const [modalShown, setModalShown] = React.useState(false);
  const [selectedPokemon, setSelectedPokemon] = React.useState({});
  const { loading, error, data } = useQuery(POKEMON_LIST);

  // reset filter
  const resetFilter = () => {
    setFilterResistant("");
    setFilterWeakness("");
    setFilterType("");
  };

  // on component init
  React.useEffect(() => {
    if (!loading && data && data.pokemons.length) {
      setFilteredPokemonList(data.pokemons);
      setTypeList(populatePokemonType(data.pokemons));
    }
  }, [loading, data]);

  // filter pokemon on filter change
  React.useEffect(() => {
    if (data && data.pokemons && data.pokemons.length) {
      setFilteredPokemonList(
        data.pokemons
          .filter(pokemon => {
            if (filterType) {
              return pokemon.types.includes(filterType);
            }
            return true;
          })
          .filter(pokemon => {
            if (filterWeakness) {
              return pokemon.weaknesses.includes(filterWeakness);
            }
            return true;
          })
          .filter(pokemon => {
            if (filterResistant) {
              return pokemon.resistant.includes(filterResistant);
            }
            return true;
          })
      );
    }
  }, [filterType, filterWeakness, filterResistant, data]);

  // if loading or error occured
  if (loading || error) {
    // show error message
    if (error) {
      message(error);
    }

    return (
      <div
        style={{
          minHeight: 500,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {loading && <Spin />}
        {error && <Empty />}
      </div>
    );
  }

  // return if not loading
  return (
    <>
      <PokemonDetailComponent
        selectedPokemon={selectedPokemon}
        modalShown={modalShown}
        onClose={() => {
          setModalShown(false);
        }}
      />
      <Row gutter={10}>
        <Col sm={4} style={{ marginBottom: 10 }}>
          <Card title="Filter">
            <Form>
              <Form.Item label="Types">
                <Select
                  value={filterType}
                  onChange={val => {
                    setFilterType(val);
                  }}
                >
                  {typeList.length
                    ? typeList.map(type => {
                        return (
                          <Select.Option key={type} value={type}>
                            {type}
                          </Select.Option>
                        );
                      })
                    : null}
                </Select>
              </Form.Item>
              <Form.Item label="Weakness">
                <Select
                  value={filterWeakness}
                  onChange={val => {
                    setFilterWeakness(val);
                  }}
                >
                  {typeList.length
                    ? typeList.map(type => {
                        return (
                          <Select.Option key={type} value={type}>
                            {type}
                          </Select.Option>
                        );
                      })
                    : null}
                </Select>
              </Form.Item>
              <Form.Item label="Resistant">
                <Select
                  value={filterResistant}
                  onChange={val => {
                    setFilterResistant(val);
                  }}
                >
                  {typeList.length
                    ? typeList.map(type => {
                        return (
                          <Select.Option key={type} value={type}>
                            {type}
                          </Select.Option>
                        );
                      })
                    : null}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button onClick={resetFilter}>Reset</Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col sm={20}>
          <PokemonListComponent
            onDetail={pokemonDetail => {
              setSelectedPokemon(pokemonDetail);
              setModalShown(true);
            }}
            pokemons={filteredPokemonList}
          />
        </Col>
      </Row>
    </>
  );
}

export default HomeScreen;
