import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { columns, defaultColDef } from 'constants/dataTable';
import { useCallback } from 'react';
import { useThemeContext } from 'providers';
import { TableProps } from './interface';

export default function Table(props: TableProps) {
  const { coins } = props;

  const { darkMode } = useThemeContext();

  const isDarkMode = useCallback(() => {
    if (darkMode) return 'ag-theme-alpine-dark';
    return 'ag-theme-alpine';
  }, [darkMode]);

  return (
    <div className={`mt-5 w-full h-full text-white ${isDarkMode()}`}>
      <AgGridReact
        rowData={coins}
        columnDefs={columns}
        defaultColDef={defaultColDef}
        domLayout={'autoHeight'}
        animateRows
        pagination
        paginationPageSize={50}
        rowSelection='multiple'
      />
    </div>
  );
}
