import { useState, useEffect, useMemo } from 'react';
import FoodList from '../FoodList/FoodList';
import { getFoodsToEat } from '../../api/apiService';

function Eat() {
  const [foods, setFoods] = useState();

  const fetchFoods = async () => {
    try {
      const { data } = await getFoodsToEat();
      setFoods(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return <FoodList foods={foods} title={'Lets Eat These Today . . .'} />;
}

export default Eat;
