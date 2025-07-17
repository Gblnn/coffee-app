
import Back from "@/components/back";
import { Button } from "@/components/ui/button";
import { useMenu } from "@/lib/useMenu";
import { useTables } from "@/lib/useTables";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function OrderTaking() {
  const { tables } = useTables();
  const { items: menu, categories } = useMenu();
  // Step state: 'category' | 'item' | 'type' | 'table' | 'summary'
  const [step, setStep] = useState<'category' | 'item' | 'type' | 'table' | 'summary'>('category');
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [orderType, setOrderType] = useState<'' | 'dinein' | 'takeout'>("");
  const [selectedTable, setSelectedTable] = useState("");
  const [order, setOrder] = useState<any[]>([]);

  // Only show items for selected category
  const filteredMenu = menu.filter((item: any) => item.category === selectedCategory);
  const getTableStatus = (table: any) => table.status || "available";

  function addToOrder(item: any) {
    setOrder((prev) => {
      const existing = prev.find((o) => o.id === item.id && o.type === orderType && o.table === selectedTable);
      if (existing) {
        return prev.map((o) =>
          o.id === item.id && o.type === orderType && o.table === selectedTable
            ? { ...o, qty: o.qty + 1 }
            : o
        );
      }
      return [...prev, { ...item, qty: 1, type: orderType, table: selectedTable }];
    });
    setStep('summary');
  }

  function updateQty(id: string, delta: number) {
    setOrder((prev) =>
      prev
        .map((o) =>
          o.id === id ? { ...o, qty: Math.max(1, o.qty + delta) } : o
        )
        .filter((o) => o.qty > 0)
    );
  }

  function removeItem(id: string) {
    setOrder((prev) => prev.filter((o) => o.id !== id));
  }

  function resetOrder() {
    setOrder([]);
    setStep('category');
    setSelectedCategory("");
    setSelectedItem(null);
    setOrderType("");
    setSelectedTable("");
  }

  function handleSendOrder() {
    // TODO: Integrate with order service
    alert("Order sent! (integration pending)");
    resetOrder();
  }

  // Calculate total
  const total = order.reduce((sum, item) => sum + (item.price * item.qty), 0);
  return (
    <div style={{border:""}}>
      <Back blurBG fixed title="" />
      <div className="" style={{border:"", height:"100svh", display:"flex", flexFlow:"column", justifyContent:"center", alignItems:"center"}}>
        {/* Step 1: Category selection */}
        {step === 'category' && (
          <div style={{border:"", display:"flex", flexFlow:"column", alignItems:"center"}} className="">
            <h2 className="text-xl font-bold ">Select Category</h2>
            <div style={{display:"flex", gap:"0.5rem"}} className="p-4">
              {categories.map((cat) => (
                <button
                style={{paddingLeft:"2rem", paddingRight:"2rem"}}
                  key={cat.id}
                  className=""
                  onClick={() => { setSelectedCategory(cat.name); setStep('item'); }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Item selection */}
        {step === 'item' && (
          <div className="">
            
            <div style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"1rem"}}>
              <button style={{background:"none", padding:"none"}} className="" onClick={() => setStep('category')}><ChevronLeft/></button>
              <h2 className="">Select Item</h2>
              <button style={{background:"none", opacity:"0.25"}}><ChevronRight/></button>
            </div>
            
            <div className=" flex p-4">
              {filteredMenu.map((item) => (
                <button
                style={{padding:"1rem", paddingLeft:"2rem", paddingRight:"2rem"}}
                  key={item.id}
                  className=""
                  onClick={() => { setSelectedItem(item); setStep('type'); }}
                >
                  <span>{item.name}</span>
                  <span className="text-xs text-gray-500 mt-1">₱{item.price}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Dine In or Takeout */}
        {step === 'type' && selectedItem && (
          <div className="flex flex-col items-center gap-6 w-full">
            <button className="self-start text-xs text-blue-500 mb-2" onClick={() => setStep('item')}>← Back to Items</button>
            <h2 className="text-xl font-bold mb-4">Order Type</h2>
            <div className="flex gap-6">
              <button
                className={`rounded-lg px-6 py-4 text-lg font-semibold border transition focus:outline-none focus:ring-2 focus:ring-blue-400 ${orderType === 'dinein' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700'}`}
                onClick={() => { setOrderType('dinein'); setStep('table'); }}
              >
                Dine In
              </button>
              <button
                className={`rounded-lg px-6 py-4 text-lg font-semibold border transition focus:outline-none focus:ring-2 focus:ring-blue-400 ${orderType === 'takeout' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700'}`}
                onClick={() => { setOrderType('takeout'); setSelectedTable(""); addToOrder(selectedItem); }}
              >
                Takeout
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Table selection (if dine in) */}
        {step === 'table' && orderType === 'dinein' && (
          <div className="flex flex-col items-center gap-6 w-full">
            <button className="self-start text-xs text-blue-500 mb-2" onClick={() => setStep('type')}>← Back to Type</button>
            <h2 className="text-xl font-bold mb-4">Select Table</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
              {tables.filter((t) => getTableStatus(t) !== 'occupied').map((t) => (
                <button
                  key={t.id}
                  className={`rounded-lg px-4 py-6 flex flex-col items-center border transition text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 ${selectedTable === t.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700'}`}
                  onClick={() => { setSelectedTable(t.id); addToOrder({ ...selectedItem }); }}
                >
                  <span className="flex items-center gap-1 mb-1">{t.name}</span>
                  <span className="text-[10px] text-gray-500">{t.seats} seats</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Order summary */}
        {step === 'summary' && order.length > 0 && (
          <div className="flex flex-col items-center gap-6 w-full">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <ul className="flex flex-col gap-2 w-full">
              {order.map((item, idx) => (
                <li key={idx} className="flex items-center justify-between gap-2 bg-white dark:bg-gray-800 rounded-lg px-4 py-3 shadow">
                  <span className="flex-1 truncate">{item.name}</span>
                  <span className="text-xs text-gray-500">₱{item.price}</span>
                  <span className="mx-2">x{item.qty}</span>
                  <Button size="icon" variant="ghost" className="rounded-full w-7 h-7" onClick={() => updateQty(item.id, -1)}>-</Button>
                  <Button size="icon" variant="ghost" className="rounded-full w-7 h-7" onClick={() => updateQty(item.id, 1)}>+</Button>
                  <Button size="icon" variant="ghost" className="rounded-full w-7 h-7" onClick={() => removeItem(item.id)}>
                    ×
                  </Button>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between mt-4 text-base font-semibold w-full">
              <span>Total</span>
              <span>₱{total}</span>
            </div>
            <div className="flex gap-2 w-full">
              <Button className="w-1/2" variant="outline" onClick={resetOrder}>New Order</Button>
              <Button className="w-1/2" onClick={handleSendOrder}>Send Order</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
