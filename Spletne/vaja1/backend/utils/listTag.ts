import { getConnection } from "../db/getOrmConnection";
import { List } from "../entity/List";
import { Tag } from "../entity/Tag";

export const insertListTag = async (
  name: string,
  listId: string
): Promise<Tag | null> => {
  const connection = await getConnection();
  const listRepository = connection.getRepository(List);
  const tagRepository = connection.getRepository(Tag);

  const newTag = new Tag();
  newTag.name = name;

  const list = await listRepository.findOne(
    { id: listId },
    { relations: ["tags"] }
  );
  list.tags.push(newTag);

  try {
    const insertedNewTag = await tagRepository.save(newTag);
    await listRepository.save(list);

    return insertedNewTag;
  } catch (error) {
    return null;
  }
};

export const deleteListTag = async (id: string): Promise<boolean> => {
  const connection = await getConnection();
  const tagRepository = connection.getRepository(Tag);

  try {
    await tagRepository.delete({ id });

    return true;
  } catch (error) {
    return false;
  }
};

export const updateListTag = async (
  name: string,
  id: string
): Promise<boolean> => {
  const connection = await getConnection();
  const tagRepository = connection.getRepository(Tag);

  try {
    await tagRepository.update({ id }, { name });

    return true;
  } catch (error) {
    return false;
  }
};
