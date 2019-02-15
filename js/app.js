/**************************************/
/************ Global App *************/
/************************************/

const app = ((ui, db) => {
  const DOM = ui.getDOM();

  const isRequiredEmpty = form => {
    // Getting all the inputs
    const inputs = form.querySelectorAll('input, select');
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];

      // Checking if the required inputs are empty
      if (input.hasAttribute('data-required')) {
        if (input.value === '') {
          return true;
        }
      }
    }

    return false;
  };

  const disableAutoComplete = () => {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.setAttribute('autocomplete', 'off');
    });
  };

  const setupEventListeners = () => {
    //Escape key
    document.addEventListener('keydown', event => {
      if (event.keyCode === 27) {
        // Hide the Modal
        ui.modal.hide();

        // Hide the loader
        ui.loader.hide('.modal');

        // Hide the Backdrop
        DOM.backdrop.style.zIndex = '2';
      }
    });

    // Add Friend Button
    DOM.controlButtons.addFriends.addEventListener('click', () => {
      ui.backdrop.show();
      ui.openBox(DOM.forms.boxes.addFriend);
    });

    // Delete Friend Button
    DOM.controlButtons.delFriends.addEventListener('click', () => {
      // Show the Backdrop
      ui.backdrop.show();

      // Open the form Box
      ui.openBox(DOM.forms.boxes.delFriend);

      // Hide the inputs
      DOM.forms.boxes.delFriend.querySelector('.del__friends-form').style.display = 'none';

      // Show the  loader
      ui.loader.show('.del__friends-box');

      // Start the loader
      ui.loader.start();

      // Hide failure Para
      document.querySelectorAll('.just_a_para').forEach(para => {
        para.parentNode.removeChild(para);
      });

      // Get friends from database
      db.friends.toArray().then(friends => {
        setTimeout(() => {
          if (friends.length !== 0) {
            // Hide the loader
            ui.loader.hide('.del__friends-box');

            document.querySelector('.del__friends-form-friends__list').innerHTML = '';

            // Render Friends Options
            friends.map(friend => {
              let html = `<option value="%id%">%id%. %fullname%</option>`;
              html = html.replace('%fullname%', `${friend.firstName} ${friend.lastName}`);
              html = html.replace(/%id%/g, friend.id);

              document.querySelector('.del__friends-form-friends__list').insertAdjacentHTML('beforeend', html);
            });

            // Show the inputs
            DOM.forms.boxes.delFriend.querySelector('.del__friends-form').style.display = 'block';
          } else {
            // Fail the spinner
            ui.loader.fail();

            // Hide the inputs
            DOM.forms.boxes.delFriend.querySelector('.del__friends-form').style.display = 'none';

            // Add the failure description
            let html = `<p class="just_a_para">There are no more friends to delete.</p>`;

            DOM.forms.boxes.delFriend.insertAdjacentHTML('beforeend', html);
          }
        }, 1200);
      });
    });

    // Update Friend Button
    DOM.controlButtons.updFriends.addEventListener('click', () => {
      // Show the Backdrop
      ui.backdrop.show();

      // Clear Input Fields
      ui.clearInput(DOM.forms.inputs.updFriend);

      // Open the form Box
      ui.openBox(DOM.forms.boxes.updFriend);

      // Hide the inputs
      DOM.forms.boxes.updFriend.querySelector('.upd__friends-form--single').style.display = 'none';
      DOM.forms.boxes.updFriend.querySelector('.upd__friends-form--updates').style.display = 'none';
      DOM.forms.boxes.updFriend.querySelector('.upd__friends-form-control__buttons').style.display = 'none';

      // Show the  loader
      ui.loader.show('.upd__friends-box');

      // Start the loader
      ui.loader.start();

      // Hide failure Para
      document.querySelectorAll('.just_a_para').forEach(para => {
        para.parentNode.removeChild(para);
      });

      // Get friends from database
      db.friends.toArray().then(friends => {
        setTimeout(() => {
          if (friends.length !== 0) {
            // Hide the loader
            ui.loader.hide('.upd__friends-box');

            document.querySelector('.upd__friends-form-friends__list').innerHTML = '';

            // Render Friends Options
            friends.map(friend => {
              let html = `<option value="%id%">%id%. %fullname%</option>`;
              html = html.replace('%fullname%', `${friend.firstName} ${friend.lastName}`);
              html = html.replace(/%id%/g, friend.id);

              document.querySelector('.upd__friends-form-friends__list').insertAdjacentHTML('beforeend', html);
            });

            // Show the inputs
            DOM.forms.boxes.updFriend.querySelector('.upd__friends-form--single').style.display = 'block';
            DOM.forms.boxes.updFriend.querySelector('.upd__friends-form--updates').style.display = 'block';
            DOM.forms.boxes.updFriend.querySelector('.upd__friends-form-control__buttons').style.display = 'block';
          } else {
            // Fail the spinner
            ui.loader.fail();

            // Hide the inputs
            DOM.forms.boxes.updFriend.querySelector('.upd__friends-form--single').style.display = 'none';
            DOM.forms.boxes.updFriend.querySelector('.upd__friends-form--updates').style.display = 'none';
            DOM.forms.boxes.updFriend.querySelector('.upd__friends-form-control__buttons').style.display = 'none';

            // Add the failure description
            let html = `<p class="just_a_para">There are no more friends to update.</p>`;

            DOM.forms.boxes.updFriend.insertAdjacentHTML('beforeend', html);
          }
        }, 1200);
      });
    });

    // Close Buttons
    DOM.forms.buttons.closeButtons.forEach(button => {
      button.addEventListener('click', () => {
        ui.backdrop.hide();
        ui.closeBox();
      });
    });

    // Cancel Buttons
    DOM.forms.buttons.cancelButtons.forEach(button => {
      button.addEventListener('click', () => {
        ui.backdrop.hide();
        ui.closeBox();
      });
    });

    // Backdrop
    DOM.backdrop.addEventListener('click', ui.backdrop.hideBackdrop_Box);

    // Get Friends Button
    DOM.controlButtons.getFriends.addEventListener('click', event => {
      event.preventDefault();
      getFriends();
    });

    // Add Friend Submit Button
    DOM.forms.submits.addFriend.addEventListener('click', event => {
      event.preventDefault();
      addFriend();
    });

    // Dlete Friend Submit Button
    DOM.forms.submits.delFriend.addEventListener('click', event => {
      event.preventDefault();
      delFriend();
    });

    // Update Friend Submit Button
    DOM.forms.submits.updFriend.addEventListener('click', event => {
      event.preventDefault();
      updFriend();
    });

    // Update Friend FriendList
    DOM.forms.inputs.updFriend.friendList.addEventListener('change', () => {
      // Hide the updates input
      DOM.forms.boxes.updFriend.querySelector('.upd__friends-form--updates').style.display = 'none';

      // Show the loader
      ui.loader.hide('.output');
      ui.loader.show('.upd__friends-box');

      // Start the loader
      ui.loader.start();

      setTimeout(() => {
        // Do this if a friend is selected
        if (!isRequiredEmpty(DOM.forms.boxes.updFriend)) {
          // Get the input values
          const input = ui.getInput(DOM.forms.inputs.updFriend);

          // Update friend in the database
          db.friends.toArray().then(friends => {
            friends.forEach(friend => {
              if (friend.id === parseInt(input.friendList)) {
                DOM.forms.inputs.updFriend.firstName.value = friend.firstName;
                DOM.forms.inputs.updFriend.lastName.value = friend.lastName;
                DOM.forms.inputs.updFriend.age.value = friend.age;
              }
            });
          });
        }

        // Hide the loader
        ui.loader.hide('.upd__friends-box');

        // Show the updates input
        DOM.forms.boxes.updFriend.querySelector('.upd__friends-form--updates').style.display = 'block';
      }, 720);
    });
  };

  const getFriends = () => {
    // Clear the Friends List
    DOM.output.friendsList.innerHTML = '';

    // Show the loader
    ui.loader.show('.output');

    // Start the loader
    ui.loader.start();

    db.friends.toArray().then(friends => {
      setTimeout(() => {
        if (friends.length !== 0) {
          // Succeed the spinner
          ui.loader.success();

          setTimeout(() => {
            // Hide the loader
            ui.loader.hide('.output');

            // Render Friends List
            friends.map(friend => {
              let html = `<li class="friends-list__item"><strong>Full Name:</strong><span class="friend__name">%fullname%</span> &nbsp; <strong>Age:</strong><span class="friend__age">%age%</span></li>`;
              html = html.replace('%fullname%', `${friend.firstName} ${friend.lastName}`);
              html = html.replace('%age%', friend.age);

              DOM.output.friendsList.insertAdjacentHTML('beforeend', html);
            });
          }, 1200);
        } else {
          // Fail the spinner
          ui.loader.fail();

          // Add the failure description
          let html = `<p class="just_a_para">There are no friends in the database.</p>`;

          DOM.output.friendsList.innerHTML = html;
        }
      }, 1000);
    });
  };

  const addFriend = () => {
    // Show the Backdrop
    DOM.backdrop.style.zIndex = '20';

    // Show the modal
    ui.modal.show();

    // Show the loader
    ui.loader.hide('.output');
    ui.loader.show('.modal');

    // Start the loader
    ui.loader.start();

    // Change Modal Title
    DOM.modal.modalTitle.textContent = 'Adding...';
    DOM.modal.modalDescrtiption.textContent = 'The friend is being added to the database.';

    setTimeout(() => {
      // Do this if form is not empty
      if (!isRequiredEmpty(DOM.forms.boxes.addFriend)) {
        // Get the input values
        const input = ui.getInput(DOM.forms.inputs.addFriend);

        // Add friend to DataBase
        db.friends.add({ firstName: input.firstName, lastName: input.lastName, age: input.age }).then(() => {
          // Succeed the spinner
          ui.loader.success();

          // Show the success message
          DOM.modal.modalTitle.textContent = 'Success!';
          DOM.modal.modalDescrtiption.textContent = 'The friend has been successfully added to the database.';

          // Remove click event from Backdrop
          DOM.backdrop.removeEventListener('click', ui.backdrop.hideBackdrop_Box);

          // Add click event to Backdrop
          DOM.backdrop.addEventListener('click', function hideBackdrop_Modal() {
            // Hide the Modal
            ui.modal.hide();

            // Hide the loader
            ui.loader.hide('.modal');

            // Hide the Backdrop
            DOM.backdrop.style.zIndex = '2';

            // Clear the input fields
            ui.clearInput(DOM.forms.inputs.addFriend);

            // Set the Event Listeners
            DOM.backdrop.removeEventListener('click', hideBackdrop_Modal);
            DOM.backdrop.addEventListener('click', ui.backdrop.hideBackdrop_Box);
          });
        });
      } else {
        // Fail the spinner
        ui.loader.fail();

        // Show the success message
        DOM.modal.modalTitle.textContent = 'Failed!';
        DOM.modal.modalDescrtiption.textContent = 'The required input fields are empty.';

        // Remove click event from Backdrop
        DOM.backdrop.removeEventListener('click', ui.backdrop.hideBackdrop_Box);

        // Add click event to Backdrop
        DOM.backdrop.addEventListener('click', function hideBackdrop_Modal() {
          // Hide the Modal
          ui.modal.hide();

          // Hide the loader
          ui.loader.hide('.modal');

          // Hide the Backdrop
          DOM.backdrop.style.zIndex = '2';

          // Set the Event Listeners
          DOM.backdrop.removeEventListener('click', hideBackdrop_Modal);
          DOM.backdrop.addEventListener('click', ui.backdrop.hideBackdrop_Box);
        });
      }
    }, 720);
  };

  const delFriend = () => {
    // Show the Backdrop
    DOM.backdrop.style.zIndex = '20';

    // Show the modal
    ui.modal.show();

    // Show the loader
    ui.loader.hide('.output');
    ui.loader.show('.modal');

    // Start the loader
    ui.loader.start();

    // Change Modal Title
    DOM.modal.modalTitle.textContent = 'Deleting...';
    DOM.modal.modalDescrtiption.textContent = 'The friend is being deleted from the database.';

    setTimeout(() => {
      // Do this if form is not empty
      if (!isRequiredEmpty(DOM.forms.boxes.delFriend)) {
        // Get the input values
        const input = ui.getInput(DOM.forms.inputs.delFriend);

        // Delete friend from the database
        db.friends
          .where('id')
          .equals(parseInt(input.friendList))
          .delete()
          .then(deleteCount => {
            // Succeed the spinner
            ui.loader.success();

            // Show the success message
            DOM.modal.modalTitle.textContent = 'Success!';
            DOM.modal.modalDescrtiption.textContent =
              deleteCount + ' friend has been successfully deleted from the database.';

            // Remove click event from Backdrop
            DOM.backdrop.removeEventListener('click', ui.backdrop.hideBackdrop_Box);

            // Add click event to Backdrop
            DOM.backdrop.addEventListener('click', function hideBackdrop_Modal() {
              // Hide the Modal
              ui.modal.hide();

              // Hide the loader in modal
              ui.loader.hide('.modal');

              // Hide the Backdrop
              DOM.backdrop.style.zIndex = '2';

              // Hide the inputs
              DOM.forms.boxes.delFriend.querySelector('.del__friends-form').style.display = 'none';

              // Show the  loader
              ui.loader.show('.del__friends-box');

              // Start the loader
              ui.loader.start();

              // Hide failure Para
              document.querySelectorAll('.just_a_para').forEach(para => {
                para.parentNode.removeChild(para);
              });

              // Get friends from database
              db.friends.toArray().then(friends => {
                setTimeout(() => {
                  if (friends.length !== 0) {
                    // Hide the loader
                    ui.loader.hide('.del__friends-box');

                    document.querySelector('.del__friends-form-friends__list').innerHTML = '';

                    // Render Friends Options
                    friends.map(friend => {
                      let html = `<option value="%id%">%id%. %fullname%</option>`;
                      html = html.replace('%fullname%', `${friend.firstName} ${friend.lastName}`);
                      html = html.replace(/%id%/g, friend.id);

                      document.querySelector('.del__friends-form-friends__list').insertAdjacentHTML('beforeend', html);
                    });

                    // Show the inputs
                    DOM.forms.boxes.delFriend.querySelector('.del__friends-form').style.display = 'block';
                  } else {
                    // Fail the spinner
                    ui.loader.fail();

                    // Hide the inputs
                    DOM.forms.boxes.delFriend.querySelector('.del__friends-form').style.display = 'none';

                    // Add the failure description
                    let html = `<p class="just_a_para">There are no more friends to delete.</p>`;

                    DOM.forms.boxes.delFriend.insertAdjacentHTML('beforeend', html);
                  }
                }, 1200);
              });

              // Set the Event Listeners
              DOM.backdrop.removeEventListener('click', hideBackdrop_Modal);
              DOM.backdrop.addEventListener('click', ui.backdrop.hideBackdrop_Box);
            });
          });
      } else {
        // Fail the spinner
        ui.loader.fail();

        // Show the success message
        DOM.modal.modalTitle.textContent = 'Failed!';
        DOM.modal.modalDescrtiption.textContent = 'Please select a friend to delete from dropdown list.';

        // Remove click event from Backdrop
        DOM.backdrop.removeEventListener('click', ui.backdrop.hideBackdrop_Box);

        // Add click event to Backdrop
        DOM.backdrop.addEventListener('click', function hideBackdrop_Modal() {
          // Hide the Modal
          ui.modal.hide();

          // Hide the loader
          ui.loader.hide('.modal');

          // Hide the Backdrop
          DOM.backdrop.style.zIndex = '2';

          // Set the Event Listeners
          DOM.backdrop.removeEventListener('click', hideBackdrop_Modal);
          DOM.backdrop.addEventListener('click', ui.backdrop.hideBackdrop_Box);
        });
      }
    }, 720);
  };

  const updFriend = () => {
    // Show the Backdrop
    DOM.backdrop.style.zIndex = '20';

    // Show the modal
    ui.modal.show();

    // Show the loader
    ui.loader.hide('.output');
    ui.loader.show('.modal');

    // Start the loader
    ui.loader.start();

    // Change Modal Title
    DOM.modal.modalTitle.textContent = 'Updating...';
    DOM.modal.modalDescrtiption.textContent = 'The friend is being updated in the database.';

    setTimeout(() => {
      // Do this if form is not empty
      if (!isRequiredEmpty(DOM.forms.boxes.updFriend)) {
        // Get the input values
        const input = ui.getInput(DOM.forms.inputs.updFriend);

        // Update friend in the database
        db.friends
          .update(parseInt(input.friendList), { firstName: input.firstName, lastName: input.lastName, age: input.age })
          .then(count => {
            // Succeed the spinner
            ui.loader.success();

            // Show the success message
            DOM.modal.modalTitle.textContent = 'Success!';
            DOM.modal.modalDescrtiption.textContent = count + ' friend has been successfully updated in the database.';

            // Remove click event from Backdrop
            DOM.backdrop.removeEventListener('click', ui.backdrop.hideBackdrop_Box);

            // Add click event to Backdrop
            DOM.backdrop.addEventListener('click', function hideBackdrop_Modal() {
              // Hide the Modal
              ui.modal.hide();

              // Hide the loader in modal
              ui.loader.hide('.modal');

              // Hide the Backdrop
              DOM.backdrop.style.zIndex = '2';

              // Clear Input Fields
              ui.clearInput(DOM.forms.inputs.updFriend);

              // Hide the inputs
              DOM.forms.boxes.updFriend.querySelector('.upd__friends-form--single').style.display = 'none';
              DOM.forms.boxes.updFriend.querySelector('.upd__friends-form--updates').style.display = 'none';
              DOM.forms.boxes.updFriend.querySelector('.upd__friends-form-control__buttons').style.display = 'none';

              // Show the  loader
              ui.loader.show('.upd__friends-box');

              // Start the loader
              ui.loader.start();

              // Hide failure Para
              document.querySelectorAll('.just_a_para').forEach(para => {
                para.parentNode.removeChild(para);
              });

              // Get friends from database
              db.friends.toArray().then(friends => {
                setTimeout(() => {
                  if (friends.length !== 0) {
                    // Hide the loader
                    ui.loader.hide('.upd__friends-box');

                    document.querySelector('.upd__friends-form-friends__list').innerHTML = '';

                    // Render Friends Options
                    friends.map(friend => {
                      let html = `<option value="%id%">%id%. %fullname%</option>`;
                      html = html.replace('%fullname%', `${friend.firstName} ${friend.lastName}`);
                      html = html.replace(/%id%/g, friend.id);

                      document.querySelector('.upd__friends-form-friends__list').insertAdjacentHTML('beforeend', html);
                    });

                    // Show the inputs
                    DOM.forms.boxes.updFriend.querySelector('.upd__friends-form--single').style.display = 'block';
                    DOM.forms.boxes.updFriend.querySelector('.upd__friends-form--updates').style.display = 'block';
                    DOM.forms.boxes.updFriend.querySelector('.upd__friends-form-control__buttons').style.display =
                      'block';
                  } else {
                    // Fail the spinner
                    ui.loader.fail();

                    // Hide the inputs
                    DOM.forms.boxes.updFriend.querySelector('.upd__friends-form--single').style.display = 'none';
                    DOM.forms.boxes.updFriend.querySelector('.upd__friends-form--updates').style.display = 'none';
                    DOM.forms.boxes.updFriend.querySelector('.upd__friends-form-control__buttons').style.display =
                      'none';

                    // Add the failure description
                    let html = `<p class="just_a_para">There are no more friends to update.</p>`;

                    DOM.forms.boxes.updFriend.insertAdjacentHTML('beforeend', html);
                  }
                }, 1200);
              });

              // Set the Event Listeners
              DOM.backdrop.removeEventListener('click', hideBackdrop_Modal);
              DOM.backdrop.addEventListener('click', ui.backdrop.hideBackdrop_Box);
            });
          });
      } else {
        // Fail the spinner
        ui.loader.fail();

        // Show the success message
        DOM.modal.modalTitle.textContent = 'Failed!';
        DOM.modal.modalDescrtiption.textContent = 'Please select a friend to update from dropdown list.';

        // Remove click event from Backdrop
        DOM.backdrop.removeEventListener('click', ui.backdrop.hideBackdrop_Box);

        // Add click event to Backdrop
        DOM.backdrop.addEventListener('click', function hideBackdrop_Modal() {
          // Hide the Modal
          ui.modal.hide();

          // Hide the loader
          ui.loader.hide('.modal');

          // Hide the Backdrop
          DOM.backdrop.style.zIndex = '2';

          // Clear Input Fields
          ui.clearInput(DOM.forms.inputs.updFriend);

          // Set the Event Listeners
          DOM.backdrop.removeEventListener('click', hideBackdrop_Modal);
          DOM.backdrop.addEventListener('click', ui.backdrop.hideBackdrop_Box);
        });
      }
    }, 720);
  };

  return {
    init: () => {
      disableAutoComplete();
      setupEventListeners();
    },
    test: () => {
      console.log(document.querySelector('.del__friends-form-friends__list'));
    }
  };
})(UI, db);

app.init();
