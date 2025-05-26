import React, { useState } from 'react';
import { Supplier } from '../../../types/businessDashboard';

interface SuppliersProps {
  suppliers: Supplier[];
  onUpdate: (suppliers: Supplier[]) => void;
}

const Suppliers: React.FC<SuppliersProps> = ({ suppliers, onUpdate }) => {
  const [newSupplier, setNewSupplier] = useState<Partial<Supplier>>({
    name: '',
    category: '',
    contact: '',
    location: '',
    items: [],
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempItems, setTempItems] = useState('');

  const handleAddSupplier = () => {
    if (newSupplier.name && newSupplier.category && newSupplier.contact && newSupplier.location) {
      const supplier: Supplier = {
        id: Date.now().toString(),
        name: newSupplier.name,
        category: newSupplier.category,
        contact: newSupplier.contact,
        location: newSupplier.location,
        items: tempItems.split(',').map(item => item.trim()).filter(Boolean),
      };

      onUpdate([...suppliers, supplier]);
      setNewSupplier({
        name: '',
        category: '',
        contact: '',
        location: '',
        items: [],
      });
      setTempItems('');
    }
  };

  const handleEditSupplier = (supplier: Supplier) => {
    setEditingId(supplier.id);
    setNewSupplier(supplier);
    setTempItems(supplier.items.join(', '));
  };

  const handleUpdateSupplier = () => {
    if (editingId && newSupplier.name && newSupplier.category && newSupplier.contact && newSupplier.location) {
      const updatedSuppliers = suppliers.map(supplier =>
        supplier.id === editingId
          ? {
              ...supplier,
              name: newSupplier.name!,
              category: newSupplier.category!,
              contact: newSupplier.contact!,
              location: newSupplier.location!,
              items: tempItems.split(',').map(item => item.trim()).filter(Boolean),
            }
          : supplier
      );

      onUpdate(updatedSuppliers);
      setEditingId(null);
      setNewSupplier({
        name: '',
        category: '',
        contact: '',
        location: '',
        items: [],
      });
      setTempItems('');
    }
  };

  const handleDeleteSupplier = (id: string) => {
    const updatedSuppliers = suppliers.filter(supplier => supplier.id !== id);
    onUpdate(updatedSuppliers);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Suppliers & Resources</h2>

      {/* Add/Edit Supplier Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Supplier Name"
          value={newSupplier.name}
          onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
          className="rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="text"
          placeholder="Category"
          value={newSupplier.category}
          onChange={(e) => setNewSupplier({ ...newSupplier, category: e.target.value })}
          className="rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="text"
          placeholder="Contact Information"
          value={newSupplier.contact}
          onChange={(e) => setNewSupplier({ ...newSupplier, contact: e.target.value })}
          className="rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="text"
          placeholder="Location"
          value={newSupplier.location}
          onChange={(e) => setNewSupplier({ ...newSupplier, location: e.target.value })}
          className="rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <div className="md:col-span-2">
          <input
            type="text"
            placeholder="Items (comma-separated)"
            value={tempItems}
            onChange={(e) => setTempItems(e.target.value)}
            className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="md:col-span-2">
          <button
            onClick={editingId ? handleUpdateSupplier : handleAddSupplier}
            disabled={!newSupplier.name || !newSupplier.category || !newSupplier.contact || !newSupplier.location}
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {editingId ? 'Update Supplier' : 'Add Supplier'}
          </button>
        </div>
      </div>

      {/* Suppliers List */}
      <div className="space-y-4">
        {suppliers.map((supplier) => (
          <div
            key={supplier.id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{supplier.name}</h3>
                <p className="text-sm text-gray-500">{supplier.category}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditSupplier(supplier)}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleDeleteSupplier(supplier.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Contact</p>
                <p className="text-sm font-medium text-gray-900">{supplier.contact}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-sm font-medium text-gray-900">{supplier.location}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Available Items</p>
              <div className="flex flex-wrap gap-2">
                {supplier.items.map((item, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suppliers; 