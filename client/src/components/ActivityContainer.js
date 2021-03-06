import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ActivityList from './ActivityList';
import ActivityDetail from './ActivityDetail';
import ActivityCreate from './ActivityCreate';
class ActivityContainer extends Component {
   constructor(props) {
      super(props);
      this.state = {

      };
   }
   render() {
      return (
         <div>
             
            <Switch> 
            <Route path="/activity/" exact component={ActivityList} />
            <Route path="/activity/:id" exact component={ActivityDetail} />
            <Route path="/activity/new/create" exact component={ActivityCreate} />
            </Switch>
         </div>
      );
   }
}

export default ActivityContainer;