// Process dependencies
require('dotenv').config();
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

// Define the media files to be pinned
const content = [
  {
    file: fs.createReadStream("./src/(Tutorial) My First Music NFT Cover.png"),
    title: "(Tutorial) My First Music NFT Cover.png"
  },
  {
    file: fs.createReadStream("./src/(Tutorial) PetarISFire - Chainstackwave.mp3"),
    title: "(Tutorial) PetarISFire - Chainstackwave.mp3"
  }
];

// Define a function to pin files with Chainstack IPFS Storage
const addFiles = async (source, single = false) => {

  // Differentiate between pinning single and multiple files
  const url = single
    ? "https://api.chainstack.com/v1/ipfs/pins/pinfile"
    : "https://api.chainstack.com/v1/ipfs/pins/pinfiles";

  // Define the pin metadata
  const data = new FormData();
  if (single) {
    console.log(`Attempting to pin ${JSON.stringify(source[0].title)} with Chainstack IPFS Storage...\n`);
    data.append('bucket_id', process.env.BUCKET_ID);
    data.append('folder_id', process.env.FOLDER_ID);
    data.append('file', source[0].file);
    data.append('title', source[0].title);
  } else {
    source.forEach((file) => {
      console.log(`Attempting to pin ${JSON.stringify(file.title)} with Chainstack IPFS Storage...\n`);
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
    console.log(`File successfully pinned with Chainstack IPFS Storage using public ID: ${response.data.id}\n`);
    return JSON.stringify(response.data.id);
  } else {
    const pubIDs = response.data.map((item) => item.id);
    console.log(`Files successfully pinned with Chainstack IPFS Storage using public ID: ${pubIDs.join(', ')}\n`);
    return pubIDs;
  }
};

// Define a function to find CIDs for files pinned with Chainstack IPFS Storage
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

    // Loop through all the pinned files
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
        console.log(`Attempting to find CID using public ID: ${fileID} with Chainstack IPFS Storage...\n`);

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
const writeJSON = async (pinCID, pinName) => {
  let audioIPFS;
  let coverIPFS;
  if (pinCID && pinName) {
    for (var i = 0; i < pinName.length; i++) {
      if (pinName[i].includes('mp3')) {
        audioIPFS = "https://ipfsgw.com/ipfs/" + pinCID[i];
      } else {
        coverIPFS = "https://ipfsgw.com/ipfs/" + pinCID[i];
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

// Define the main function that executes all necessary functions to pin the NFT metadata
const pinNFT = async () => {
  try {
    const ids = await addFiles(content);
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const [pinCID, pinName] = await findCIDs(ids);
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const jsonMeta = await writeJSON(pinCID, pinName);
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const id = await addFiles([jsonMeta], true);
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const jsonCID = await findCIDs(id, true);
    console.log(`NFT metadata successfully pinned with Chainstack IPFS Storage!\n`);
    console.log(`Copy this line to your "mint.js" script file:\n\nconst metadata = "https://ipfsgw.com/ipfs/${jsonCID[0]}"\n`);
  } catch (error) {
    console.error(`Error during NFT pinning: ${error.message}`);
  }
};

// Don't forget to run the main function!
pinNFT();
