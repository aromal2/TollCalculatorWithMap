import React, { startTransition, useState } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Formik, Form, Field } from "formik";
import { locationData } from "../api/apiConnection/connection";

const App = () => {
  const [fuelEfficienc, setFuelEfficienc] = useState(null);
  const [hwyfuelEfficienc, setHwyfuelEfficienc] = useState(null);
  const [polylinemap, setPolylinemap] = useState([]);
  const [startpoint, setStartpoint] = useState([]);
  const [endpoint, setEndpoint] = useState([]);
  const [fuelprice, setFuelprice] = useState(null);

  const handleSubmit = async (values) => {
    const response = await locationData(values);
    const city = response.fuel.fuelEfficiency?.city || null;
    const hwy = response.fuel.fuelEfficiency?.hwy || null;
    const price = response.fuel.fuelPrice.value;
    setFuelprice(price);
    console.log(response, "5555555555555");
    const polylines = response.decodedPolyline;
    setPolylinemap(polylines);

    setFuelEfficienc(city);
    setHwyfuelEfficienc(hwy);
    // Assuming setStartpoint and setEndpoint are functions to set state variables

    if (Array.isArray(polylines) && polylines.length > 0) {
      setStartpoint(polylines[0]);
      setEndpoint(polylines[polylines.length - 1]);
    } else {
      // Handle the case when polylines is empty or not an array
      setStartpoint([]);
      setEndpoint([]);
    }

    console.log(fuelEfficienc, "9999999999999999");
  };

  return (
    <div className="w-100 h-screen flex items-center justify-center bg-white py-4">
      <div className=" flex flex-col justify-start items-center pt-4 mt-auto sm:mt-0 ">
        <div>
          <Typography variant="h1" className="font-serif -mt-14 sm:mt-0  ">
            Toll Calculator Application
          </Typography>
        </div>
        <div className="flex justify-center sm:mt-9 font-serif sm:-ms-4  mt-1 font-black">
          <Typography variant="h2 " className="text-lg">
            Looking to calculate toll costs between cities across India? Use the
            Asia Toll Calculator App! See trip cost breakdown - tolls, fuel and
            other applicable charges, toll plazas, discounts, etc. Travel on the
            cheapest or the fastest routes to your destination. For all vehicles
            - car, SUVs, pickup trucks, trucks, motorcycles, HCM, EME - across
            the Indian highways, expressways, toll roads, bridges, and tunnels!
          </Typography>
        </div>

        <div className="sm:flex-row  flex-col ">
          <div className="flex justify-center flex-col items-center mt-7 -ms-8  sm:mt-14 sm:-ms-96">
            <Formik
              initialValues={{
                startLocation: "",
                endLocation: "",
              }}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="w-72 sm:-ms-20 sm:mb-3 ">
                    <Field name="startLocation">
                      {({ field }) => (
                        <Input
                          {...field}
                          type="text"
                          placeholder="Choose Start Location"
                          color=""
                          size="regular"
                          className="!border !border-gray-300 bg-white text-gray-400 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                        />
                      )}
                    </Field>
                  </div>
                  <div className="w-72 sm:-ms-20 mt-2 ">
                    <Field name="endLocation">
                      {({ field }) => (
                        <Input
                          {...field}
                          type="text"
                          placeholder="Choose End Location"
                          color=""
                          size="regular"
                          className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                        />
                      )}
                    </Field>
                  </div>
                  <div>
                    <Button
                      type="submit"
                      className="sm:mt-2 sm:me-96 mt-3"
                      color="blue"
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="flex flex-col sm:flex-row  ">
            <div className="w-auto sm:ms-72 sm:-mt-44 sm:h-40rem mt-7 -ms-3">
              <MapContainer
                center={[51.505, -0.09]}
                zoom={13}
                style={{ width: "438px", height: "400px" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Polyline
                  positions={polylinemap || []} // Set the decoded polyline coordinates
                  pathOptions={{ color: "blue" }} // Define polyline color or other options
                />
                {startpoint &&
                  startpoint.length === 2 && ( // Check if startpoint is valid
                    <Marker position={startpoint}>
                      <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                      </Popup>
                    </Marker>
                  )}

                {endpoint &&
                  endpoint.length === 2 && ( // Check if endpoint is valid
                    <Marker position={endpoint}>
                      <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                      </Popup>
                    </Marker>
                  )}
              </MapContainer>
            </div>

            <div className="sm:-mt-24 sm:ms-5 mt-5 ms-38 text-left">
              {fuelEfficienc && hwyfuelEfficienc && fuelprice && (
                <p className="font-bold">Fuel Efficiency</p>
              )}

              {fuelEfficienc && (
                <p className=" text-lg">City: {fuelEfficienc} km/L</p>
              )}

              {hwyfuelEfficienc && (
                <p className="text-lg">Highway: {hwyfuelEfficienc} km/L</p>
              )}

              {fuelprice && (
                <p className="text-lg">Fuel Price: {fuelprice} INR/Litre</p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-16 text-left">
          <Typography variant="h3">
            Factors affects toll costs on highways or roads
          </Typography>
          <p>
            <span style={{ fontWeight: "bold" }}>1)Distance Traveled:</span>{" "}
            Longer distances result in higher toll fees.
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}> 2)Time of Travel:</span> Some
            toll roads implement dynamic pricing, where toll costs change based
            on peak hours or traffic density.
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>3) Vehicle Type: </span>
            Different vehicle types might incur different toll rates. For
            example, cars, trucks, buses, or motorcycles can have varying toll
            charges.
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>4)Route Taken:</span> Some
            highways offer multiple routes with different toll charges. Choosing
            express or faster routes may have higher tolls.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
