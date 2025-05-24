import { ChangeEvent, FunctionComponent, useRef, useState } from "react";
import { useAppSelector } from "../../store/store";
import { Modal } from "../shared/Modal";
import { FilterAction } from "../layout/FilterAction";

export const PlayerNameFilter: FunctionComponent<{
  onFilterChange: (name: string) => void;
}> = ({ onFilterChange }) => {
  const nameFilter = useAppSelector((state) => state.players.queryFilter.name);
  const [filter, setFilter] = useState(nameFilter);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const confirmRef = useRef<any>();

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const keyDown = (e: { keyCode: number }) => {
    if (e.keyCode !== 13) {
      return;
    }
    confirmRef.current?.click();
  };

  return (
    <Modal
      buttonContent={
        <FilterAction>
          Namefilter{nameFilter ? ": " + nameFilter : ""}
        </FilterAction>
      }
    >
      {nameFilter ? (
        <input
          autoFocus
          value={filter}
          className="w-full"
          placeholder="Player Name"
          onChange={onInput}
          onKeyDown={keyDown}
        />
      ) : (
        <input
          autoFocus
          placeholder="Player Name"
          className="w-full"
          onChange={onInput}
          onKeyDown={keyDown}
        />
      )}
      <div className="flex flex-row w-full justify-between">
        <button className="closes-modal" onClick={() => onFilterChange("")}>
          Reset
        </button>
        <button
          ref={confirmRef}
          className="closes-modal"
          onClick={() => onFilterChange(filter ?? "")}
        >
          Ok
        </button>
      </div>
    </Modal>
  );
};
