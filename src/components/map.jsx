import { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

export default function Map() {
   const { isLoaded } = useLoadScript({ 
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, 
   });

   if (!isLoaded) return <div>Loading...</div>

   return (
      <GoogleMap
         mapContainerStyle={{ width: "100vw", height: "100vh" }}
         zoom={8}
         center={{ lat: 37.7749, lng: -122.4194 }}
      >
         <Marker position={{ lat: 37.7749, lng: -122.4194 }} />
      </GoogleMap>
   );
}
