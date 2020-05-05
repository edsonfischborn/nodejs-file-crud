const { writeFileSync, readFileSync } = require('fs');

class FileCrud {
    constructor( fileUrl ){
        this.FILE_URL = fileUrl;
    }

    async create(user){
        const fullDb = await this.read();
        const id = Date.now();

        const newData = { id, ...user };
        fullDb.push(newData);

        await writeFileSync( this.FILE_URL, JSON.stringify(fullDb) );

        return true;
    }

    async read(){
        const fullDb = await readFileSync(this.FILE_URL);
        return JSON.parse( fullDb.toString() );
    }

    async update(id, newAttributes){
        let fullDb = await this.read();
        const index = fullDb.findIndex( elem => elem.id === parseInt(id) );
        const userData = fullDb[index];

        if( index === -1){
            throw new Error("id not found");
        }

        const newData = {
            ...userData,
            ...newAttributes
        };

        fullDb = fullDb.filter( elem => elem.id !== id);
        fullDb.push(newData);

        await writeFileSync( this.FILE_URL, JSON.stringify( fullDb ) );

        return true;
    }

    async delete(id){
        if( !id ){
            await writeFileSync( this.FILE_URL, JSON.stringify([]) );
            return true;
        }

        const fullDb = await this.read();
        const index = fullDb.findIndex( elem => elem.id === parseInt(id) );

        if( index === -1){
            throw new Error("id not found");
        }

        fullDb.splice( index, 1 );

        await writeFileSync( this.FILE_URL, JSON.stringify(fullDb) );

        return true;
    }
    
}

module.exports = FileCrud;
