import React, {useEffect, useState} from 'react';
import {DataModel} from '../services/Modal/user';
import {getItem, setItem} from '../utils/utility';

interface Props<DataModel> {
  KEY: string;
  initData: DataModel;
}

const useStore = ({KEY, initData}: Props<DataModel>) => {
  const [dataRetrieved, setDataRetrieved] = useState(false);
  const [data, setData] = useState<DataModel>(initData);

  const getDataFromAsync = async () => {
    let asyncData: DataModel | undefined;
    try {
      asyncData = await getItem(KEY);
      if (asyncData) {
        setData(asyncData);
      }
      setDataRetrieved(true);
    } catch (error) {
      console.error(error);
    }
    return asyncData;
  };

  const setDataToStore = async (newData: DataModel) => {
    try {
      const updatedData = {...data, ...newData};
      setData(updatedData);
      await setItem(KEY, updatedData);
    } catch (error) {
      console.error(error);
    }
  };

  const setAbsoluteDataToStore = async (newData: DataModel) => {
    try {
      const updatedData = newData;
      setData(updatedData);
      await setItem(KEY, updatedData);
    } catch (error) {
      console.error(error);
    }
  };

  const removeData = async () => {
    try {
      const updatedData = {
        ...initData,
      };
      setData(updatedData);
      await setItem(KEY, updatedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDataFromAsync();
  }, []);

  return {
    data,
    dataRetrieved,
    getDataFromAsync,
    setAbsoluteDataToStore,
    setDataToStore,
    removeData
  };
};

export default useStore;
