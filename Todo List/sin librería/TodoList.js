const template = document.createElement('template')
template.innerHTML = `
  <style>
    .todo-list {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
  </style>
  <div class="todo-list">
    <h1></h1>
    <p></p><input type="text">
    <button>Agregar</button>
    <ul></ul>
    <slot></slot>
  </div>
`

class TodoList extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.append(template.content.cloneNode(true))

    // Acceder a los elementos del shadow DOM
    this.input = shadow.querySelector('input')
    this.button = shadow.querySelector('button')
    this.list = shadow.querySelector('ul')

    // Escuchar evento click
    this.button.addEventListener('click', this.addItem.bind(this))

    this.items = []
    if (this.hasAttribute('item1')) {
      this.createTodoItem(this.getAttribute('item1'));
    }
    if (this.hasAttribute('item2')) {
      this.createTodoItem(this.getAttribute('item2'));
    }
    if (this.hasAttribute('item3')) {
      this.createTodoItem(this.getAttribute('item3'));
    }

    shadow.querySelector('h1').textContent = this.getAttribute('title');
    shadow.querySelector('p').textContent = this.getAttribute('promt');
  }

  static get observedAttributes() {
    return ['item1', 'item2', 'item3', 'title', 'promt']
  }

  addItem() {
    const text = this.input.value;
    if (text) {
      this.createTodoItem(text);
      this.input.value = '';
    }
  }

  createTodoItem(text) {
    const item = document.createElement('li')
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const label = document.createElement('span');
    label.textContent = text;
    // item.textContent = text
    item.appendChild(checkbox);
    item.appendChild(label);
    this.list.appendChild(item);
    this.input.value = '';

    // Add button to remove
    const removeButton = document.createElement('button')
    removeButton.textContent = 'Remove'
    removeButton.addEventListener('click', () => this.list.removeChild(item))
    item.appendChild(removeButton)
  }
}

customElements.define('todo-list', TodoList)