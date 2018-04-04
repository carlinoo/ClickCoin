const Blockchain = require('../../blockchain');
const bc = new Blockchain();
let time = Date.now();
let past_time = time;

for (let i = 0; i < 10; i++) {
  past_time = time;
  time = Date.now();
  console.log(bc.addBlock('foo ' + i).toString());
  console.log("\nTIME TAKEN: " + (time - past_time)/1000 + "seconds\n");
}
