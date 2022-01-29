const fsPromises= require('fs').promises;
const path = require('path')

//unlink is how to delete a file

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(path.join(__dirname, 'data.json'),'utf8');
    console.log(data);
    await fsPromises.writeFile(path.join(__dirname, 'promisenewtext.txt'),data);
    await fsPromises.appendFile(path.join(__dirname, 'promisenewtext.txt'),'\n\n Have a great day');
    await fsPromises.rename(path.join(__dirname, 'promisenewtext.txt'),'\n\n Have a great day'),path.join(__dirname,'promisenewnewtext.txt');
    const newData = await fsPromises.readFile(path.join(__dirname,'promisenewnewtext.txt'), 'utf8');
    console.log(newData);
  } catch (err){
    console.error(err);
  }
}

fileOps();

