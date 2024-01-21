import Nav from "@/components/nav"

export default function About() {
   return (
      <>
         <Nav></Nav>

         <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
            <img src={"/slughaus.png"} alt="" style={{ height: "80vh" }} />
         </div>
      </>

   )
}