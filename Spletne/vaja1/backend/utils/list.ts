import { getConnection } from "../db/getOrmConnection";
import { List } from "../entity/List";

export const insertList = async (name: string): Promise<List | null> => {
  const connection = await getConnection();
  const listRepository = connection.getRepository(List);

  const newList = new List();
  newList.name = name;

  try {
    const insertedList = listRepository.save(newList);

    return insertedList;
  } catch (error) {
    return null;
  }
};
