document.addEventListener('DOMContentLoaded', function() {
  let formData = [
    {
      "id": "c0ac49c5-871e-4c72-a878-251de465e6b4",
      "type": "input",
      "label": "Sample Label",
      "placeholder": "Sample placeholder"
    },
    {
      "id": "146e69c2-1630-4a27-9d0b-f09e463a66e4",
      "type": "select",
      "label": "Sample Label",
      "options": ["Sample Option", "Sample Option", "Sample Option"]
    },
    {
      "id": "45002ecf-85cf-4852-bc46-529f94a758f5",
      "type": "input",
      "label": "Sample Label",
      "placeholder": "Sample Placeholder"
    },
    {
      "id": "680cff8d-c7f9-40be-8767-e3d6ba420952",
      "type": "textarea",
      "label": "Sample Label",
      "placeholder": "Sample Placeholder"
    }
  ];

  const formContainer = document.getElementById('form-container');
  const popup = document.getElementById('popup');
  const closeBtn = document.querySelector('.close');
  const addElementForm = document.getElementById('add-element-form');
  const optionsContainer = document.getElementById('options-container');
  const placeholderContainer = document.getElementById('placeholder-container');
  const optionsList = document.getElementById('options-list');
  let currentType;
  let currentEditId = null;

  function createFormElement(element) {
    const formElement = document.createElement('div');
    formElement.classList.add('form-element');
    formElement.setAttribute('data-id', element.id);

    const label = document.createElement('label');
    label.textContent = element.label;

    const editLabel = document.createElement('input');
    editLabel.type = 'text';
    editLabel.classList.add('edit-label');
    editLabel.value = element.label;

    formElement.appendChild(label);
    formElement.appendChild(editLabel);

    if (element.placeholder !== undefined) {
      const editPlaceholder = document.createElement('input');
      editPlaceholder.type = 'text';
      editPlaceholder.classList.add('edit-placeholder');
      editPlaceholder.value = element.placeholder;
      formElement.appendChild(editPlaceholder);
    }

    if (element.type === 'input') {
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = element.placeholder;
      formElement.appendChild(input);
    } else if (element.type === 'select') {
      const select = document.createElement('select');
      element.options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.textContent = option;
        select.appendChild(optionElement);
      });
      formElement.appendChild(select);
    } else if (element.type === 'textarea') {
      const textarea = document.createElement('textarea');
      textarea.placeholder = element.placeholder;
      formElement.appendChild(textarea);
    }

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-element');
    deleteButton.innerHTML = '<i class="ss-trash-can-10416"></i>';
    deleteButton.addEventListener('click', function() {
      if (confirm('Are you sure you want to delete this element?')) {
        formData = formData.filter(el => el.id !== element.id);
        renderForm();
      }
    });

    const editButton = document.createElement('button');
    editButton.classList.add('edit-element');
    editButton.innerHTML = '<i class="ss-edit"></i>';
    editButton.addEventListener('click', function() {
      currentEditId = element.id;
      openPopup(element.type);
      populateFormForEditing(element);
    });

    formElement.appendChild(deleteButton);
    formElement.appendChild(editButton);
    return formElement;
  }

  function renderForm() {
    $('#form-container').empty();
    formData.forEach(element => {
      const formElement = $(`<div class="form-element" data-id="${element.id}"></div>`);
      const label = $(`<label>${element.label}</label>`);

      if (element.type === 'input') {
        formElement.append(label);
        formElement.append(`<input type="text" placeholder="${element.placeholder}">`);
      } else if (element.type === 'select') {
        formElement.append(label);
        const select = $('<select></select>');
        element.options.forEach(option => {
          select.append(`<option>${option}</option>`);
        });
        formElement.append(select);
      } else if (element.type === 'textarea') {
        formElement.append(label);
        formElement.append(`<textarea placeholder="${element.placeholder}"></textarea>`);
      }

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-element');
      deleteButton.innerHTML = '<i class="ss-trash-can-10416"></i>';
      deleteButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to delete this element?')) {
          formData = formData.filter(el => el.id !== element.id);
          renderForm();
        }
      });

      const editButton = document.createElement('button');
      editButton.classList.add('edit-element');
      editButton.innerHTML = '<i class="ss-edit"></i>';
      editButton.addEventListener('click', function() {
        currentEditId = element.id;
        openPopup(element.type);
        populateFormForEditing(element);
      });

      formElement.append(deleteButton);
      formElement.append(editButton);
      $('#form-container').append(formElement);
    });

    $('#form-container').sortable();
  }

  function openPopup(type) {
 
          document.getElementById('popup-title').textContent = "Add New Element";
            document.getElementById('btn_add').textContent = "Add";
    currentType = type;
    if (type === 'select') {
      optionsContainer.style.display = 'block';
      placeholderContainer.style.display = 'none';
      document.getElementById('element-options').setAttribute('required', 'required');
      document.getElementById('element-placeholder').removeAttribute('required');
    } else {
      optionsContainer.style.display = 'none';
      placeholderContainer.style.display = 'block';
      document.getElementById('element-placeholder').setAttribute('required', 'required');
      document.getElementById('element-options').removeAttribute('required');
    }
    popup.style.display = 'block';
  }

  function closePopup() {
    popup.style.display = 'none';
    document.getElementById('element-label').value = '';
    document.getElementById('element-placeholder').value = '';
    optionsList.innerHTML = '<div class="option-item"><input type="text" class="element-option" name="element-option" id="element-options" required><button type="button" class="delete-option" onclick="$(this).parent(\'.option-item\').remove()">Delete</button></div>';
    currentEditId = null;
  }

  function populateFormForEditing(element) {
    document.getElementById('element-label').value = element.label;
        document.getElementById('popup-title').textContent = "Edit Element";
                    document.getElementById('btn_add').textContent = "Edit";
    document.getElementById('element-placeholder').value = element.placeholder || '';

    if (element.type === 'select') {
      optionsContainer.style.display = 'block';
      placeholderContainer.style.display = 'none';
      optionsList.innerHTML = '';
      element.options.forEach(option => {
        const optionItem = document.createElement('div');
        optionItem.classList.add('option-item');

        const optionInput = document.createElement('input');
        optionInput.type = 'text';
        optionInput.classList.add('element-option');
        optionInput.value = option;

        const deleteOptionButton = document.createElement('button');
        deleteOptionButton.type = 'button';
        deleteOptionButton.classList.add('delete-option');
        deleteOptionButton.textContent = 'Delete';
        deleteOptionButton.addEventListener('click', function() {
          optionItem.remove();
        });

        optionItem.appendChild(optionInput);
        optionItem.appendChild(deleteOptionButton);
        optionsList.appendChild(optionItem);
      });
    } else {
      optionsContainer.style.display = 'none';
      placeholderContainer.style.display = 'block';
    }
  }

  closeBtn.addEventListener('click', closePopup);

  window.addEventListener('click', function(event) {
    if (event.target === popup) {
      closePopup();
    }
  });

  addElementForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Validate options for select element
    if (currentType === 'select') {
      const optionInputs = document.querySelectorAll('.element-option');
      if (optionInputs.length === 0 || Array.from(optionInputs).every(input => input.value.trim() === '')) {
        alert('Please add at least one option.');
        return;
      }
    }

    const label = document.getElementById('element-label').value;
    const placeholder = document.getElementById('element-placeholder').value;
    let options = [];

    if (currentType === 'select') {
      const optionInputs = document.querySelectorAll('.element-option');
      optionInputs.forEach(input => {
        if (input.value.trim() !== '') {
          options.push(input.value.trim());
        }
      });
    }

    if (currentEditId) {
      updateElement(currentEditId, currentType, label, placeholder, options);
    } else {
      addElement(currentType, label, placeholder, options);
    }
    closePopup();
  });

  function addElement(type, label, placeholder, options) {
    const newId = `id-${Math.random().toString(36).substr(2, 16)}`;
    const newElement = {
      id: newId,
      type: type,
      label: label,
      placeholder: placeholder,
    };

    if (type === 'select') {
      newElement.options = options;
    }

    formData.push(newElement);
    renderForm();
  }

  function updateElement(id, type, label, placeholder, options) {
    formData = formData.map(el => {
      if (el.id === id) {
        el.label = label;
        el.placeholder = placeholder;
        if (type === 'select') {
          el.options = options;
        }
        el.type = type; // Ensure type is correctly set
      }
      return el;
    });
    renderForm();
  }

  document.getElementById('add-input').addEventListener('click', function() {
    openPopup('input');
  });

  document.getElementById('add-select').addEventListener('click', function() {
    openPopup('select');
  });

  document.getElementById('add-textarea').addEventListener('click', function() {
    openPopup('textarea');
  });

  document.getElementById('save-form').addEventListener('click', function() {
    // Update labels and placeholders before saving
    const formElements = formContainer.querySelectorAll('.form-element');
    console.log(JSON.stringify(formData, null, 2));
    alert("Data saved successfully");
  });

  document.getElementById('add-option').addEventListener('click', function() {
    const optionItem = document.createElement('div');
    optionItem.classList.add('option-item');

    const newOptionInput = document.createElement('input');
    newOptionInput.type = 'text';
    newOptionInput.classList.add('element-option');
    newOptionInput.name = 'element-option';
    newOptionInput.required = true;

    const deleteOptionButton = document.createElement('button');
    deleteOptionButton.type = 'button';
    deleteOptionButton.classList.add('delete-option');
    deleteOptionButton.textContent = 'Delete';
    deleteOptionButton.addEventListener('click', function() {
      optionItem.remove();
    });

    optionItem.appendChild(newOptionInput);
    optionItem.appendChild(deleteOptionButton);
    optionsList.appendChild(optionItem);
  });

  renderForm();
});
