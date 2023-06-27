// Process dependencies
require('dotenv').config();
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

// Define the media files to be uploaded
const content = [
  {
    file: fs.createReadStream("./src/(Sample) My First Music NFT Cover.png"),
    title: "(Sample) My First Music NFT Cover.png"
  },
  {
    file: fs.createReadStream("./src/(Sample) PetarISFire - Chainstackwave.mp3"),
    title: "(Sample) PetarISFire - Chainstackwave.mp3"
  }
];

// Define a function to upload files to IPFS via the Chainstack API
const addFiles = async (source, single = false) => {

  // Differentiate between uploading single and multiple files
  const url = single
    ? "https://api.chainstack.com/v1/ipfs/pins/pinfile"
    : "https://api.chainstack.com/v1/ipfs/pins/pinfiles";

  // Define the upload metadata
  const data = new FormData();
  if (single) {
    console.log(`Attempting to upload ${JSON.stringify(source[0].title)} to Chainstack IPFS...\n`);
    data.append('bucket_id', process.env.BUCKET_ID);
    data.append('folder_id', process.env.FOLDER_ID);
    data.append('file', source[0].file);
    data.append('title', source[0].title);
  } else {
    source.forEach((file) => {
      console.log(`Attempting to upload ${JSON.stringify(file.title)} to Chainstack IPFS...\n`);
      data.append('bucket_id', process.env.BUCKET_ID);
      data.append('folder_id', process.env.FOLDER_ID);
      data.append('file', file.file);
      data.append('title', file.title);
    });
  }

  // Define the Axios configuration
  const config = {
    method: 'POST',
    url: url,
    headers: {
      "Content-Type": 'multipart/form-data;',
      "Authorization": process.env.CHAINSTACK,
      ...data.getHeaders()
    },
    data: data
  };

  // Store the Axios response
  const response = await axios(config);
  if (single) {
    console.log(`File successfully uploaded to Chainstack IPFS with public ID: ${response.data.id}\n`);
    return JSON.stringify(response.data.id);
  } else {
    const pubIDs = response.data.map((item) => item.id);
    console.log(`Files successfully uploaded to Chainstack IPFS with public IDs: ${pubIDs.join(', ')}\n`);
    return pubIDs;
  }
};

// Define a function to find CIDs for files uploaded to IPFS
const findCIDs = async (fileID, single = false) => {
  if (single) {
    fileID = fileID.replace(/"/g, '');
    fileID = [fileID];
  }

  // Define the maximum retries and the timeout between retries
  const maxRetries = 5;
  const retryTimeout = 22000;

  if (!single) {
    let cid = [];
    let name = [];

    // Loop through all the uploaded files
    for (var i = 0; i < fileID.length; i++) {

      // Get the CID and filename for the file
      const result = await findCIDs(fileID[i], true);
      cid.push(result[0]);
      name.push(result[1]);
    }

    // Print the CIDs found and return the cid and name values
    console.log(`All CIDs found: ${cid.join(', ')}\n`);
    return [cid, name];
  } else {
    let cid;
    let name;
    let retries = 0;

    // Set up the retry loop
    while (retries < maxRetries) {
      try {
        console.log(`Attempting to find CID via public ID: ${fileID} on Chainstack IPFS...\n`);

        // Define the Axios configuration
        const url = "https://api.chainstack.com/v1/ipfs/pins/" + fileID;
        var config = {
          method: 'GET',
          url: url,
          headers: {
            "Content-Type": 'text/plain',
            "Authorization": process.env.CHAINSTACK,
            "Accept-Encoding": 'identity',
          },
          decompress: false 
        };

        // Store the Axios response
        const response = await axios(config);
        console.log(`CID found: ${response.data.cid} Filename: ${response.data.title}\n`);

        cid = response.data.cid;
        name = response.data.title;

        // Throw an error if the cid and name values are not valid
        if (cid != null && cid !== 'error' && name != null && name !== 'error') {
          break;
        } else {

          // Throw an error if the CID and filename are not valid
          throw new Error('CID or name values are not valid.');
        }
      } catch (error) {
        console.error(`Error in findCIDs: ${error.message}.. Attempting to retry...\n`);

        // Retry after the timeout if unsuccessful
        retries++;
        await new Promise((resolve) => setTimeout(resolve, retryTimeout));
      }
    }
    return [cid, name];
  }
};

// Define a function to write the metadata to a .json file
const writeJSON = async (uploadCID, uploadName) => {
  let audioIPFS;
  let coverIPFS;
  if (uploadCID && uploadName) {
    for (var i = 0; i < uploadName.length; i++) {
      if (uploadName[i].includes('mp3')) {
        audioIPFS = "https://ipfsgw.com/ipfs/" + uploadCID[i];
      } else {
        coverIPFS = "https://ipfsgw.com/ipfs/" + uploadCID[i];
      }
    }

    // Write the metadata to the file ./src/NFTmetadata.json
    fs.writeFileSync('./src/NFTmetadata.json', JSON.stringify({
      "description": "My first music NFT mint.",
      "external_url": "https://chainstack.com/nfts/",
      "image": coverIPFS,
      "animation_url": audioIPFS,
      "name": "PetarISFire - Chainstackwave"
    }));

    let jsonMeta;
    if (fs.existsSync('./src/NFTmetadata.json')) {
      jsonMeta = {
        file: fs.createReadStream('./src/NFTmetadata.json'),
        title: "NFTmetadata.json"
      };
    }
    return jsonMeta;
  }
};

// Define the main function that executes all necessary functions to upload the NFT metadata
const uploadNFT = async () => {
  try {
    const ids = await addFiles(content);
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const [uploadCID, uploadName] = await findCIDs(ids);
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const jsonMeta = await writeJSON(uploadCID, uploadName);
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const id = await addFiles([jsonMeta], true);
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const jsonCID = await findCIDs(id, true);
    console.log(`NFT metadata successfully uploaded to Chainstack IPFS!\n`);
    console.log(`Copy this line to your "mint.js" script file:\n\nconst metadata = "https://ipfsgw.com/ipfs/${jsonCID[0]}"\n`);
  } catch (error) {
    console.error(`Error during NFT upload: ${error.message}`);
  }
};

// Don't forget to run the main function!
uploadNFT();
