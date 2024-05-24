export type UserData = {
    name?: string;
    profileUrl?: string;
    email?: string;
};

export interface DataModel {
    userData: UserData
};

export const initialData: DataModel = {
    userData: {
        name: '',
        profileUrl: '',
        email: '',

    }
};