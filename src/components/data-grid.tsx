// src/components/Datagrid.tsx
import { useState } from 'react';
import styles from '@/styles/Home.module.css';
import ListItem, { ListItemData } from './list-item';
import Checkbox from './checkbox';

interface DatagridProps {
  data: ListItemData[];
}

const Datagrid: React.FC<DatagridProps> = ({ data }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(
        data.filter((row) => row.status === 'available').map((row) => row.name)
      );
    }
    setSelectAll(!selectAll);
  };

  const toggleSelectRow = (name: string) => {
    setSelectedRows((prevState) => {
      if (prevState.includes(name)) {
        return prevState.filter((row) => row !== name);
      } else {
        return [...prevState, name];
      }
    });
  };

  const isDownloadEnabled =
    selectedRows.length &&
    selectedRows.every(
      (name) => data.find((row) => row.name === name)?.status === 'available'
    );

  const handleDownload = () => {
    const selectedData = data.filter((row) => selectedRows.includes(row.name));
    let alertMessage = 'Downloaded Items';
    selectedData.forEach((row) => {
      alertMessage = alertMessage.concat(
        `\nName: ${row.name} Path: ${row.path}`
      );
    });
    alert(alertMessage);
  };

  return (
    <div className={styles.container}>
      <h1>Datagrid</h1>
      <div className={styles.datagridWrapper}>
        <div className={styles.downloadSection}>
          <div>
            <Checkbox
              isChecked={selectAll}
              onChange={toggleSelectAll}
              intermediate={
                selectedRows.length > 0 && selectedRows.length !== data.length
              }
            />
            <span>
              {selectedRows.length
                ? `${selectedRows.length} Selected`
                : 'None Selected'}
            </span>
          </div>
          <div>
            <button
              className={styles.button}
              onClick={handleDownload}
              disabled={!isDownloadEnabled}
            >
              Download Selected
            </button>
          </div>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Checkbox</th>
              <th>Name</th>
              <th>Device</th>
              <th>Path</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <ListItem
                key={index}
                listItem={row}
                isSelected={selectedRows.includes(row.name)}
                onListItemClick={toggleSelectRow}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Datagrid;
