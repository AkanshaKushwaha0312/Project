/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState, useEffect } from 'react';
import { format} from 'date-fns';
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button
  // Illustration,
  // IMAGES,
  // TextField,
  // Pagination,
  // TableFooter,
} from '@ellucian/react-design-system/core';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { widthFluid } from '@ellucian/react-design-system/core/styles/tokens';
import axios from 'axios';
import { Link } from 'react-router-dom';
const styles = () => ({
  root: {
    width: widthFluid,
    overflow: 'hidden',
  },
  tableContainer: {
    minWidth: 200,
    overflowX: 'auto',
    height: 300,
  },
  table: {
    width: widthFluid,
  }, //root, tableContainer, table not used here
  Illustration: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const formatYearMonth = (year, month) => {
  const monthAbbreviation = format(new Date(year, month - 1, 1), 'MMM');
  return `${year} ${monthAbbreviation}`;
};

const AllExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  //const [totalAmount, setTotalAmount] = useState({});
  const [monthlyTotals, setMonthlyTotals] = useState([]);
  
  const fetchMonthlyExpenses = () => {
    axios
      .get('http://localhost:8000/api/expenses/monthlyExpenditure')
      .then((response) => {
        // Assuming your response contains fields like totalSpent, totalReceived, and totalAmount
        //const { totalSpent, totalReceived } = response.data;
		
		const formattedData = response.data.map((item) => ({
          ...item,formattedDate: formatYearMonth(item._id.year, item._id.month)    
        }))
        console.log(response.data);
        setMonthlyTotals(formattedData);
      })
      .catch((error) =>
        console.error('Error fetching monthly expenses:', error)
      );
  };
  const fetchExpenses = () => {
    axios
      .get('http://localhost:8000/api/expenses/all')
      .then((response) => {
        setExpenses(response.data);
    //    let totalSpent = 0;
    //    let totalReceived = 0;
        response.data.forEach((expense) => {
          if (expense.spentReceived === 'Spent') {
         //   totalSpent += expense.amount;
          } else if (expense.spentReceived === 'Recieved') {
         //   totalReceived += expense.amount;
          }
        });
        // Calculate the total amount by subtracting spent from received
        //const calculatedTotalAmount = totalReceived - totalSpent;
        // setTotalAmount({
        //   total: calculatedTotalAmount,
        //   totalReceived,
        //   totalSpent
        // });
      })
      .catch((error) => console.error('Error fetching expenses:', error));
  };
  useEffect(() => {
    fetchMonthlyExpenses();
   // alert('to test fetch expenses');
    fetchExpenses();
  }, []);
  const deleteRecord=(id)=>{
    axios
    .delete(`http://localhost:8000/api/expenses/${id}`)
    .then((response) => {
      fetchExpenses();
      console.log('Deleted Successfully'+response);
    })
    .catch((error) => console.error('deleting Record:', error));
  };
  return (
    <div className={styles.root}>
      <Typography variant='h2'>Expense List</Typography>
     <Button><Link to='/add' style={{ textDecoration: 'none',color:'#fff'}}>Add Expenses</Link></Button>
      <div style={{margin:'10px'}}>
      <Table className={styles.table}>
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Spent/Received</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>ExpenditureDate</TableCell>
            <TableCell>Modify/Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense._id}>
              <TableCell>{expense.description}</TableCell>
              <TableCell>{expense.amount}</TableCell>
              <TableCell>{expense.spentReceived}</TableCell>
              <TableCell>{expense.category}</TableCell>
              <TableCell>{expense?.expenditureDate ? format(new Date(expense.expenditureDate), 'MM/dd/yyyy'): '--'}</TableCell>
              <TableCell>
                <Button><Link to={`/edit/${expense._id}`} style={{ textDecoration: 'none',color:'#fff' }}>Edit</Link></Button>
                <Button onClick={() => deleteRecord(expense._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
     </div>
      {/* <div>
        <Typography>Total Spent: {totalAmount.totalSpent}</Typography>
      </div>
      <div>
        <Typography>Total Received: {totalAmount.totalReceived}</Typography>
      </div> */}
     {/* <div>
        <Typography>Total Spent: {monthlyTotals.totalSpent}</Typography>
      </div>
      <div>
        <Typography>Total Received: {monthlyTotals.totalReceived}</Typography>
      </div> */}
  <div style={{margin : '20px'}}>
    <h3>Monthly expense</h3>
  <Table className={styles.table}>
        <TableHead>
          <TableRow>
            <TableCell>Month</TableCell>
            <TableCell>Spent</TableCell>
            <TableCell>Received</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {monthlyTotals.map((expense) => (
            <TableRow key={expense._id}>
			        <TableCell>{expense.formattedDate}</TableCell>
              <TableCell>{expense.spentAmount}</TableCell>
              <TableCell>{expense.receivedAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  </div>
    </div>
  );
};
// import { Typography } from '@ellucian/react-design-system/core';
// import React from 'react';
// const AllExpenses = () => {
//   return <Typography>Hello</Typography>;
// };
// export default withStyles(styles)(AllExpenses);
AllExpenses.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(AllExpenses);