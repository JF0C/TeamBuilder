import { ApiUrls } from "../constants/ApiUrls";
import { MatchEntity } from "../data/MatchEntity";
import { createPostThunk } from "./thunkBase";

export const createMatchRequest = createPostThunk<number, MatchEntity>(
    'create-match',
    () => `${ApiUrls.BaseUrl + ApiUrls.MatchEndpoint}`,
    (response) => response.json()
)
