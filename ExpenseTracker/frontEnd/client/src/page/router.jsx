import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {AddExpenses,AllExpenses,EditExpenses} from './Home';
// for more information on react router: https://v5.reactrouter.com/web/guides/quick-start

const RouterPage = (props) => {
  return (
    <Router basename={props.pageInfo.basePath}>
      <Switch>
        <Route path='/add'>
          <AddExpenses {...props} />
        </Route> 
        <Route path='/edit/:id'>
          <EditExpenses {...props} />
       </Route> 
        <Route path='/'>
          <AllExpenses {...props} />
        </Route>
      </Switch>
    </Router>
  );
};
RouterPage.propTypes = {
  pageInfo: PropTypes.object,
};
export default RouterPage;
