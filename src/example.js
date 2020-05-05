const FileCrud = require('./js/FileCrud');
const userCrud = new FileCrud(__dirname + "/db/production.json");

// Log Data Base, file -> src/db/production.json
userCrud.read().then( allDb => console.log(allDb) );

async function example(){

    // Create user
    await userCrud.create( { name:"Ajax", phone: 999999 } );
    await userCrud.create( { name:"Rest", phone: 111111 } );  
    await userCrud.create( { name:"invalid", phone: false } );
    await userCrud.create( { name:"invalid2", phone: false } );
    
    // Update user
    let invalidOneId = await findIdByName("invalid");
    await userCrud.update( invalidOneId, {name:"php", phone: 55555} );
    
    // Delete user 
    let invalidTwoId = await findIdByName("invalid2");
    await userCrud.delete( invalidTwoId );

    // Aux function
    async function findIdByName( name ){
        let db = await userCrud.read();
        db = db.filter( user => user.name === name);
        const [ {id} ] = db;
    
        return id;
    }
    
}


example();


setTimeout( () => {
    console.log("Deleting all database, 14s...");
}, 6000);

setTimeout( () => {
    // Empty param === delete all database
    userCrud.delete();
}, 20000);

