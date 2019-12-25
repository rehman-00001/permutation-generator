(function() {
  'use strict';

  const _generateBtn = document.getElementsByClassName('btn btn--generate')[0];
  const _avoidDuplicates = document.getElementById('duplicates');
  const _itemTextField = document.getElementById('input-string');
  const _addBtn = document.getElementsByClassName('btn btn--add')[0];
  const _removeAllBtn = document.getElementsByClassName(
    'btn btn--remove-all'
  )[0];
  const _inputsList = document.getElementById('inputs-list');
  const _inputItemCount = document.getElementById('input-item-count');
  const _outputsList = document.getElementById('result-list');
  const _outputItemCount = document.getElementById('output-item-count');

  const inputListItemTemplate = itemText => `
  <li class="input-item">
    <span class="input-text">${itemText}</span
    ><span class="remove-item" role="button">&times;</span>
  </li>
  `;

  const outputListItemTemplate = itemText => `<li>${itemText}</li>`;

  const inputs = ['A', 'B', 'C'];
  const outputs = [];
  const shouldAvoidDuplicate = false;

  function addItem(text) {
    inputs.push(text);
    renderInputList();
  }

  function removeAll() {
    inputs.length = 0;
    renderInputList();
  }

  function renderInputList() {
    _inputsList.innerHTML = '';
    _inputsList.innerHTML = inputs.reduce(
      (prev, curr) => prev + inputListItemTemplate(curr),
      ''
    );
    updateInputListCount();
  }

  function updateInputListCount() {
    const count = inputs.length;
    _inputItemCount.innerText = count;
  }

  function renderOutputList() {
    _outputsList.innerHTML = '';
    _outputsList.innerHTML = outputs.reduce(
      (prev, curr) => prev + outputListItemTemplate(curr),
      ''
    );
    updateOutputListCount();
  }

  function updateOutputListCount() {
    const count = outputs.length;
    _outputItemCount.innerText = count;
  }

  function addButtonListener() {
    const newItem = _itemTextField.value;
    if (newItem.trim()) {
      addItem(newItem.trim());
    }
    _itemTextField.value = '';
  }

  function removeAllButtonListener() {
    removeAll();
  }

  function deleteItemListener(event) {
    if (event.srcElement.className === 'remove-item') {
      const text = event.srcElement.parentElement.firstElementChild.innerText;
      const updated = inputs.filter(item => item !== text);
      inputs.length = 0;
      inputs.push(...updated);
      renderInputList();
    }
  }

  function generateButtonListener() {
    const newOP = generatePermutation(inputs);
    outputs.length = 0;
    outputs.push(...newOP.map(item => item.join(', ')));
    renderOutputList();
  }

  function enterKeyPressListener(event) {
    if (
      event.keyCode === 13 ||
      event.key === 'Enter' ||
      event.code === 'Enter'
    ) {
      addButtonListener();
    }
  }

  _addBtn.addEventListener('click', addButtonListener);
  _removeAllBtn.addEventListener('click', removeAllButtonListener);
  _inputsList.addEventListener('click', deleteItemListener);
  _generateBtn.addEventListener('click', generateButtonListener);
  _itemTextField.addEventListener('keyup', enterKeyPressListener);

  function generatePermutation(xs) {
    let ret = [];

    for (let i = 0; i < xs.length; i = i + 1) {
      let rest = generatePermutation(xs.slice(0, i).concat(xs.slice(i + 1)));

      if (!rest.length) {
        ret.push([xs[i]]);
      } else {
        for (let j = 0; j < rest.length; j = j + 1) {
          ret.push([xs[i]].concat(rest[j]));
        }
      }
    }
    return ret;
  }

  renderInputList();
  generateButtonListener();
})();
