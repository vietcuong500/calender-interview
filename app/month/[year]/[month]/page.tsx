import { CalenderWrapper } from "@/modules/calender";
import { Sidebar } from "@/modules/calender/components/Sidebar";
import { PrismaClient } from "@prisma/client";
import { Suspense } from "react";
import { Toaster } from "sonner";

export default async function Home({ params }: any) {
  const prisma = new PrismaClient();
  const { year, month } = await params;

  const events = await prisma.event.findMany({
    where: {
      year: Number(year),
      month: Number(month),
    },
    include: {
      category: true,
      participants: {
        include: {
          user: true,
        },
      },
    },
  });
  const categories = await prisma.category.findMany();

  const users = await prisma.user.findMany();

  return (
    <div className="flex flex-row gap-4 bg-neutral-100 p-4">
      <p>linh tinh</p>
      <Sidebar
        events={events}
        categories={categories}
        month={month}
        year={year}
      />
      <div className="w-[80%]">
        <Suspense fallback={<p>Loading</p>}>
          <CalenderWrapper
            events={events}
            categories={categories}
            users={users}
            year={year}
            month={month}
          />
        </Suspense>
      </div>
      <Toaster />
    </div>
  );
}
