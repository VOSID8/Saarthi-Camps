import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api_url from '../config';

function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [filterByUrgency, setFilterByUrgency] = useState('');
  const [limit, setLimit] = useState(20); // Default limit

  useEffect(() => {
    fetchOrders();
  }, [limit]); // Fetch orders when limit changes

  const fetchOrders = () => {
    const token = localStorage.getItem('accessToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let url = `${api_url}order/orders`;

    // Add sorting and filtering query parameters
    if (sortBy) {
      url += `?sort=${sortBy}`;
    }

    if (filterByUrgency) {
      url += sortBy ? `&medicineUrgency=${filterByUrgency}` : `?medicineUrgency=${filterByUrgency}`;
    }
    url += sortBy || filterByUrgency  ? `&limit=${limit}&page=1`:`?limit=${limit}&page=1`;

    axios.get(url, config)
      .then((response) => {
        setOrders(response.data);
        setFilteredOrders(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSortBy(sortValue);
  };

  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    setFilterByUrgency(filterValue);
  };

  const handleLimitChange = (e) => {
    const limitValue = parseInt(e.target.value);
    setLimit(limitValue);
  };

  const applyFiltersAndSort = () => {
    fetchOrders();
  };

  return (
    <div className="h-[100%]">
      <h2>All Orders</h2>
      <div>
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortBy} onChange={handleSortChange}>
          <option value="">None</option>
          <option value="name">Name</option>
          <option value="quantity">Quantity</option>
        </select>
      </div>
      <div>
        <label htmlFor="filter">Filter by Urgency:</label>
        <select id="filter" value={filterByUrgency} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="0">Moderate</option>
          <option value="1">High</option>
          <option value="2">Critical</option>
        </select>
      </div>
      <div>
        <label htmlFor="limit">Limit:</label>
        <select id="limit" value={limit} onChange={handleLimitChange}>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <button onClick={applyFiltersAndSort}>Apply Filters and Sort</button>
      <div className="pl-2 pt-6">
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="pr-10">Medicine Name</th>
              <th className="pr-10">Quantity</th>
              <th>Urgency</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={index}>
                <td align="center">{order.medicineName}</td>
                <td align="center">{order.medicineQuantity}</td>
                <td align="center">
                  {order.medicineUrgency === 0 ? 'Moderate' : order.medicineUrgency === 1 ? 'High' : 'Critical'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllOrders;
