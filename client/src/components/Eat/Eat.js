import { useState, useEffect } from 'react';
import FoodList from '../FoodList/FoodList';
import { getFoodsToEat } from '../../api/apiService';

function Eat() {
  const [foods, setFoods] = useState();

  const fetchFoods = async () => {
    try {
      const { data } = await getFoodsToEat();
      setFoods(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return <FoodList foods={foods} title={'Lets Eat These Today . . .'} />;
}

export default Eat;
