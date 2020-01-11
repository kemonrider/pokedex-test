import React from "react";
import { Row, Col, Card, Form, Select } from "antd";
import PokemonListComponent from "../component/PokemonList";
import pokemonList from "../_mock/pokemonList.json";

function HomeScreen() {
  const [typeList, setTypeList] = React.useState([]);
  const [pokemonTypesList, setPokemonTypesList] = React.useState([]);
  const [pokemonWeaknessList, setPokemonWeaknessList] = React.useState([]);
  const [pokemonResistantList, setPokemonResistantList] = React.useState([]);

  // populate pokemon type from available pokemon list
  const populatePokemonType = () => {
    const types = [];

    pokemonList.data.pokemons.forEach(pokemon => {
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

    setTypeList(types);
  };

  // on component init
  React.useEffect(() => {
    populatePokemonType();
  }, []);

  return (
    <Row gutter={10}>
      <Col span={4}>
        <Card title="Filter">
          <Form>
            <Form.Item label="Types">
              <Select
                onChange={val => {
                  setPokemonTypesList(val);
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
                onChange={val => {
                  setPokemonWeaknessList(val);
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
                onChange={val => {
                  setPokemonResistantList(val);
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
          </Form>
        </Card>
      </Col>
      <Col span={20}>
        <PokemonListComponent pokemons={pokemonList.data.pokemons} />
      </Col>
    </Row>
  );
}

export default HomeScreen;
