$(document).ready(function() {
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
        "label": "Select",
        "options": ["Sample Option", "Sample Option", "Sample Option"]
      },
      {
        "id": "680cff8d-c7f9-40be-8767-e3d6ba420952",
        "type": "textarea",
        "label": "Text Area",
        "placeholder": "Sample Placeholder"
      },
      {
        "id": "45002ecf-85cf-4852-bc46-529f94a758f5",
        "type": "input",
        "label": "Sample Label",
        "placeholder": "Sample Placeholder"
      }  
    ];
  
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
  
        const deleteButton = $('<button class="delete-element"><i class="ss-trash-can-10416"></i></button>');
        deleteButton.on('click', function() {
          formData = formData.filter(el => el.id !== element.id);
          renderForm();
        });
  
        formElement.append(deleteButton);
        $('#form-container').append(formElement);
      });
  
      $('#form-container').sortable();
    }
  
    function addElement(type) {
      const newId = `id-${Math.random().toString(36).substr(2, 16)}`;
      const newElement = {
        id: newId,
        type: type,
        label: 'New Label',
      };
  
      if (type === 'input' || type === 'textarea') {
        newElement.placeholder = 'New Placeholder';
      } else if (type === 'select') {
        newElement.options = ['Option 1', 'Option 2'];
      }
  
      formData.push(newElement);
      renderForm();
    }
  
    $('#add-input').on('click', function() {
      addElement('input');
    });
  
    $('#add-select').on('click', function() {
      addElement('select');
    });
  
    $('#add-textarea').on('click', function() {
      addElement('textarea');
    });
  
    $('#save-form').on('click', function() {
      console.log(JSON.stringify(formData, null, 2));
    });
  
    renderForm();
  });
  