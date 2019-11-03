const commander = require('commander');
const command = new commander.Command();
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const vardas = "Martynas";
const pavarde = "Jakas";
const grupe = "Prif-18/3";

command
.option('-a, --A <number>', 'First decimal number')
.option('-b, --B <number>', 'Second deciman number')
.parse(process.argv);

if(command.A === undefined)
{
  console.log(`'A' argument is required`);
  process.exit(0);
}

if(command.B === undefined)
{
  console.log(`'B' argument is required`);
  process.exit(0);
}

const a = parseInt(command.A);
const b = parseInt(command.B);

if(typeof a !== 'number')
{
  console.log(`'A' argument must be a number`);
  process.exit(0);
}

if(typeof b !== 'number')
{
  console.log(`'B' argument must be a number`);
  process.exit(0);
}

// XOR1
const xor1string = '(!A&B)|(!B&A)';
const xor1 = function(a, b) {
  return (~a&b)|(~b&a);
}
// XOR2
const xor2string = '!(!(A&!(A&B))&!(B&!(A&B)))'
const xor2 = function(a, b) {
  return ~(~(a&~(a&b))&~(b&~(a&b)));
}
// XOR3
const xor3string = '(A|B)&!(A&B)'
const xor3 = function(a, b) {
  return (a|b)&~(a&b);
}
// XOR4
const xor4string = '(A|B)&(!A|!B)'
const xor4 = function(a, b) {
  return (a|b)&(~a|~b);
}

// CSV
const csvWriter = createCsvWriter({
  path:'csv.csv',
  header: [
    {id:'vardas', title:'Vardas'},
    {id:'pavarde', title:'Pavarde'},
    {id:'grupe', title:'Grupe'},
    {id:'a', title:'A'},
    {id:'b', title:'B'},
    {id:'xor1', title:xor1string},
    {id:'xor2', title:xor2string},
    {id:'xor3', title:xor3string},
    {id:'xor4', title:xor4string},
  ]
})

const data = [
  {
    vardas:vardas,
    pavarde:pavarde,
    grupe:grupe,
    a:a,
    b:b,
    xor1:xor1(a,b),
    xor2:xor2(a,b),
    xor3:xor3(a,b),
    xor4:xor4(a,b),
  }
]

csvWriter
  .writeRecords(data)
  .then(() => console.log('The CSV file was written successfully'));
