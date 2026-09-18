import type { Row } from '@/lib/data';

interface Props {
  title?: string;
  rows: Row[];
  className?: string;
}

export default function SpecTable({ title, rows, className = '' }: Props) {
  return (
    <div className={`rounded-2xl border border-gray-100 bg-white overflow-hidden ${className}`}>
      {title && (
        <h3 className="font-display text-lg font-bold text-pt-gray px-6 pt-5 pb-3">{title}</h3>
      )}
      <table className="w-full text-sm">
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.label} className={i % 2 === 1 ? 'bg-pt-light/60' : ''}>
              <th
                scope="row"
                className="text-left font-normal text-gray-500 px-6 py-3 align-top w-[46%] border-t border-gray-100"
              >
                {r.label}
              </th>
              <td className="font-medium text-pt-gray px-6 py-3 text-right align-top border-t border-gray-100">
                {r.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
