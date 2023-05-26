require("colors");
const {
  inquirerMenu,
  pause,
  readInput,
  tasksListDelete,
  confirm,
  showListCheckList,
} = require("./helpers/inquirer");
const { saveDB, readDB } = require("./helpers/saveFile");
const Tasks = require("./models/tasks");

console.clear();

const main = async () => {
  let opt = "";
  const tasks = new Tasks();

  const tasksDB = readDB();

  if (tasksDB) {
    tasks.loadTasksFromArray(tasksDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await readInput("Description:");
        tasks.createTask(desc);
        break;
      case "2":
        tasks.listTasks();
        break;
      case "3":
        tasks.listPendingCompleted(true);
        break;
      case "4":
        tasks.listPendingCompleted(false);
        break;
      case "5":
        const ids = await showListCheckList(tasks.listArr);
        tasks.toggleCompleted(ids);
        break;
      case "6":
        const id = await tasksListDelete(tasks.listArr);
        if (id !== "0") {
          const confirmDelete = await confirm("Are you sure?");
          if (confirmDelete) {
            tasks.deleteTask(id);
            console.log("Task Deleted Successfully!");
          }
        }
        break;
    }

    saveDB(tasks.listArr);

    await pause();
  } while (opt !== "0");
};

main();
