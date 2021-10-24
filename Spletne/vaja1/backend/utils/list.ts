import { Chor } from "../entity/Chor";
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
    const list = await listRepository.findOne(
      { id },
      { relations: ["chor", "tags"] }
    );

    return list;
  } catch (error) {
    return null;
  }
};

export const getAllLists = async (): Promise<List[] | null> => {
  const connection = await getConnection();
  const listRepository = connection.getRepository(List);
  const chorRepository = connection.getRepository(Chor);

  try {
    let lists = await listRepository.find({
      relations: ["chor", "tags"],
    });
    const chors = await chorRepository.find({
      relations: ["tags", "list"],
    });
    lists = lists.map((list: List) => {
      list.chor = chors.filter((chor: Chor) => chor.list.id === list.id);
      return list;
    });

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
