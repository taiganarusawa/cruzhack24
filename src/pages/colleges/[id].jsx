import Nav from "@/components/nav"
import { useRouter } from 'next/router';

import CollegeLayout from "@/components/collegeLayout";

import c9Data from "@/collegeData/c9.json";
import jrlData from "@/collegeData/jrl.json";
import oakesData from "@/collegeData/oakes.json"
import stevensonData from "@/collegeData/stevenson.json";
import cowellData from "@/collegeData/cowell.json";
import rccData from "@/collegeData/rcc.json";
import porterData from "@/collegeData/porter.json";
import kresgeData from "@/collegeData/kresge.json";
import crownData from "@/collegeData/crown.json";
import merrillData from "@/collegeData/merrill.json";

export default function Colleges() {

   const router = useRouter();
   const { id } = router.query;

   function collegesSwitch(college) {
      switch (college) {
         case "collegenine": return <CollegeLayout data={c9Data}></CollegeLayout>
         case "johnrlewis": return <CollegeLayout data={jrlData}></CollegeLayout>
         case "stevenson": return <CollegeLayout data={stevensonData}></CollegeLayout>
         case "cowell": return <CollegeLayout data={cowellData}></CollegeLayout>
         case "oakes": return <CollegeLayout data={oakesData}></CollegeLayout>
         case "rachelcarson": return <CollegeLayout data={rccData}></CollegeLayout>
         case "porter": return <CollegeLayout data={porterData}></CollegeLayout>
         case "kresge": return <CollegeLayout data={kresgeData}></CollegeLayout>
         case "crown": return <CollegeLayout data={crownData}></CollegeLayout>
         case "merrill": return <CollegeLayout data={merrillData}></CollegeLayout>
         default: return <>No college found</>
      }
   }

   return (
      <>
         <Nav />
         {
            collegesSwitch(id)
         }
      </>
   )
}