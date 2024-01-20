import Image from "next/image";
import { Link } from "@mui/material";

import styles from "@/styles/page.module.css";

import Map from "@/components/map";
import CollegeLayout from "@/components/collegeLayout";

export default function Home() {
   return (
      <>
         <Map></Map>
         <Link href="/c9" sx={{ backgroundColor: "red" }}>
            Click me
         </Link>
         <CollegeLayout></CollegeLayout>
      </>
   )
}
