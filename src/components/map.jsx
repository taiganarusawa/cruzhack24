import { useEffect } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import styles from '../styles/maps.module.css';

async function initMap() {
   // Request needed libraries.
   const { Map } = await google.maps.importLibrary("maps");
   const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

   const center = { lat: 36.9914, lng: -122.0583};
   const map = new Map(document.getElementById("map"), {
      mapId: "5aaced86c28e57ee",
      disableDefaultUI: true,
      center,
      zoom: 15,
      restriction: {
         latLngBounds: {
            north: 37.01,
            south: 36.975,
            west: -122.09,
            east: -122.03,
         },
      },
   });

   // create a marker for each college
   collegeList.forEach((college) => {
      const marker = new AdvancedMarkerElement({
         map,
         position: college.position,
         content: buildMarker(college.name),
      });

      marker.addListener("click", () => {
         window.location.href = getCollegeLink(college.name);
      });
   });
}

function buildMarker(name) {
   const marker = document.createElement("div");

   marker.className = styles["marker"];
   marker.textContent = name;

   return marker;
}

function getCollegeLink(name) {
   // direct them to /colleges/college-name
   if (name === "College 9") {
      return "/colleges/collegenine";
   } else if (name === "John R. Lewis College") {
      return "/colleges/johnrlewis";
   } else if (name === "Crown College") {
      return "/colleges/crown";
   } else if (name === "Merrill College") {
      return "/colleges/merrill";
   } else if (name === "Cowell College") {
      return "/colleges/cowell";
   } else if (name === "Stevenson College") {
      return "/colleges/stevenson";
   } else if (name === "Kresge College") {
      return "/colleges/kresge";
   } else if (name === "Oakes College") {
      return "/colleges/oakes";
   } else if (name === "Porter College") {
      return "/colleges/porter";
   } else if (name === "Rachel Carson College") {
      return "/colleges/rachelcarson";
   }
}

const collegeList = [
   {
      name: "College 9",
      position: { lat: 37.001534, lng: -122.0572 },
   },
   {
      name: "John R. Lewis College",
      position: { lat: 37.0006, lng: -122.0585 },
   },
   {
      name: "Crown College",
      position: { lat: 37.0004, lng: -122.054 },
   },
   {
      name: "Merrill College",
      position: { lat: 36.9999, lng: -122.052 },
   },
   {
      name: "Cowell College",
      position: { lat: 36.997, lng: -122.055 },
   },
   {
      name: "Stevenson College",
      position: { lat: 36.9975, lng: -122.052 },
   },
   {
      name: "Kresge College",
      position: { lat: 36.9993, lng: -122.0656 },
   },
   {
      name: "Oakes College",
      position: { lat: 36.989, lng: -122.0635 },
   },
   {
      name: "Porter College",
      position: { lat: 36.995, lng: -122.0656 },
   },
   {
      name: "Rachel Carson College",
      position: { lat: 36.991, lng: -122.065 },
   },
];

const MapComponent = () => {
   const { isLoaded } = useLoadScript({
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
   });

   useEffect(() => {
      if (isLoaded) {
         initMap();
      }
   }, [isLoaded]);

   return <div id="map" style={{ height: '100vh', width: '100vw' }}></div>;
};

export default MapComponent;
