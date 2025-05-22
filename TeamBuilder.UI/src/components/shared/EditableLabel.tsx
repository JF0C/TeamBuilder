import {
  faCheckCircle,
  faEdit,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, FunctionComponent, useState } from "react";

export type EditableLabelProps = {
  value: string;
  onChange: (value: string) => void;
  inputWidth?: number;
};

export const EditableLabel: FunctionComponent<EditableLabelProps> = ({
  value,
  onChange,
  inputWidth,
}) => {
  const [editing, setEditing] = useState(false);
  const [changedValue, setChangedValue] = useState(value);

  const onConfirm = () => {
    onChange(changedValue);
    setEditing(false);
  };

  const onCancel = () => {
    setChangedValue(value);
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="flex flex-row gap-2 editable-label editing">
        <input
          value={changedValue}
          style={{ width: (inputWidth ?? 100) + "px" }}
          autoFocus
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setChangedValue(e.target.value)
          }
        />
        <button onClick={onCancel}>
          <FontAwesomeIcon icon={faXmarkCircle} />
        </button>
        <button onClick={onConfirm}>
          <FontAwesomeIcon icon={faCheckCircle} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-2 editable-label">
      <div>{value}</div>
      <button onClick={() => setEditing(true)}>
        <FontAwesomeIcon icon={faEdit} />
      </button>
    </div>
  );
};
