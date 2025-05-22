import { ChangeEvent, FunctionComponent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { enqueueSnackbar } from "notistack";
import { createUserRequest, registerUserRequest } from "../../thunks/authThunk";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../constants/Paths";
import { InfoText } from "../layout/InfoText";
import { RadioGroup } from "../shared/RadioGroup";
import { PlayerList } from "../players/PlayerList";
import { setEditingPlayer } from "../../store/playerReducer";
import { LinkBack } from "../shared/LinkBack";

export const Register: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const editingPlayer = useAppSelector((state) => state.players.editingPlayer);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [existingPlayer, setExistingPlayer] = useState(false);

  if (!existingPlayer && editingPlayer !== null) {
    dispatch(setEditingPlayer(null));
  }

  const createUser = () => {
    dispatch(createUserRequest({ playerName: name, email: email }))
      .unwrap()
      .then((id) => {
        if (id) {
          navigate(Paths.LoginPath);
          enqueueSnackbar(`Successfully created user ${email}`, {
            variant: "success",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(`User could not be created`, { variant: "error" });
      });
  };

  const registerEmail = (playerId: number) => {
    dispatch(
      registerUserRequest({
        playerId,
        email,
      })
    )
      .unwrap()
      .then(() => {
        navigate(Paths.LoginPath);
        enqueueSnackbar(`Successfully created user ${email}`, {
          variant: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(`Could not register email`, { variant: "error" });
      });
  };

  const finishRegistration = () => {
    if (existingPlayer) {
      if (editingPlayer === null) {
        enqueueSnackbar("select a player");
        return;
      }
      registerEmail(editingPlayer.id);
    } else {
      createUser();
    }
  };

  return (
    <div className="size-full flex flex-col justify-center items-center gap-2">
      <div>
        <RadioGroup
          selectedId={existingPlayer ? 1 : 0}
          items={[
            { name: "New Player", id: 0 },
            { name: "Existing Player", id: 1 },
          ]}
          onSelectionChanged={(id) =>
            id === 0 ? setExistingPlayer(false) : setExistingPlayer(true)
          }
        />
      </div>
      {existingPlayer ? (
        <div className="max-w-80 flex flex-col">
          <PlayerList />
        </div>
      ) : (
        <div>
          <input
            value={name}
            placeholder="Player Name"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
        </div>
      )}
      <div>
        <div>
          <input
            value={email}
            placeholder="Email"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </div>
        <div className="w-70">
          <InfoText>
            Your Email address must be registered at one of the follwing
            websites: Github
          </InfoText>
        </div>
      </div>
      <button className="button" onClick={finishRegistration}>
        Register
      </button>
      <div>
        <LinkBack to={Paths.HomePath} />
      </div>
    </div>
  );
};
