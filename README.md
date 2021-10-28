# CC_Project
CC Project for azure storage handling from browser app

This project will lets you create your separate container in the Azure Storage..and lets you perform all the operations on the blob storage.
You can upload various files to the blob and those file will be save in the blob storage.

TO RUN THIS PROJECT :
1. clone repository -> install required packages (npm install --save @azure/storage-blob) for accessing storage blob

2. (npm install -g parcel-bundler) install parcel bundler
[To use Azure SDK libraries on a website, convert your code to work inside the browser. We do this using a tool called a bundler. Bundling takes JavaScript code written using Node.js conventions and converts it into a format that's understood by browsers.]

3. To launch the local development web server, select View > Terminal to open a console window inside Visual Studio Code, then enter the following command:

parcel index.html

Parcel bundles your code and starts a local development server for your page at http://localhost:1234/index.html. Changes you make to index.js will automatically be built and reflected on the development server whenever you save the file.

If you receive a message that says configured port 1234 could not be used, you can change the port by running the command 
parcel -p <port#> index.html. 
In the launch.json file, update the port in the URL path to match.


