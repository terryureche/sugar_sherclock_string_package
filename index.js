const Process = require("./utils/Process").process;

const run = async () => {
    let process = new Process();
    await process.start();
}

run();