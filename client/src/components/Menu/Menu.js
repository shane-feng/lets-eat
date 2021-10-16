import { useState, useEffect, useMemo } from 'react';
import FoodList from '../FoodList/FoodList';
import { getFoods } from '../../api/apiService';

function Menu() {
  const [foods, setFoods] = useState();

  const buttonsProps = useMemo(() => {
    return [
      { text: 'Edit', onClick: () => {} },
      { text: 'Delete', onClick: () => {} },
    ];
  }, []);

  const switchProps = useMemo(() => {
    return { label: 'Lets Eat', onChange: () => {} };
  }, []);

  const fetchFoods = async () => {
    try {
      const { data } = await getFoods();
      setFoods(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <FoodList foods={foods} title={'What Should We Eat . . . '} buttonsProps={buttonsProps} switchProps={switchProps} />
  );
}

export default Menu;
