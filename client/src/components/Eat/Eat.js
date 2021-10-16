import { useState, useEffect, useMemo } from 'react';
import FoodList from '../FoodList/FoodList';
import FoodItem from '../FoodItem/FoodItem';
import { getFoodsToEat } from '../../api/apiService';
import { decodeDataUri } from '../../utils';

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

  const renderFoods = useMemo(() => {
    return foods?.map((food) => {
      const imgUri = decodeDataUri(food.picture.data);

      return <FoodItem food={food} img={imgUri} />;
    });
  }, [foods]);

  useEffect(() => {
    fetchFoods();
  }, []);

  return <FoodList foods={renderFoods} title={'Lets Eat These Today . . .'} />;
}

export default Eat;
