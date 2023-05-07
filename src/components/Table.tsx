import { FC } from "react";

interface Props {
  tableRender: TableRenderer[];
  onRowClick: (id: string) => void;
  list: Product[] | null;
}
const Table: FC<Props> = ({ tableRender, onRowClick, list }) => {
  return (
    <table className="table-auto border-collapse border border-gray-400 w-full">
      <thead className="hidden md:table-header-group sticky top-0">
        <tr>
          {tableRender.map((item: TableRenderer, idx: number) => (
            <th
              key={`header-${idx}`}
              className="px-4 py-2 bg-gray-200 text-gray-700 border border-gray-400"
            >
              {item.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {list?.map((item: Product, idx) => (
          <tr
            key={`tr-${idx}`}
            className="even:bg-gray-100 hover:bg-gray-200 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              onRowClick(item._id);
            }}
          >
            {tableRender.map(({ id }, dataIndex) => {
              type ObjectKey = keyof typeof item;
              return (
                <td
                  key={`td-${dataIndex}-tr${idx}`}
                  className="px-4 py-2 border"
                >
                  {item[id as ObjectKey]}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
