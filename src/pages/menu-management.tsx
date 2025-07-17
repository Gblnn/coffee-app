import Back from "@/components/back";
import { useMenu } from "@/lib/useMenu";
import { Plus, Trash2, X } from "lucide-react";
import { useState } from "react";


export default function MenuManagement() {
    const {
        items,
        categories,
        loading,
        createMenuItem,
        deleteMenuItem,
        createMenuCategory,
        deleteMenuCategory,
      } = useMenu();
      const [newCategory, setNewCategory] = useState("");
    return(
        <>
        <div style={{border:"", height:"100svh", display:"flex", flexFlow:"column"}} >
            <Back fixed title={"Menu"} />
            
            <div style={{border:"", padding:"1rem", height:"100%", marginTop:"5rem"}}>
                <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                    <h2 className="text-xl font-semibold mb-4">Categories</h2>
                    <button style={{padding:"0.15rem", paddingLeft:"0.75rem", paddingRight:"0.75rem", background:"saddlebrown"}}><Plus width={"1rem"}/>Add</button>
                </div>
                
                <div className="" style={{display:"flex", gap:"0.5rem"}}>
                    
                        {categories.map((cat) => (
                        <span style={{border:"", borderRadius:"1rem", display:"flex", width:"fit-content", alignItems:"center", paddingLeft:"1rem", paddingRight:"", background:"rgba(100 100 100/0.25)", gap:"0.5rem"}} key={cat.id} >
                            {cat.name}
                            <span
                            style={{padding:"0.5rem"}}
                
                            onClick={() => deleteMenuCategory(cat.id)}
                            title="Delete category"
                            >
                            <X size={16} />
                            </span>
                        </span>
                        ))}
                </div>    
            </div>
        </div>
        </>
    )
}