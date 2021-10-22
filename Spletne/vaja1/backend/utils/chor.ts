import { UpdateChor } from "../interfaces/chor";
import { getConnection } from "../db/getOrmConnection";
import { Chor } from "../entity/Chor";
import { List } from "../entity/List";

export const insertChor = async (
  name: string,
  listId: string,
  until: Date,
  alertBeforeHours: number
): Promise<Chor | null> => {
  const connection = await getConnection();
  const chorRepository = connection.getRepository(Chor);
  const listRepository = connection.getRepository(List);

  try {
    const list = await listRepository.findOne({ id: listId });

    const newChor = new Chor();
    newChor.name = name;
    newChor.until = until;
    newChor.list = list;
    newChor.alert_before_hours = alertBeforeHours;
    const insertedChor = await chorRepository.save(newChor);

    return insertedChor;
  } catch (error) {
    return null;
  }
};

export const getAllListsChors = async (
  listId: string
): Promise<Chor[] | null> => {
  const connection = await getConnection();
  const chorRepository = connection.getRepository(Chor);

  try {
    const chors = await chorRepository.find({
      where: [{ list: listId }],
    });

    return chors;
  } catch (error) {
    return null;
  }
};

export const deleteChor = async (id: string): Promise<boolean> => {
  const connection = await getConnection();
  const chorRepository = connection.getRepository(Chor);

  try {
    await chorRepository.delete({ id });

    return true;
  } catch (error) {
    return false;
  }
};

export const updateChor = async (
  id: string,
  name?: string,
  until?: Date,
  done?: boolean,
  alertBeforeHours?: number
): Promise<boolean> => {
  const connection = await getConnection();
  const chorRepository = connection.getRepository(Chor);

  try {
    const updateProperties = {} as UpdateChor;
    if (name) {
      updateProperties.name = name;
    }

    if (until) {
      updateProperties.until = until;
    }

    if (done === false || done === true) {
      updateProperties.done = done;
    }

    if (alertBeforeHours) {
      updateProperties.alert_before_hours = alertBeforeHours;
    }

    await chorRepository.update({ id }, updateProperties);

    return true;
  } catch (error) {
    return false;
  }
};
