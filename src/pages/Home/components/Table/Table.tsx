import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useThemeContext } from '../../../../store';
import { ICoins } from '../../../../interfaces';
import { columns, defaultColDef } from '../../../../constants';

interface Props {
  coins: ICoins[]
};

export default function Table({ coins }: Props) {
  const { darkMode } = useThemeContext();

  return (
    <div
      className={
        'mt-5 w-full h-full ' +
        (darkMode ? 'ag-theme-alpine-dark' : 'ag-theme-alpine')
      }
    >
      <AgGridReact
        rowData={coins}
        columnDefs={columns}
        defaultColDef={defaultColDef}
        domLayout={'autoHeight'}
        animateRows={true}
        pagination={true}
        paginationPageSize={50}
        rowSelection='multiple'
      />
    </div>
  );
};
