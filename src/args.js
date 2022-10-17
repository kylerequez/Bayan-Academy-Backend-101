// console.log("Hello from Args.js file");
// console.log(process.argv);

const args = process.argv.slice(2);

// Script that greets the arguments
for(let arg of args)
{
    console.log(`Hello ${arg}`);
}