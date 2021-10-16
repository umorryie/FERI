import { getConnection } from "../db/getOrmConnection";
import { List } from "../entity/List";

export const insertList = async (name: string): Promise<List | null> => {
  const connection = await getConnection();
  const listRepository = connection.getRepository(List);

  const newList = new List();
  newList.name = name;

  try {
    const insertedList = await listRepository.save(newList);

    return insertedList;
  } catch (error) {
    return null;
  }
};

export const getList = async (id: string): Promise<List | null> => {
  const connection = await getConnection();
  const listRepository = connection.getRepository(List);

  try {
    const list = await listRepository.findOne({ id });

    return list;
  } catch (error) {
    return null;
  }
};

export const getAllLists = async (): Promise<List[] | null> => {
  const connection = await getConnection();
  const listRepository = connection.getRepository(List);

  try {
    const lists = await listRepository.find();

    return lists;
  } catch (error) {
    return null;
  }
};

export const deleteList = async (id: string): Promise<boolean> => {
  const connection = await getConnection();
  const listRepository = connection.getRepository(List);

  try {
    await listRepository.delete({ id });

    return true;
  } catch (error) {
    return false;
  }
};

export const updateList = async (
  id: string,
  name: string
): Promise<boolean> => {
  const connection = await getConnection();
  const listRepository = connection.getRepository(List);

  try {
    await listRepository.update({ id }, { name });

    return true;
  } catch (error) {
    return false;
  }
};
