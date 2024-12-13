import React from 'react';
import { Search, Edit } from '@material-ui/icons';

const Navbar = () => {

  
   

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100">
      <div className="flex items-center md:ml-20">
        <h1 className="text-2xl font-bold text-gray-900">Task Boards</h1>
        <Edit className="ml-2 text-gray-400" />
      </div>
      <div className="relative mr-14 md:mr-0">
        <input
          type="text"
          placeholder="Search Tasks"
          className="w-full md:w-auto pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
         
          />
        <Search className="absolute left-3 top-2.5 text-gray-400" />
      </div>
    </div>
  );
};

export default Navbar;