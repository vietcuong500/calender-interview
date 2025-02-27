import { PrismaClient } from "@prisma/client";

export async function createEvent(data: any): Promise<any> {
  const { title, date, timeStart, timeEnd, categoryId, userIds } = data;

  const prisma = new PrismaClient();
  const result = await prisma.event.create({
    data: {
      title,
      time: date,
      startAt: timeStart,
      endAt: timeEnd,
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
      week: 2,
      categoryId: Number(categoryId),
    },
  });
  await Promise.all(
    userIds.map(async (userId: string) => {
      await prisma.eventParticipant.create({
        data: {
          userId: Number(userId),
          eventId: result.id,
        },
      });
    })
  );

  return result;
}

export async function deleteEvent(data: any): Promise<any> {
  const { id } = data;

  const prisma = new PrismaClient();
  const result = await prisma.event.delete({
    where: {
      id,
    },
  });
  return result;
}

export async function getEvents(params: any) {
  const prisma = new PrismaClient();
  const events = await prisma.event.findMany({
    where: {
      year: params.year,
      month: params.month,
    },
  });
  return events;
}
