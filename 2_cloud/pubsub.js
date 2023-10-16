const { Storage } = require('@google-cloud/storage');


const urlApiJCDecaux = "https://api.jcdecaux.com/vls/v1/stations?contract=amiens&apiKey=01bf135f69fc184acbdcdfbf926e670b1358bfb8"

const projectId = ' androidprojecttrochon';
const bucketName = 'malafrus-bucket-velib-libre'; 

//const keyFilename = './key.json'   //local
//const storage = new Storage({ keyFilename,projectId });

const storage = new Storage({ projectId }); //cloud

async function fetchApiAndSaveInBucket() {
    try {
        const response = await fetch(urlApiJCDecaux);
        if (!response.ok) {
            throw new Error('Erreur de requête : ' + response.status);
        }

        const data = await response.json();

        const timestamp = Date.now(); 
        const fileName = `data_${timestamp}.json`;
    

        const bucket = storage.bucket(bucketName);
        const file = bucket.file(fileName);

        await file.save(JSON.stringify(data), {
            contentType: 'application/json',
        });
        console.log('Données stockées avec succès dans le bucket GCS.');
    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
    }
}

functions.http('Trigger', (req, res) => {
    fetchApiAndSaveInBucket();
  });
