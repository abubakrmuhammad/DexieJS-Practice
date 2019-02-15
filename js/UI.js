/**************************************/
/*********** User Inteface ***********/
/************************************/

const UI = (() => {
  const DOM = {
    controlButtons: {
      getFriends: document.querySelector('.get__friends-btn'),
      addFriends: document.querySelector('.add__friends-btn'),
      delFriends: document.querySelector('.del__friends-btn'),
      updFriends: document.querySelector('.upd__friends-btn')
    },

    forms: {
      boxes: {
        addFriend: document.querySelector('.add__friends-box'),
        delFriend: document.querySelector('.del__friends-box'),
        updFriend: document.querySelector('.upd__friends-box')
      },

      inputs: {
        addFriend: {
          firstName: document.querySelector('.add__friends-form--first__name'),
          lastName: document.querySelector('.add__friends-form--last__name'),
          age: document.querySelector('.add__friends-form--age')
        },

        delFriend: {
          friendList: document.querySelector('.del__friends-form--name')
        },

        updFriend: {
          friendList: document.querySelector('.upd__friends-form--name'),
          firstName: document.querySelector('.upd__friends-form--first__name'),
          lastName: document.querySelector('.upd__friends-form--last__name'),
          age: document.querySelector('.upd__friends-form--age')
        }
      },

      submits: {
        addFriend: document.querySelector('.add__friends-box  .form__submit-btn'),
        delFriend: document.querySelector('.del__friends-box  .form__submit-btn'),
        updFriend: document.querySelector('.upd__friends-box  .form__submit-btn')
      },

      buttons: {
        closeButtons: document.querySelectorAll('.close__box-btn'),
        cancelButtons: document.querySelectorAll('.form__cancel-btn')
      }
    },

    output: {
      friendsList: document.querySelector('.friends-list')
    },

    modal: {
      modalBox: document.querySelector('.modal'),
      modalTitle: document.querySelector('.modal__title'),
      modalDescrtiption: document.querySelector('.modal__description')
    },

    loader: {
      spinners: document.querySelectorAll('.loader'),
      checkmarks: document.querySelectorAll('.loader__checkmark'),
      crossmarks: document.querySelectorAll('.loader__crossmark')
    },

    backdrop: document.querySelector('.backdrop')
  };

  return {
    // Return all DOM selectors
    getDOM: () => {
      return DOM;
    },

    backdrop: {
      // Show the Backdrop
      show: () => {
        DOM.backdrop.classList.remove('hidden');
      },

      // Hide the Backdrop
      hide: () => {
        DOM.backdrop.classList.add('hidden');
      },

      hideBackdrop_Box: () => {
        DOM.backdrop.classList.add('hidden');
        const boxes = Object.keys(DOM.forms.boxes).map(key => DOM.forms.boxes[key]);
        boxes.forEach(box => {
          box.style.transform = 'translate(-50%,-50%) scale(0)';
        });
      }
    },

    modal: {
      // Show the Modal
      show: () => {
        DOM.modal.modalBox.classList.remove('hidden');
      },

      // Hide the Modal
      hide: () => {
        DOM.modal.modalBox.classList.add('hidden');
      }
    },

    loader: {
      show: parent => {
        // Show the loader
        document.querySelector(`${parent} .loader`).classList.remove('hidden');
      },

      hide: parent => {
        // Hide the loader
        document.querySelector(`${parent} .loader`).classList.add('hidden');
      },

      start: () => {
        // Start the spinner
        DOM.loader.spinners.forEach(spinner => {
          spinner.classList.remove('loader-complete', 'failed');
        });

        // Hide the checkmark
        DOM.loader.checkmarks.forEach(checkmark => {
          checkmark.classList.add('hidden');
        });

        // Hide the crossmark
        DOM.loader.crossmarks.forEach(crossmark => {
          crossmark.classList.add('hidden');
        });
      },

      fail: () => {
        // Stop the spinner
        DOM.loader.spinners.forEach(spinner => {
          spinner.classList.add('loader-complete', 'failed');
        });

        // Show the crossmark
        DOM.loader.crossmarks.forEach(crossmark => {
          crossmark.classList.remove('hidden');
        });
      },

      success: () => {
        // Stop the spinner
        DOM.loader.spinners.forEach(spinner => {
          spinner.classList.add('loader-complete');
        });

        // Show the checkmark
        DOM.loader.checkmarks.forEach(checkmark => {
          checkmark.classList.remove('hidden');
        });
      }
    },

    // Return the input values
    getInput: form => {
      const inputNames = Object.keys(form);
      const inputNodes = inputNames.map(key => form[key]);
      const inputValues = inputNodes.map(input => input.value);

      let data = new Object();

      for (let i = 0; i < inputNodes.length; i++) {
        data[inputNames[i]] = inputValues[i];
      }

      return data;
    },

    // Clear the input Fields
    clearInput: form => {
      const inputNodes = Object.keys(form).map(key => form[key]);
      inputNodes.forEach(inputNode => {
        inputNode.value = '';
      });
      inputNodes[0].focus();
    },

    // Open a form box
    openBox: box => {
      box.style.transform = 'translate(-50%,-50%) scale(1)';
    },

    // Close all form boxes
    closeBox: () => {
      const boxes = Object.keys(DOM.forms.boxes).map(key => DOM.forms.boxes[key]);
      boxes.forEach(box => {
        box.style.transform = 'translate(-50%,-50%) scale(0)';
      });
    }
  };
})();
