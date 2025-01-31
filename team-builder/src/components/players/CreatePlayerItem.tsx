import { FunctionComponent, useRef, useState } from "react";
import { useAppDispatch } from "../../store/store";
import { createPlayerRequest } from "../../thunks/playerThunk";
import { resetPlayers } from "../../store/playerReducer";

export const CreatePlayerItem: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const [name, setName] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const createPlayer = () => {
        dispatch(createPlayerRequest({name: name}))
            .unwrap()
            .then(() => {
                dispatch(resetPlayers(null))
                if (inputRef.current) {
                    inputRef.current.value = '';
                }
            })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onInput = (e: any) => {
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
            placeholder="new player" onKeyDown={createOnEnter} onInput={onInput} />
        <div className="button" onClick={createPlayer}>Create</div>
    </div>
}