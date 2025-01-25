import { FunctionComponent, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { createGroupRequest, loadGroupsRequest } from "../../thunks/groupThunk";

export const CreateGroupItem: FunctionComponent = () => {
     const dispatch = useAppDispatch();
    const groupState = useAppSelector((state) => state.groups);
    const [name, setName] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const createGroup = () => {
        dispatch(createGroupRequest({name: name}))
            .unwrap()
            .then(() => {
                dispatch(loadGroupsRequest({
                    page: groupState.groups?.page ?? 1,
                    count: groupState.groups?.count ?? 100
                }));
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
        createGroup();
    }

    return <div className="flex flex-row gap-2 justify-center border-2 rounded-md px-2">
        <input style={{width: '150px'}} ref={inputRef}
            placeholder="new group" onKeyDown={createOnEnter} onInput={onInput} />
        <div className="button" onClick={createGroup}>Create</div>
    </div>
}