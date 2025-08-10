import Content from "./content";

const { default: Sidebar } = require("./sidebar")

const Homepage=()=>{
   return (
      <div className="flex">
         <div className="w-[20%] min-h-screen bg-gray-200">
            <Sidebar/>
         </div>
         <div className="w-[80%] mx-10">
            <Content/>
         </div>
      </div>
   )
}

export default Homepage;