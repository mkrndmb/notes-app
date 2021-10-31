export default class notesView {
  constructor(root,{ onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {} ) {
    this.root = root;
    this.onNoteSelect = onNoteSelect;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteDelete = onNoteDelete;
    this.root.innerHTML = `
    <div class="notes-sidebar">
        <button class="notes-add" type="button">Add Note</button>
        <div class="notes-list">
        </div>
    </div>
    <hr>
    <div class="notes-view">
        <input class="notes-view-title" type="text" placeholder="Enter a title...">
        <textarea class="notes-view-body">This is note no.1</textarea>
    </div>
    `;

    const addButton = this.root.querySelector('.notes-add') //document.querySelector pan chaltay ethe..
    const inputTitle = this.root.querySelector('.notes-view-title')
    const inputBody = this.root.querySelector('.notes-view-body')

    addButton.addEventListener('click',()=>{
        this.onNoteAdd();
    })

    // inputTitle.addEventListener('blur',()=>{
    //     const updatedTitle = inputTitle.value.trim()
    //     this.onNoteEdit(updatedTitle)
    // })
    const list =  [inputTitle,inputBody]
     list.forEach(inputField => {
        inputField.addEventListener('blur',()=>{
            const updatedTitle = inputTitle.value.trim()
            const updatedBody = inputBody.value.trim()

            this.onNoteEdit(updatedTitle,updatedBody)
        })
    });

    this.updateNotesViewVisibility(false)
    //console.log(this.createListItemHTML(69,"makTosaya","I need you",new Date()))

  }


  createListItemHTML(id,title,body,updated){
      const MAX_BODY_LENGTH = 50;
      return `
      <div class="notes-list-item selected" data-note-id="${id}">
          <div class="notes-title">${title}</div>
          <div class="notes-body">
          ${body.substring(0,MAX_BODY_LENGTH)}
          ${body.length > MAX_BODY_LENGTH ? "..." : ""}
          </div>
          <div class="notes-updated">${updated.toLocaleString(undefined,{dateStyle:"full",timeStyle:"short"})}</div>
      </div>
   `
  }

  updateNoteList(notes){
    const notesListContainer = this.root.querySelector('.notes-list')

    notesListContainer.innerHTML=""
    notes.map(note=>{
        const html=this.createListItemHTML(note.id,note.title,note.body,new Date(note.updated))
        notesListContainer.insertAdjacentHTML('beforeend',html)
    })
    notesListContainer.querySelectorAll('.notes-list-item').forEach(noteX=>{
        noteX.addEventListener('click',()=>{
            this.onNoteSelect(noteX.dataset.noteId)
        })
        noteX.addEventListener('dblclick',()=>{
            const doDelete = confirm('DO U WANNA DELETE THIS NOTE ?')
            if(doDelete){
                this.onNoteDelete(noteX.dataset.noteId)
            }
            
        })
    })
  }

  updateActiveNote(note){
      
      this.root.querySelector('.notes-view-title').value = note.title
      this.root.querySelector('.notes-view-body').value = note.body
     // console.log(this.root.querySelector('.notes-view-title').value,note.title)
      

          this.root.querySelectorAll('.notes-list-item').forEach(noteX=>{
              noteX.classList.remove('selected')
          })
        
       this.root.querySelector(`.notes-list-item[data-note-id="${note.id}"]`).classList.add('selected')
    //console.log(note.id,this.root.querySelector(`.notes-list-item[data-note-id="${note.id}"]`).classList)
  }

  updateNotesViewVisibility(visible){
      this.root.querySelector('.notes-view').style.visibility = visible ? "visible" : "hidden"
  }

}




// backup
// <div class="notes-list-item notes-list-item-selected">
//                 <div class="notes-title">Do study</div>
//                 <div class="notes-body">I did nothing today</div>
//                 <div class="notes-updated">Wed, 27 Oct 2021 19:00:34 GMT</div>
//             </div>