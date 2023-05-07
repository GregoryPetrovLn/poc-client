interface Props {
  tableRender: TableRenderer[];
  onRowClick: (id: number) => void;
  list: Product[] | null;
}
const Table = ({ tableRender, onRowClick, list }: Props) => {
  return (
    <table className="table-auto border-collapse border border-gray-400 w-full">
      <thead className="hidden md:table-header-group">
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
          <tr className="even:bg-gray-100">
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
