import { EDIT_PROFILE } from "./constants";

export const editProfile = (id, data) => ({
    type: EDIT_PROFILE,
    id,
    data
})