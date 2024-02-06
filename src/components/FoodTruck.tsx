"use client";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DataItem } from "../services/FoodManager";

export type FoodTrucksProps = {
  foodTrucks: DataItem[];
};

const columns: GridColDef[] = [
  { field: "objectid", headerName: "ID", width: 90 },
  {
    field: "facilitytype",
    headerName: "Facility Type",
    width: 150,
    editable: true,
  },
  {
    field: "locationdescription",
    headerName: "Location Description",
    width: 150,
    editable: true,
  },
  {
    field: "address",
    headerName: "Address",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fooditems",
    headerName: "Food Items",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
];

const FoodTruck = function (props: FoodTrucksProps) {
  const { foodTrucks } = props;
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={foodTrucks.map((foodTruck) => ({
          id: foodTruck.objectid,
          ...foodTruck,
        }))}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default FoodTruck;
