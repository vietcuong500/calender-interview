import { Category, Event } from "@prisma/client";

type TimeBreakdownProps = {
  categories: Category[];
  events: Event[];
};

export const TimeBreakdown = (props: TimeBreakdownProps) => {
  const { categories, events } = props;
  const total = events.length;
  const categoriesByEvent = categories.map((el) => {
    const total = events.filter((event) => event.categoryId === el.id).length;
    return {
      ...el,
      total,
    };
  });

  return (
    <div className="p-4 flex flex-col gap-4">
      <p className="text-sm font-medium text-neutral-900">Time breakdown</p>
      <div className="flex flex-col gap-2">
        {categoriesByEvent.map((category, index) => (
          <div key={index} className="flex items-center justify-center">
            <div
              style={{
                backgroundColor: category.color ?? "#eee",
              }}
              className="w-2 h-2 rounded-full flex-shrink-0"
            ></div>
            <p className="text-sm w-16 flex-shrink-0 ml-2 mr-4">
              {category.title}
            </p>
            <div className="w-full h-1 bg-neutral-100 rounded-sm">
              <div
                style={{
                  backgroundColor: category.color ?? "#eee",
                  width:
                    total > 0 ? `${(category.total / total) * 100}%` : "0px",
                }}
                className="h-full rounded-sm"
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
