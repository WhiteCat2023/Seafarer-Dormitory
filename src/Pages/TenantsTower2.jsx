import React from 'react';
import { BiLoader, BiTrash, BiChevronLeft, BiChevronsLeft, BiChevronsRight, BiChevronRight } from 'react-icons/bi';

function TenantsTower2() {
  return (
    // Main Section
    <div className="relative">
      <div style={{ display: 'block', height: 'calc(100% - 50px)' }}>
        <div className="border-b-2 border-blue-500 justify-between flex items-center px-4 pb-1 pt-3 sticky top-0 left-0 bg-white">
          {/* Checkbox and Action Icons */}
          <div className="flex items-center gap-x-6">
            <input className="p-2 rounded cursor-pointer" type="checkbox" />
            <i className="p-1 text-xl rounded-full hover:bg-blue-100 cursor-pointer flex justify-center">
              <BiLoader />
            </i>
            <BiTrash className="text-3xl p-1 rounded-full hover:bg-blue-100 cursor-pointer flex justify-center" />
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center">
            <BiChevronLeft className="p-1 text-3xl rounded-full hover:bg-blue-100 cursor-pointer flex justify-center" />
            <BiChevronsLeft className="p-1 text-3xl rounded-full hover:bg-blue-100 cursor-pointer flex justify-center" />
            <p className="mx-2">1</p>
            <BiChevronsRight className="p-1 text-3xl rounded-full hover:bg-blue-100 cursor-pointer flex justify-center" />
            <BiChevronRight className="p-1 text-3xl rounded-full hover:bg-blue-100 cursor-pointer flex justify-center" />
          </div>
        </div>
        <div>
        <h2>Tenants in Tower 2</h2>
        {/* Add content for Tower 2 tenants */}
      </div>
      </div>
    </div>
  );
}

export default TenantsTower2;
