import { createConnection, ConnectionOptions, Connection } from "typeorm";
import dotenv from "dotenv";

import { Chor } from "../entity/Chor";
import { List } from "../entity/List";
import { Tag } from "../entity/Tag";

dotenv.config({ path: `${process.env.PWD}/.env` });

let connection: Connection;

export const getConnection = async (): Promise<Connection> => {
  const options: ConnectionOptions = {
    type: "postgres",
    url: process.env.DB_CONNECT,
    entities: [Chor, List, Tag],
    synchronize: true,
    schema: "spletne",
  };
  if (connection) {
    return connection;
  }

  try {
    connection = await createConnection(options);
    return connection;
  } catch (error) {
    return null;
  }
};

getConnection();
