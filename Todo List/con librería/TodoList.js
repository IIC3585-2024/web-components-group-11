import { LitElement, html, css } from 'lit';

class TodoList extends LitElement {
  constructor() {
    super();
    this.tasks = [];
  }
    
  static properties = {
    tasks: { type: Array },
    title: { type: String },
    promt: { type: String },
    item1: { type: String },
    item2: { type: String },
    item3: { type: String },
  };

  firstUpdated() {
    this.tasks = [this.item1, this.item2, this.item3].filter(Boolean);
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
  `;

  render() {
    return html`
      <h1>${this.title}</h1>
      <ul>
        ${this.tasks.map(
          (task, index) =>
            html`
              <li>
                <input type="checkbox" id="task${index}" />
                <label for="task${index}">${task}</label>
                <button @click=${() => this.removeTask(index)}>Eliminar</button>
              </li>
            `
        )}
      </ul>
      <p>${this.promt}</p>
      <input id="taskInput" type="text" placeholder="Nueva tarea" />
      <button @click=${this.addTask}>Agregar</button>
    `;
  }

  addTask() {
    console.log("aca")
    const taskInput = this.shadowRoot.getElementById('taskInput');
    const task = taskInput.value.trim();
    if (task !== '') {
      this.tasks = [...this.tasks, task];
      taskInput.value = '';
    }
  }

  removeTask(index) {
    this.tasks = this.tasks.filter((_, i) => i !== index);
  }
}

customElements.define('todo-list', TodoList);
