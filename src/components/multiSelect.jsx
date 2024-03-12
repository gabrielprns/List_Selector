// Importa o array de dados e o hook useState do React
import data from "./data";
import { useState } from "react";
import "./style.css";

// Define o componente funcional Template
const Template = () => {
  // Estados do componente
  const [selected, setSelected] = useState(null); // ID da pergunta selecionada
  const [enableMultiSelection, setEnableMultiSelection] = useState(false); // Habilita/desabilita seleção múltipla
  const [multiple, setMultiple] = useState([]); // IDs das perguntas selecionadas (para seleção múltipla)

  // Função para lidar com a seleção única
  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  // Função para lidar com a seleção múltipla
  function handleMultiSelection(getCurrentId) {
    let copiedMultiple = [...multiple];
    const indexOfCurrentId = copiedMultiple.indexOf(getCurrentId);

    // Adiciona ou remove o ID da pergunta no array para seleção múltipla
    if (indexOfCurrentId === -1) copiedMultiple.push(getCurrentId);
    else copiedMultiple.splice(indexOfCurrentId, 1);

    setMultiple(copiedMultiple);
  }

  // Exibe no console os IDs das perguntas selecionadas (apenas para depuração)
  console.log(selected, multiple);

  // Retorna a representação do componente
  return (
    <div className="wrapper">
      {/* Botão para habilitar/desabilitar seleção múltipla */}
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        {enableMultiSelection ? "Disable Multi Selection" : "Enable Multi Selection"}
      </button>

      {/* Lista de perguntas e respostas */}
      <div className="template">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item" key={dataItem.id}>
              {/* Título da pergunta, clique para selecionar */}
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>

              {/* Exibe a resposta se a pergunta estiver selecionada (única ou múltipla) */}
              {(enableMultiSelection
                ? multiple.indexOf(dataItem.id) !== -1
                : selected === dataItem.id) && (
                <div className="content">{dataItem.answer}</div>
              )}
            </div>
          ))
        ) : (
          // Exibe uma mensagem se não houver dados
          <div>No data found!</div>
        )}
      </div>
    </div>
  );
};

// Exporta o componente para uso em outros lugares
export default Template;