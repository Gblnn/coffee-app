import Back from "@/components/back";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useMenu } from "@/lib/useMenu";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "../components/ui/input";

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

  const [newItem, setNewItem] = useState({
    name: "",
    price: 0,
    category: "",
    available: true,
  });
  const [newCategory, setNewCategory] = useState("");

  return (
    <div style={{border:"solid"}} className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col">
      <Back title="Menu Management" subtitle="Manage your restaurant menu"  />
      <div className="max-w-3xl w-full mx-auto p-4 flex flex-col gap-8">
        {/* Categories */}
        <Card className="p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((cat) => (
              <span key={cat.id} className="inline-flex items-center rounded px-3 py-1 text-sm font-medium mr-2 mb-2">
                {cat.name}
                <button
                  className="ml-2 text-red-500 hover:text-red-700"
                  onClick={() => deleteMenuCategory(cat.id)}
                  title="Delete category"
                >
                  <Trash2 size={16} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <label htmlFor="category-input" className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">New Category</label>
              <Input
                id="category-input"
                value={newCategory}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewCategory(e.target.value)}
                placeholder="e.g. Beverages"
                className="w-full"
                autoComplete="off"
              />
            </div>
            <Button
              onClick={async () => {
                if (newCategory) {
                  await createMenuCategory({ name: newCategory });
                  setNewCategory("");
                }
              }}
              variant="outline"
              className="flex items-center gap-1 h-10"
              disabled={!newCategory.trim()}
            >
              <Plus size={16} /> Add
            </Button>
          </div>
        </Card>

        {/* Menu Items */}
        <Card className="p-6 bg-white dark:bg-gray-900 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Menu Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium text-lg">{item.name}</div>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteMenuItem(item.id)}
                    title="Delete item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">{item.category}</div>
                <div className="text-sm font-semibold mb-1">OMR {item.price.toFixed(3)}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{item.available ? "Available" : "Unavailable"}</div>
              </div>
            ))}
          </div>
          <form
            className="flex flex-col md:flex-row gap-2 items-end"
            onSubmit={async (e) => {
              e.preventDefault();
              if (newItem.name && newItem.category) {
                await createMenuItem(newItem);
                setNewItem({ name: "", price: 0, category: "", available: true });
              }
            }}
          >
            <div className="flex-1">
              <label htmlFor="item-name" className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Item Name</label>
              <Input
                id="item-name"
                value={newItem.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewItem({ ...newItem, name: e.target.value })}
                placeholder="e.g. Cappuccino"
                className="w-full"
                autoComplete="off"
                required
              />
            </div>
            <div className="w-32">
              <label htmlFor="item-price" className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Price (OMR)</label>
              <Input
                id="item-price"
                type="number"
                min="0"
                step="0.001"
                value={newItem.price}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                placeholder="0.000"
                className="w-full"
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="item-category" className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Category</label>
              <select
                id="item-category"
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                className="w-full border rounded px-2 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <Button
              type="submit"
              variant="outline"
              className="flex items-center gap-1 h-10"
              disabled={!newItem.name.trim() || !newItem.category}
            >
              <Plus size={16} /> Add Item
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
