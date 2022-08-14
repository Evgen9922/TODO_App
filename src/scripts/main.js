(() => {


 const NOTELIST = document.querySelector('.notelist');
 const NEW_NOTE = document.querySelector('.new-note__text');
 const NOTE_LIST = document.querySelector('.notelist__list');
 const NOTE_MESSAGE = document.querySelector('.notelist__message');
 const BTN_EDIT_NOTE = document.querySelector('.btn-edit-note');
 const BTN_DELETE_NOTE = document.querySelector('.btn-delete-note');
 const BTN_UPDATE_NOTE = document.querySelector('.btn-update-note');
 const BTN_SAVE_NOTE = document.querySelector('.btn-save-note');
 const BTN_FIND_NOTE = document.querySelector('.new-note__text-find');
 const FIND_TEXT = document.querySelector('.text-find');
 const NOTES_FOUND = document.querySelector('.notes-found');
 let textNote;

 function hideBtns() {
  BTN_EDIT_NOTE.classList.add('js-hide');
  BTN_DELETE_NOTE.classList.add('js-hide');
  BTN_UPDATE_NOTE.classList.add('js-hide');
  BTN_SAVE_NOTE.classList.add('js-hide');
 };


 NEW_NOTE.addEventListener('keyup', (ev) => {
  if (ev.target.value.trim()) {
   BTN_SAVE_NOTE.classList.remove('js-hide');
  } else {
   BTN_SAVE_NOTE.classList.add('js-hide');
  }
 })

 BTN_SAVE_NOTE.addEventListener('click', () => {
  console.log('Save');
  createNewNote(); //создаем новую заметку 
  checkNotes(); // проверка наличия заметов
  checkHeightList(); //пересчет высоты на переполнение списка
  findNote();
  if (textNote) {
   checkFoundNotes(textNote);
  };
 })

 // --формирование новой заметки
 function createNewNote() {
  const N_NOTE = document.createElement('li');
  N_NOTE.innerText = NEW_NOTE.value.trim();
  N_NOTE.classList.add('note');

  NOTE_LIST.insertAdjacentElement('beforeend', N_NOTE);

  // --для каждой заметки назначаем обработчик
  N_NOTE.addEventListener('click', (ev) => {
   if (!N_NOTE.classList.contains('note_editable')) {
    N_NOTE.classList.toggle('note-selected');
   }

   checkSelectedNote(N_NOTE);
  })
  NEW_NOTE.value = '';
  BTN_SAVE_NOTE.classList.add('js-hide');
 }

 //--Проверка наличия заметок, выдача сообщения
 function checkNotes() {
  let notes = document.querySelector('.note');
  if (!notes) {
   NOTE_MESSAGE.classList.remove('js-hide');
   hideBtns();
   return false;
  } else {
   NOTE_MESSAGE.classList.add('js-hide');
   notes.classList.remove('note-notselected');   //исходное состояние заметок
   return notes;
  }
 }

 // --проверка кол-ва выбранных заметок, отображение кнопок
 function checkSelectedNote(N_NOTE) {
  const SELECTED_NOTE_COUNT = document.querySelectorAll('.note-selected').length;

  if (SELECTED_NOTE_COUNT) {
   BTN_DELETE_NOTE.classList.remove('js-hide');
  } else {
   BTN_DELETE_NOTE.classList.add('js-hide')
  };

  if (SELECTED_NOTE_COUNT === 1 && !N_NOTE.classList.contains('note_editable')) {
   BTN_EDIT_NOTE.classList.remove('js-hide');
  } else {
   BTN_EDIT_NOTE.classList.add('js-hide');
  }
 }

 // нажата кнопка редактировать заметку
 BTN_EDIT_NOTE.addEventListener('click', () => {

  let note_edit = document.querySelectorAll('.note');
  BTN_EDIT_NOTE.classList.add('js-hide');
  note_edit.forEach((item, ind) => {

   if (item.classList.contains('note-selected')) {
    item.classList.add('note_editable');
    item.classList.remove('li-compressed');
    item.contentEditable = true;
    item.focus();
    BTN_UPDATE_NOTE.classList.remove('js-hide');
   } else {
    item.classList.add('note-notselected');
   }
  })
 });

 // нажата кнопка удалить заметку
 BTN_DELETE_NOTE.addEventListener('click', () => {
  checkNotes();

  document.querySelectorAll('.note-selected').forEach((item, ind) => {
   console.log(item);
   NOTE_LIST.removeChild(item);
  });
  getInitial();
  checkHeightList();
  findNote();
  checkFoundNotes(textNote);
 });


 //нажата кнопка Перезаписать 
 BTN_UPDATE_NOTE.addEventListener('click', () => {
  getInitial();
  checkHeightList();
  findNote();
  checkFoundNotes(textNote);
 });


 //исходное состояние заметок и кнопок
 function getInitial() {
  document.querySelectorAll('.note').forEach((item) => {
   item.classList.remove('note-notselected');
   item.classList.remove('note_editable');
   item.classList.remove('note-selected');

   item.contentEditable = false;
  })
  hideBtns();
 }


 //--проверка переполнения, сокращение строк, если переполнен список
 function checkHeightList() {
  let sum = 0;
  const notes = document.querySelectorAll('.note');
  const notesCount = notes.length;

  notes.forEach((item) => {
   item.classList.remove('li-compressed');
   sum = sum + item.clientHeight;
  })

  if (sum >= NOTELIST.clientHeight - notesCount * 10) {
   notes.forEach((item) => {
    item.classList.add('li-compressed');
   })
  }
 };


 // --- поиск заметки
 function findNote() {
  if (checkNotes()) {
   BTN_FIND_NOTE.classList.remove('js-hide');
  } else {
   BTN_FIND_NOTE.classList.add('js-hide');
  }
 }

 BTN_FIND_NOTE.addEventListener('click', () => {
  if (!FIND_TEXT.value.trim()) return;
  textNote = FIND_TEXT.value.trim();
  checkFoundNotes(textNote);
 });


 // ----Пересчет найденных заметок (после изменения/удаления/создания новых)
 function checkFoundNotes(textNote) {
  let noteFound = 0;
  document.querySelectorAll('.note').forEach((item, index) => {
   item.classList.remove('note-found');
   if (item.innerText.includes(textNote)) {
    item.classList.add('note-found');
    noteFound += 1;
   }

   NOTES_FOUND.innerText = `Найдено заметок: ${noteFound}`;
  })
  FIND_TEXT.value = '';

 };




})();