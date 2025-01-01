import { useRef, useEffect } from 'react';
import styles from '@/styles/Home.module.css';

interface CheckboxProps {
  isChecked: boolean;
  onChange: () => void;
  intermediate?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  isChecked,
  onChange,
  intermediate,
}) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = intermediate ? true : false;
    }
  }, [intermediate]);

  return (
    <input
      className={styles.checkbox}
      type="checkbox"
      checked={isChecked}
      onChange={onChange}
      ref={checkboxRef}
    />
  );
};

export default Checkbox;
