require("colors");
const { v4: uuidv4 } = require("uuid");
const Task = require("./task");
class Tasks {
  _list = {};

  get listArr() {
    const list = [];
    Object.keys(this._list).forEach((key) => {
      list.push(this._list[key]);
    });
    return list;
  }

  constructor(desc) {
    this._list = {};
  }

  deleteTask(id = "") {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  loadTasksFromArray(tasks = []) {
    tasks.forEach((task) => {
      this._list[task.id] = task;
    });
  }

  createTask(desc = "") {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  listTasks() {
    console.log();

    this.listArr.forEach((task, index) => {
      const number = `${index + 1}.`;
      const state = task.completionDate ? "Completed".green : "Pending".red;

      console.log(`${number.green} ${task.desc} :: ${state}`);
    });
  }

  listPendingCompleted(completed = true) {
    console.log();

    let tasks = this.listArr.filter((task) => {
      return completed
        ? task.completionDate != null
        : task.completionDate == null;
    });

    tasks.forEach((task, index) => {
      const { desc, completionDate } = task;
      const number = `${index + 1}.`;
      const state = completionDate ? `${completionDate}`.green : "Pending".red;

      console.log(`${number.green} ${desc} :: ${state}`);
    });
  }

  toggleCompleted(ids = []) {
    ids.forEach((id) => {
      const task = this._list[id];
      if (!task.completionDate) {
        task.completionDate = new Date().toISOString();
      }
    });

    this.listArr.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._list[task.id].completionDate = null;
      }
    });
  }
}

module.exports = Tasks;
