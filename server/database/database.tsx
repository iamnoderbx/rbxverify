// get the client
import mysql from 'mysql2/promise'
import chalk from 'chalk';

const InternalTableTypes = {
  VERIFICATIONS: 'verifications',
  GUILDS: 'guilds',
  USERS: 'users',
};

class InternalDataKey {
    table: any;
    val: string | undefined;
    constructor(table: any) {
        this.table = table;
    }

    value(val: { toString: () => any; }) {
        this.val = val.toString();
        return this;
    }
};

class InternalDatabase {
    constructor() {

    };

    async connect() {
        const connection = await mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'root',
        });

        console.log(chalk.green("[DATABASE] Connected to MySQL server."));

        await connection.query("CREATE DATABASE IF NOT EXISTS rbxverify");
        console.log(chalk.green("[DATABASE] Registed SQL Verification Database"))

        //let delete_connection = await mysql.createConnection({host:'localhost', user: 'root', password: 'root', database: 'rbxverify'});
        //await delete_connection.query("DROP TABLE users")

        connection.destroy()
    }

    async get(dataKey : InternalDataKey) {
        let connection = await mysql.createConnection({host:'localhost', user: 'root', password: 'root', database: 'rbxverify'});
        var sql = "CREATE TABLE IF NOT EXISTS " + dataKey.table + " (`id` int(11) NOT NULL AUTO_INCREMENT, `directory` VARCHAR(255), `package` json DEFAULT NULL, PRIMARY KEY (`directory`))";
        await connection.query(sql);

        var sql = "SELECT * FROM " + dataKey.table + " WHERE directory = ?";

        const resultQuery : any = await connection.query(sql, [dataKey.val]);
        if(!resultQuery[0]) return null;

        connection.destroy();

        if(!resultQuery[0]) return null;
        if(!resultQuery[0][0]) return null;

        return resultQuery[0][0].package
    }

    async set(dataKey : InternalDataKey, value : any) {
        let connection = await mysql.createConnection({host:'localhost', user: 'root', password: 'root', database: 'rbxverify'});
        let jsonString = JSON.stringify(value);

        var sql = "CREATE TABLE IF NOT EXISTS " + dataKey.table + " (`directory` VARCHAR(255), `package` json DEFAULT NULL, PRIMARY KEY (`directory`))";
        await connection.query(sql);

        //var sql = `UPDATE ${dataKey.table} SET package='${jsonString}' WHERE directory='${dataKey.val}'`
        //var sql = `REPLACE INTO ${dataKey.table} VALUES (1, '${dataKey.val}', '${jsonString}')`;

        var sql = `INSERT INTO ${dataKey.table} (directory, package) VALUES ('${dataKey.val}', '${jsonString}') ON DUPLICATE KEY UPDATE package = VALUES(package)`;

        let [response, err] = await connection.query(sql);
        connection.destroy();

        if(err) return true;
        return false;
    };
};

let Database: InternalDatabase;

declare global {
    var __databaseHandler: InternalDatabase | undefined;
}

if (!global.__databaseHandler || global.__databaseHandler == undefined ) {
    global.__databaseHandler = new InternalDatabase();
    global.__databaseHandler.connect();
}

Database = global.__databaseHandler;

export let DataKey = InternalDataKey;
export { Database };
export let DataTableTypes = InternalTableTypes;