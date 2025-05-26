/* eslint-disable */
import React from 'react';
import './TablePrices.css';

const TablePrices = () => {
    return (
        <div className="table-prices">
            <h2>Table Prices</h2>
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Item 1</td>
                        <td>$10</td>
                    </tr>
                    <tr>
                        <td>Item 2</td>
                        <td>$15</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default TablePrices;