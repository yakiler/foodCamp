import { getAllFoodCards, Condition } from "../../src/services/FoodManager";
import FoodTruck from "../../src/components/FoodTruck";
import { Grid } from "@mui/material";

async function getData() {
  const condition: Condition = {
    foodItem: "Tacos",
    facilityType: "Truck",
  };
  /** Data length limits can also be used */
  return await getAllFoodCards(condition);
}

const Index = async function () {
  const data = await getData();
  return (
    <Grid width="100vw" height="100vh">
      <FoodTruck foodTrucks={data} />
    </Grid>
  );
};

export default Index;
