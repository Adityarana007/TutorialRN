import React, {createContext} from 'react';
import {DataModel, initialData} from '../services/Modal/user';
import useStore from './useStore';

const USER_DATA_KEY = 'USER_DATA_KEY';

export const UserContext = createContext({
  data: initialData,
  setDataToStore: (data: DataModel) => {},
  setAbsoluteDataToStore: (data: DataModel) => {},
  removeData: () => {},
});

const UserProvider: React.FC<any> = ({children}: any) => {
  const {
    data,
    dataRetrieved,
    setDataToStore,
    setAbsoluteDataToStore,
    removeData,
  } = useStore({
    KEY: USER_DATA_KEY,
    initData: initialData,
  });
  return (
    <UserContext.Provider
      value={{
        data,
        setDataToStore,
        setAbsoluteDataToStore,
        removeData,
      }}>
      {dataRetrieved && children}
    </UserContext.Provider>
  );
};

export default UserProvider;