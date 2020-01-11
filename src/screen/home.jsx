import React from "react";
import { Row, Col, Card, Form, Select, Button, Modal, Tag } from "antd";
import PokemonListComponent from "../component/PokemonList";
import pokemonList from "../_mock/pokemonList.json";

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

  // reset filter
  const resetFilter = () => {
    setFilterResistant("");
    setFilterWeakness("");
    setFilterType("");
  };

  // on component init
  React.useEffect(() => {
    setFilteredPokemonList(pokemonList.data.pokemons);
    setTypeList(populatePokemonType(pokemonList.data.pokemons));
  }, []);

  // filter pokemon on filter change
  React.useEffect(() => {
    setFilteredPokemonList(
      pokemonList.data.pokemons
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
  }, [filterType, filterWeakness, filterResistant]);

  return (
    <>
      <Modal
        title={`${selectedPokemon.number} - ${selectedPokemon.name}`}
        visible={modalShown}
        onCancel={() => {
          setModalShown(false);
        }}
        footer={[
          <Button
            key="Return"
            onClick={() => {
              setModalShown(false);
            }}
          >
            Return
          </Button>
        ]}
      >
        <Row gutter={10}>
          <Col xs={8}>
            <img src={selectedPokemon.image} alt={selectedPokemon.name} />
          </Col>
          <Col xs={16}>
            <p>
              <b>Number:</b>
              <br />
              <span>{selectedPokemon.number}</span>
            </p>
            <p>
              <b>Name:</b>
              <br />
              <span>{selectedPokemon.name}</span>
            </p>
            <p>
              <b>Classification:</b>
              <br />
              <span>{selectedPokemon.classification}</span>
            </p>
            <p>
              <b>Type:</b>
              <br />
              <span>
                {selectedPokemon.types &&
                  selectedPokemon.types.length &&
                  selectedPokemon.types.map(type => {
                    return <Tag key={type}>{type}</Tag>;
                  })}
              </span>
            </p>
            <p>
              <b>Weakness:</b>
              <br />
              <span>
                {selectedPokemon.weaknesses &&
                  selectedPokemon.weaknesses.length &&
                  selectedPokemon.weaknesses.map(type => {
                    return <Tag key={type}>{type}</Tag>;
                  })}
              </span>
            </p>
            <p>
              <b>Resistant:</b>
              <br />
              <span>
                {selectedPokemon.resistant &&
                  selectedPokemon.resistant.length &&
                  selectedPokemon.resistant.map(type => {
                    return <Tag key={type}>{type}</Tag>;
                  })}
              </span>
            </p>
          </Col>
        </Row>
      </Modal>
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
