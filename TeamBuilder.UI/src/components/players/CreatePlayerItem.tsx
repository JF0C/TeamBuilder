import { ChangeEvent, FunctionComponent, useRef, useState } from "react";
import { useAppDispatch } from "../../store/store";
import { createPlayerRequest } from "../../thunks/playerThunk";

export const CreatePlayerItem: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const [name, setName] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const createPlayer = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
        }
        dispatch(createPlayerRequest({ name: name }));
    }

    const onInput = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const createOnEnter = (e: { keyCode: number; }) => {
        if (e.keyCode !== 13) {
            return;
        }
        createPlayer();
    }

    return <div className="flex flex-row gap-2 justify-center border-2 rounded-md px-2">
        <input style={{ width: '150px' }} ref={inputRef}
            placeholder="New Player" onKeyDown={createOnEnter} onChange={onInput} />
        <div className="button" onClick={createPlayer}>Create</div>
    </div>
}