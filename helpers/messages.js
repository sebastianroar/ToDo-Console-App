require("colors");

const showMenu = () => {
  return new Promise((resolve, reject) => {
    console.clear();
    console.log("=============================".green);
    console.log("      Select an option".green);
    console.log("=============================\n".green);

    console.log(`${"1.".green} Create task`);
    console.log(`${"2.".green} List tasks`);
    console.log(`${"3.".green} List done tasks`);
    console.log(`${"4.".green} List pending tasks`);
    console.log(`${"5.".green} Finish task(s)`);
    console.log(`${"6.".green} Delete tasks`);
    console.log(`${"0.".green} Exit \n`);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question("Select an option: ", (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

const pause = () => {
  return new Promise((resolve, reject) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`\nPress ${"ENTER".green} to continue\n`, (opt) => {
      readline.close();
      resolve();
    });
  });
};

module.exports = {
  showMenu,
  pause,
};
