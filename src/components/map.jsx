import { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

export default function Map() {
   const { isLoaded } = useLoadScript({ 
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, 
   });

   if (!isLoaded) return <div>Loading...</div>

   return (
      <MapComponent />
   );
}

function MapComponent() {
   const mapContainerStyle = useMemo(() => ({
      width: "100vw",
      height: "100vh",
   }), []);

   const center = useMemo(() => ({
      lat: 36.9914,
      lng: -122.0583,
   }), []);

   // restrict zoom to 15
   const options = useMemo(() => ({
      disableDefaultUI: true,
      zoomControl: true,
      minZoom: 15,
      maxZoom: 20,
      // set lat/lng bounds
      restriction: {
         latLngBounds: {
            north: 37.01,
            south: 36.975,
            west: -122.09,
            east: -122.03,
         },
      },

      // set map styles
      // no lables or points of interest
      styles: [
         {
            featureType: "poi",
            stylers: [
               { visibility: "off" },
            ],
         },
         {
            featureType: "poi.business",
            stylers: [
               { visibility: "off" },
            ],
         },
         {
            featureType: "transit",
            elementType: "labels.icon",
            stylers: [
               { visibility: "off" },
            ],
         },
      ],
   }), []);

   const mapId = "5aaced86c28e57ee";

   return (
      <GoogleMap 
         mapContainerStyle={mapContainerStyle} 
         center={center} zoom={15} 
         options={options}
         mapId={mapId}
      >
      </GoogleMap>
   );
}
