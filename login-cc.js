const CosmosClient = require("@azure/cosmos").CosmosClient;

const config = {
    endpoint: "https://cosmos-forproject.documents.azure.com:443/",
    key: "jlTqbd7I251VI73sRlIO8PJwIZEhOuILQfptnl8ANTtP4KSyYhU9zyDHioE3zZTBxWHahJMMhWqTC3kNwMfQ7g==",
    databaseId: "login-info",
    containerId: "food",
    partitionKey: { kind: "Text", paths: ["/name"] }
  };
  
const { endpoint, key, databaseId, containerId } = config;
const client = new CosmosClient({ endpoint, key });
const clicbut = document.getElementById("submit-button");
const id_login = document.getElementById("login-name");
const id_pass = document.getElementById("password-text");
const database = client.database(databaseId);
const container = database.container(containerId);

const myFunction = async() => {
    // query to return all items
    const querySpec = {
      query: "SELECT * FROM food"
    };
    
    // read all items in the Items container
    const { resources: items } = await container.items
    .query(querySpec)
    .fetchAll();
    
    items.forEach(item => {
        if(item.id == id_login.value){
            if(item.password == id_pass.value){
               /* console.log(item.name);
                console.log(item.password);*/
                window.location.replace("./index.html");
            }else{
                alert("Wrong UserName OR Password");
            }
        }else{
           alert("Wrong UserName OR Password");
        }
            //console.log(`${item.id} ${item.name} ${item.password}`); 
    });
  };

  clicbut.addEventListener("click",myFunction);
