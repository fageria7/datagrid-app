import Checkbox from './checkbox';
import styles from '@/styles/Home.module.css';

// Define the type for a list item of data
export type ListItemData = {
  name: string;
  device: string;
  path: string;
  status: 'available' | 'scheduled';
};

interface ListItemProps {
  listItem: ListItemData;
  isSelected: boolean;
  onListItemClick: (name: string) => void;
}

const ListItem: React.FC<ListItemProps> = ({
  listItem,
  isSelected,
  onListItemClick,
}) => {
  const { name, device, path, status } = listItem;

  return (
    <tr>
      <td>
        <Checkbox
          isChecked={isSelected}
          onChange={() => onListItemClick(name)}
        />
      </td>
      <td>{name}</td>
      <td>{device}</td>
      <td>{path}</td>
      <td>
        <div className={styles.statusContainer}>
          {status === 'available' && (
            <span
              className={`${styles.status} ${styles[status.toLowerCase()]}`}
            ></span>
          )}
          <span>{status}</span>
        </div>
      </td>
    </tr>
  );
};

export default ListItem;
