//const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

        const csvWriter = createCsvWriter({
            path: 'file.csv',
            header: [
                {id: 'id', title: 'USER_ID'},
                {id: 'name', title: 'USERNAME'},
                {id: 'total_budget', title: 'TOTAL_BUDGET'},
                {id: 'peopel_id', title: 'PEOPLE_ID'},
                {id: 'people_name', title: 'PEOPLE_NAME'},
                {id: 'budget', title: 'BUDGET'},
                {id: 'user_id', title: 'USER_ID2'},
                {id: 'gifts', title: 'GIFTS'}
            ]
        });

        const records = await fetch(`/api/users/`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            console.log('response ok');

            csvWriter.writeRecords(records)       // returns a promise
            .then(() => {
                console.log('...CSV generated');
            }); 

        } else { 
            alert('Cannot retrieve records for to generate csv file')
        }
        