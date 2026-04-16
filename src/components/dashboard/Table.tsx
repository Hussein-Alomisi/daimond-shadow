import { ReactNode } from "react";

interface Column {
  header: string;
  accessor: string;
  render?: (row: any) => ReactNode;
}

interface TableProps {
  columns: Column[];
  data: any[];
  isLoading?: boolean;
  /** Custom actions renderer per row. Falls back to static placeholder if not provided. */
  renderActions?: (row: any) => ReactNode;
}

export function Table({ columns, data, isLoading, renderActions }: TableProps) {
  if (isLoading) {
    return (
      <div className="bg-secondary rounded-2xl border border-white/10 p-8 flex justify-center items-center shadow-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div className="bg-secondary rounded-2xl border border-white/10 overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-6 py-4 text-sm font-bold text-white/80">
                  {col.header}
                </th>
              ))}
              <th className="px-6 py-4 text-sm font-bold text-white/80 w-36">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {data.length > 0 ? (
              data.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-primary transition-colors group">
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className="px-6 py-4 text-sm text-white group-hover:text-gold transition-colors">
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                    <td className="px-6 py-4 text-sm">
                    {renderActions ? (
                      renderActions(row)
                    ) : (
                      <div className="flex items-center gap-4 text-white/40 text-xs italic">—</div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-white/40">
                  لا توجد بيانات لعرضها
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
