import { ChangeEvent, FunctionComponent, useRef, useState } from "react";
import { useAppDispatch } from "../../store/store";
import { createGroupRequest } from "../../thunks/groupThunk";
import { reloadGroups } from "../../store/groupReducer";

export const CreateGroupItem: FunctionComponent = () => {
     const dispatch = useAppDispatch();
    const [name, setName] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const createGroup = () => {
        dispatch(createGroupRequest({name: name}))
            .unwrap()
            .then(() => {
                dispatch(reloadGroups({}));
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
        createGroup();
    }

    return <div className="flex flex-row gap-2 justify-center border-2 rounded-md px-2">
        <input style={{width: '150px'}} ref={inputRef}
            placeholder="new group" onKeyDown={createOnEnter} onInput={onInput} />
        <div className="button" onClick={createGroup}>Create</div>
    </div>
}