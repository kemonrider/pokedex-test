import React from "react";
import { Modal, Button, Row, Col, Tag } from "antd";
import PropType from "prop-types";

function PokemonDetailModal(props) {
  const { selectedPokemon, modalShown, onClose } = props;

  return (
    <Modal
      title={`${selectedPokemon.number} - ${selectedPokemon.name}`}
      visible={modalShown}
      onCancel={onClose}
      footer={[
        <Button
          key="Return"
          onClick={() => {
            onClose();
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
  );
}

PokemonDetailModal.propTypes = {
  selectedPokemon: PropType.shape({
    name: PropType.string,
    number: PropType.oneOfType([PropType.string, PropType.number]),
    image: PropType.string,
    types: PropType.arrayOf(PropType.string),
    weaknesses: PropType.arrayOf(PropType.string),
    resistant: PropType.arrayOf(PropType.string),
    classification: PropType.string
  }),
  modalShown: PropType.bool,
  onClose: PropType.func
};

PokemonDetailModal.defaultProps = {
  selectedPokemon: {
    name: "",
    number: "",
    image: "",
    types: [],
    weaknesses: [],
    resistant: [],
    classification: ""
  },
  modalShown: false,
  onClose: () => {}
};

export default PokemonDetailModal;
