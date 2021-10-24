import { getConnection } from "../db/getOrmConnection";
import { Chor } from "../entity/Chor";
import { Tag } from "../entity/Tag";

export const insertChorTag = async (
  name: string,
  chorId: string
): Promise<Tag | null> => {
  const connection = await getConnection();
  const chorRepository = connection.getRepository(Chor);
  const tagRepository = connection.getRepository(Tag);

  const newTag = new Tag();
  newTag.name = name;

  const chor = await chorRepository.findOne(
    { id: chorId },
    { relations: ["tags"] }
  );
  chor.tags.push(newTag);

  try {
    const insertedNewTag = await tagRepository.save(newTag);
    const updatedChor = await chorRepository.save(chor);

    return newTag;
  } catch (error) {
    return null;
  }
};

export const deleteChorTag = async (id: string): Promise<boolean> => {
  const connection = await getConnection();
  const tagRepository = connection.getRepository(Tag);

  try {
    await tagRepository.delete({ id });

    return true;
  } catch (error) {
    return false;
  }
};

export const updateChorTag = async (
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
