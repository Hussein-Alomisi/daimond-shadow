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
}

export function Table({ columns, data, isLoading }: TableProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-6 py-4 text-sm font-semibold text-slate-700">
                  {col.header}
                </th>
              ))}
              <th className="px-6 py-4 text-sm font-semibold text-slate-700 w-24">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.length > 0 ? (
              data.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-slate-50 transition-colors">
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className="px-6 py-4 text-sm text-slate-600">
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-4">
                      <button className="text-blue-600 hover:text-blue-800 transition-colors font-medium">تعديل</button>
                      <button className="text-red-600 hover:text-red-800 transition-colors font-medium">حذف</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-slate-400">
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
