/**
 * Data describing the food truck
 */
export interface DataItem {
  // 'Truck' or 'Push Cart', If there are only 2 categories, you can change it to an enum.
  facilityType: string;
  fooditems: string;
  objectid: string;
  [key: string]: any;
}

/**
 * Select the facility type of some food trucks.
 * @param data A list of food trucks, which may have some conditional filtering done
 * @param facilityType 'Truck' or 'Push Cart', If there are only 2 categories, you can change it to an enum.
 * @returns Food Trucks
 */
const getFoodTruckOnFacilityType = function (
  data: DataItem[],
  facilityType: string
): DataItem[] {
  // Add some logs to record query conditions(For times, role, ...)
  return data.filter((item) => item.facilityType === facilityType);
};

/**
 * Select the food item of some food trucks.
 * @param data A list of food trucks, which may have some conditional filtering done
 * @param foodItems various foods
 * @returns Food Trucks
 */
const getFoodTruckOnFoodItems = function (
  data: DataItem[],
  foodItems: string
): DataItem[] {
  // Add some logs to record query conditions(For times, role, ...)
  return data.filter((item) => item.fooditems.includes(foodItems));
};

type ConditionMapType = {
  [key: string]: Function;
};

/**
 * Record the mapping relationship between query conditions and filters.You are free to extend any query
 */
const ConditionMap: ConditionMapType = {
  faciliType: getFoodTruckOnFacilityType,
  fooditems: getFoodTruckOnFoodItems,
};

/**
 * Query conditions
 * Only data intersection query is implemented here
 */
export type Condition = {
  facilityType?: string;
  foodItem?: string;
  [key: string]: string | undefined;
};

/**
 * Get some food trucks
 * @param condition Query conditions, get only intersection data. You will get all the food trucks if no condition.
 * @returns Food truck list
 */
const getAllFoodCards = async function (condition: Condition | null = null) {
  const data = await fetch(
    "https://data.sfgov.org/api/id/rqzj-sfat.json?$query=select%20*%2C%20%3Aid%20limit%20100",
    {
      headers: {
        accept: "application/json",
        "x-app-token": "U29jcmF0YS0td2VraWNrYXNz0",
        "x-csrf-token":
          "llHe5y2pnPaxXxxTA7wSJ+VjU7rasjAFsry8AuHPaBEAGMYPAkRDO6MMCT1XOGOQtfNjIkChsWLKwfCYQXI+/g==",
      },
      body: null,
      method: "GET",
    }
  )
    .then((res) => res.json())
    .finally(() => {
      // Add some logs to record the error message
      return [];
    });
  if (condition) {
    let filterResult = data || [];
    Object.keys(condition).forEach((key) => {
      if (condition[key]) {
        const filterFn = ConditionMap[key];
        if (filterFn) {
          filterResult = filterFn(filterResult, condition[key]);
        }
      }
    });
    return filterResult;
  }
  return data || [];
};

export { getAllFoodCards };
