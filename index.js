// index.js
import 'regenerator-runtime/runtime'

const { BlobServiceClient } = require("@azure/storage-blob");

const createContainerButton = document.getElementById("create-container-button");
const deleteContainerButton = document.getElementById("delete-container-button");
const selectButton = document.getElementById("select-button");
const fileInput = document.getElementById("file-input");
const listButton = document.getElementById("list-button");
const deleteButton = document.getElementById("delete-button");
const status = document.getElementById("status");
const fileList = document.getElementById("file-list");

const blobSasUrl = "https://forgivenazureproject.blob.core.windows.net/?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2021-10-28T02:15:38Z&st=2021-10-27T18:15:38Z&spr=https&sig=BcRFcgvnVeJf3lLLt7EkmWa61gKsEuqxy%2F%2FqTo4YcsA%3D";

// Create a new BlobServiceClient
const blobServiceClient = new BlobServiceClient(blobSasUrl);

// Create a unique name for the container by 
// appending the current hour to the file name
const containerName = "container" + new Date().getHours();

// Get a container client from the BlobServiceClient
const containerClient = blobServiceClient.getContainerClient(containerName);

const createContainer = async () => {
    try {
        alert('Creating Container '+containerName);
        await containerClient.create();

        alert("Done");
    } catch (error) {
        alert(error.message);
    }
};

const deleteContainer = async () => {
    try {

        alert('Deleting Container '+containerName);
        await containerClient.delete();

        alert("Done");
    } catch (error) {
        alert(error.message);
    }
};

createContainerButton.addEventListener("click", createContainer);
deleteContainerButton.addEventListener("click", deleteContainer);

const listFiles = async () => {
    fileList.size = 0;
    fileList.innerHTML = " ";
    try {

        let iter = containerClient.listBlobsFlat();
        let blobItem = await iter.next();
        while (!blobItem.done) {
            fileList.size += 1;
            fileList.innerHTML += `<option>Name : ${blobItem.value.name} </br>   |    Last Modified : ${blobItem.value.properties.lastModified} </br></option>`;
            blobItem = await iter.next();
        }
        if (fileList.size > 0) {
            //alert("Done.");
        } else {
            alert("The container does not contain any files.");
        }
    } catch (error) {
        console.log(error.message);
    }
};

listButton.addEventListener("click", listFiles);

const uploadFiles = async () => {
    try {
        alert("Uploading files...");
        const promises = [];
        for (const file of fileInput.files) {
            const blockBlobClient = containerClient.getBlockBlobClient(file.name);
            promises.push(blockBlobClient.uploadBrowserData(file));
        }
        await Promise.all(promises);
        alert("Done.");
        listFiles();
    }
    catch (error) {
            alert(error.message);
    }
}

selectButton.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", uploadFiles);

const deleteFiles = async () => {
    try {
        if (fileList.selectedOptions.length > 0) {
        
            alert("Deleting files...");
            for (const option of fileList.selectedOptions) {
                await containerClient.deleteBlob(option.text);
            }
        
            alert("Done");
            listFiles();
        } else {
            alert("No files Selected");

        }
    } catch (error) {
        console.log(error.message);
    }
};

deleteButton.addEventListener("click", deleteFiles);
