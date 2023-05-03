import React, { useState } from "react";
import ReactMapboxGl, { Layer } from "react-mapbox-gl";

interface Coordinates {
  longitude: number;
  latitude: number;
}

const Map = ReactMapboxGl({
  accessToken: "YOUR_MAPBOX_ACCESS_TOKEN",
});

function GeolocationMap() {
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);

  const handleButtonClick = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Get Current Location</button>
      {userLocation && (
        <Map
          style="mapbox://styles/mapbox/streets-v11"
          center={[userLocation.longitude, userLocation.latitude]}
          zoom={[15]}
          containerStyle={{
            height: "400px",
            width: "100%",
          }}
        >
          <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }} />
        </Map>
      )}
    </div>
  );
}

export default GeolocationMap;
