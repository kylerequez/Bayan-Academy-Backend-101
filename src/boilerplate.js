const fs = require('fs');

// console.log(fs);
// Creates a directory asynchronously
// fs.mkdir('dogs', { recursive: true }, (err) => {
//     console.log("In the callback.");
//     if (err) throw err;
// });

// Create a directory synchronously
// fs.mkdirSync('cats');
// console.log("I come after creating cats directory");

const folderName = process.argv.slice(2)[0];
// console.log(process.argv, folderName);
// console.log(folderName);
fs.mkdirSync(folderName);
console.log("I come after mkdir");

const files = process.argv.slice(3);

try {
    for(let file of files){
        let filename = file.split(".")
        if(filename.length == 2){
            fs.writeFileSync(`${folderName}/${filename[0]}.${filename[1]}`, " ");
        } else {
            console.log(`The name ${file} is invalid.`);
        }
    }
} catch (e) {
    console.log(`Error: ${e}`);
}

