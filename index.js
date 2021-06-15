
let model, labels;

const classify = async (inputs) => {
  const results = await model.classify(inputs);
  return inputs.map((d, i) => {
    const obj = {'text': d};
    results.forEach((classification) => {
      obj[classification.label] = classification.results[i].match;
    });
    return obj;
  });
};

const addPredictions = (predictions) => {
  const tableWrapper = document.querySelector('#tableResults');

  predictions.forEach(d => {
    const predictionDom = `<div class="column">
      <div class="text">${d.text}</div>
        <div class="text">${d.toxicity}</div>
    </div>`;
    tableWrapper.insertAdjacentHTML('beforeEnd', predictionDom);
  });
};

const predict = async () => {
  console.log('hola222222222')
  const text = document.querySelector('#p');
  text.textContent="Cargando módelo..."
  model = await toxicity.load();
    text.textContent="¡Modelo Cargado!"
    text.textContent="Esperando el resultado..."
  labels = model.model.outputNodes.map(d => d.split('/')[0]);

  const tableWrapper = document.querySelector('#tableResults');
  tableWrapper.insertAdjacentHTML(
      'beforeend', `<div class="column">
    <div class="text">Texto</div>
    <div class="text">¿Negativo?</div>
  </div>`);

        
        const text1 = document.querySelector('#form-text-input').value;
        document.querySelector('#form-text-input').disable = true;
        //document.querySelector('#loader').getElementsByClassName.visibility = 'visible';
        const predictions = classify([text1]).then(d => {
          addPredictions(d);
          text.textContent="¡Obtenido!"
        })
        .finally(() => {
          document.querySelector('#form-text-input').value = '';
          //document.querySelector('#loader').getElementsByClassName.visibility = 'hidden';
          document.querySelector('#form-text-input').disable = false;
        });


};

