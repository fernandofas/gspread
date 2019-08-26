const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require ('util');
const creds = require ('./client_secret.json');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
    path: './data.csv',
    header: [
        {id: 'name', title: 'NAME'},
        {id: 'surname', title: 'SURNAME'},
        {id: 'age', title: 'AGE'},
        {id: 'genre', title: 'GENRE'}
    ]
});

function printData (survey) {
    console.log(`Name: ${survey.name}`);
    console.log(`Surname: ${survey.surname}`);
    console.log(`Age: ${survey.age}`);
    console.log(`Genre: ${survey.genre}`);
    console.log(`=====================`);   
}

async function accessSpreadsheet() {
    const doc = new GoogleSpreadsheet('1Ob2fTJlOYAUdfLfkDK7eNMKSJEXkj9XK206MJgTZXbQ');
    await promisify(doc.useServiceAccountAuth)(creds);
    const info = await promisify(doc.getInfo)();
    const sheet = info.worksheets[0];

    const rows = await promisify(sheet.getRows)({
        offset: 1
    });

    rows.forEach(row => {
        csvWriter.writeRecords(rows) 
        printData(row);
    })
}
accessSpreadsheet();