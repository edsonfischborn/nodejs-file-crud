const path = require('path');
const assert= require('assert');

const FileCrud = require('../js/FileCrud');

const testCrud = new FileCrud( path.join(__dirname, ".././db/test.json") );


const DEFAULT_OBJ_CREATE = {
    name: "banana",
    color: "yellow",
    size: 15
}

const DEFAULT_OBJ_UPDATE = {
    name: "apple",
    color: "red",
    size: 6
}

const DEFAULT_OBJ_REMOVE = {
    name: "mango",
    color: "red",
    size: 20
}

describe("Class FileCrud tests", () => {

    describe("#create()", async () => {
        it("Should return true", async () => {
            const result = await testCrud.create(DEFAULT_OBJ_CREATE);
            assert.equal( result, true);
        });

        it("Should create the expected object", async () => {
            const [first] = await testCrud.read();
            const {name} = first;
            assert.deepEqual( name, DEFAULT_OBJ_CREATE.name);
        });

    });

    describe("#read()", () => {
        it("Should return an array", async () => {
            const result = await testCrud.read(); 
            assert.equal( Array.isArray(result), true);
        });

        it("Should return a element of type object", async () => {
            const result = await testCrud.read(); 
            const [first] = result;
            assert.equal( Object.prototype.toString.call(first), Object.prototype.toString.call( new Object() ) );
        });

    });

    describe("#update()", () => {
        let USER_ID = '';

        it("Should return true", async() => {
            const [firstData] = await testCrud.read();
            const result = await testCrud.update(firstData.id, DEFAULT_OBJ_UPDATE);
            USER_ID = firstData.id;
            assert.equal(result, true);
        });

        it("Should insert expected values", async () => {
            const [newFirstData] = await testCrud.read();
            assert.deepEqual(newFirstData.name, DEFAULT_OBJ_UPDATE.name);
        });

        it("Should keep id", async () => {
            const [newFirstData] = await testCrud.read();
            assert.deepEqual( newFirstData.id, USER_ID);
        });

    });

    describe("#delete", () => {
        it("Should delete user by your id", async() => {
            await testCrud.create(DEFAULT_OBJ_REMOVE);

            const [first, remove] = await testCrud.read();
            const result = await testCrud.delete(remove.id);

            assert.equal(result, true);
        });

        it("Should delete all db", async() => {
            const result = await testCrud.delete();
            assert.equal(result, true);
        });

    });

});
