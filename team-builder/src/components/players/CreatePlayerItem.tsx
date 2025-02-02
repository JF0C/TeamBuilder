import { ChangeEvent, FunctionComponent, useRef, useState } from "react";
import { useAppDispatch } from "../../store/store";
import { createPlayerRequest } from "../../thunks/playerThunk";
import { reloadPlayers } from "../../store/playerReducer";

export const CreatePlayerItem: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const [name, setName] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const createPlayer = () => {
        dispatch(createPlayerRequest({name: name}))
            .unwrap()
            .then(() => {
                dispatch(reloadPlayers({group: null}))
                if (inputRef.current) {
                    inputRef.current.value = '';
                }
            })
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
        <input style={{width: '150px'}} ref={inputRef} 
            placeholder="New Player" onKeyDown={createOnEnter} onChange={onInput} />
        <div className="button" onClick={createPlayer}>Create</div>
    </div>
}