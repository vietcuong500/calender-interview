import {
  createEvent,
  deleteEvent,
  getEvents,
} from "@/modules/calender/services";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const event = await createEvent({
      title: body.title,
      date: new Date(body.date),
      timeStart: body.timeStart,
      timeEnd: body.timeEnd,
      categoryId: body.categoryId,
      userIds: body.userIds
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();
    const event = await deleteEvent({
      id: Number(body.id),
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const year = searchParams.get("year");
  const month = searchParams.get("month");

  try {
    const events = await getEvents({
      year: Number(year),
      month: Number(month) + 1,
    });

    return NextResponse.json(events, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
  }
}
