import { Sequelize } from "sequelize";

 export const sequelize = new Sequelize("assignment7", "root", "root", {
    host: "localhost",
    dialect: "mysql",
    
});

export const checkConnection = async () => {
    try {
        await sequelize.authenticate(); 
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

export const syncDB = async () => {
    try {
        await sequelize.sync(   { force: false, alter: false });
        console.log("Database synced successfully.");
    } catch (error) {
        console.error("Error syncing database:", error);
    }
};  



