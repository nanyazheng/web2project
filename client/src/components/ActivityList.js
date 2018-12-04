import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import {Button, Glyphicon, Media} from 'react-bootstrap'; 
import ActivityDetail from './ActivityDetail';
import { LinkContainer } from 'react-router-bootstrap';
import ActivityCreate from './ActivityCreate';
import {FormControl, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';
import {Grid, Row, Col} from 'react-bootstrap'; 
function searchingFor(term) {
   return function(x){
      return x.title.toLowerCase().includes(term.toLowerCase()) || 
      !term;
   }
}
class ActivityList extends Component {
   constructor(props) {
      super(props);
      this.state = {
        data: [],
        actList: [],
        actNum: 0,
        ListDiv: [],
        term: ''
      };
      this.searchHandler = this.searchHandler.bind(this);
   }
   componentDidMount() {
      this.getDataFromDb();
   }

   async getDataFromDb() {
      try {
         let response = await axios.get('http://localhost:3001/api/users/1a2cbe1c-20d1-409c-9e09-bccaaf2d995d',{crossdomain:true});
         this.setState({
            data: response.data,
            actList: response.data.enroll_ev
         });
         this.setState({actNum: this.state.actList.length});
         
         this.createActList();
         
      } catch(e) {
         console.log(e);
      }
   }

   async createActList() {
      let tempDiv = [];
      try {
         let response = await axios.get("http://localhost:3001/api/events", {crossdomain:true});
         // console.log(response.data[0]._id);
         for (let i = 0; i < response.data.length; i++) {
            // let url = 'http://localhost:3001/api/events/';
            // console.log(url);
            // response = await axios.get(url,{crossdomain:true});
            let eventId = response.data[i]._id
            let title = response.data[i].title;
            let type = response.data[i].type;
            let place = response.data[i].place;
            let date = response.data[i].date;
            let time = response.data[i].time;
            let description = response.data[i].description; 
            // let enroll = response.data.enroll; 
            // console.log(fName + " " + LName);
            // console.log(i);
            let linkUrl = '/activity/' + eventId;
            let imgUrl = 'http://localhost:3001/public/assets/images/actIMG/' + type + ".png";
            let objectInfo = {};
            objectInfo.eventId = eventId;
            objectInfo.title = title;
            objectInfo.type = type;
            objectInfo.place = place;
            objectInfo.date = date;
            objectInfo.time = time;
            objectInfo.description = description;
            objectInfo.linkUrl = linkUrl;
            objectInfo.imgUrl = imgUrl;
            tempDiv.push(objectInfo);
            // let current = <div className='act_list_wrap' key={eventId}>
            // <Media>
            // <Media.Left>
            // <img className="act_evimg" src={imgUrl} width='250px' height='250px' alt='userimg'></img>
            // </Media.Left>
            // {/* <span className='fr_list_name'>{fName} {LName}</span> */}
            //    <Media.Body>
            //    <Media.Heading>{title}</Media.Heading>
            //    <p>{place}</p>
            //    <p>{date} @ {time}</p>
            //    <br />
            //    <p>{description}</p>
            //    <div className='act_detailButton_wrap'>
            //       <LinkContainer to={linkUrl}>
            //       <Button><Glyphicon glyph='list-alt' />Details</Button>
            //       </LinkContainer>
            //       <Button className='act_button_join'><Glyphicon glyph='plus' />Join Now</Button>
            //    </div>
            //    </Media.Body>
            // </Media>
            // </div>; //wrap end
            // tempDiv.push(current);
         }
      } catch(e) {
         console.log(e);
      }
      this.setState({ListDiv:tempDiv})
   }

   searchHandler(event) {
      this.setState({term: event.target.value})
   }
   handleClick() {
      alert('Successfully Join the Event!');
  }
   render() {
      let actTitle;
      let listDiv;
      if (this.state.actNum === 0) {
         actTitle = <p>You has not joined any activity yet!</p>
      } else if (this.state.actNum >= 2) {
         actTitle= <p>You have enrolled {this.state.actNum} events.</p>
      }
      listDiv = this.state.ListDiv;

   
      // let searchBar = <input type="text" className="input" 
      // onChange={this.searchHandler} placeholder="Search..." />
      let searchBar = <form>
      <FormGroup
        controlId="formBasicText"
      //   validationState={this.getValidationState()}
      >
        <ControlLabel>Searching Activity here</ControlLabel>
        <FormControl
          type="text"
         //  value={this.state.value}
          placeholder="Enter text"
          onChange={this.searchHandler}
        />
        <FormControl.Feedback />
        <HelpBlock>Activitiy matched will automatically shows below.</HelpBlock>
      </FormGroup>
      </form>
      return (
         <div>
            <div className='actL_title_wrap'>
            {actTitle}
            <LinkContainer to="/activity/new/create">
            <Button className='act_button_create'>Create your own Event</Button>
            </LinkContainer>
            </div>
            <Grid className='actL_searchGrid'>
               <Row>
               <Col sm={6} md={12}>
               {searchBar}
               </Col>
               </Row>
            </Grid>

            {/* {listDiv} */}
            {
               this.state.ListDiv.filter(searchingFor(this.state.term)).map(
                  ev =>
                  <div className='act_list_wrap' key={ev.eventId}>
                  <Media>
                     <Media.Left>
                     <img className="act_evimg" src={ev.imgUrl} width='250px' height='250px' alt='userimg'></img>
                     </Media.Left>
                     <Media.Body>
                     <Media.Heading>{ev.title}</Media.Heading>
                     <p>{ev.place}</p>
                     <p>{ev.date} @ {ev.time}</p>
                     <br />
                     <p>{ev.description}</p>
                     <div className='act_detailButton_wrap'>
                     <LinkContainer to={ev.linkUrl}>
                     <Button><Glyphicon glyph='list-alt' />Details</Button>
                     </LinkContainer>
                     <Button className='act_button_join' onClick={this.handleClick}><Glyphicon glyph='plus' />Join Now</Button>
                     </div>
                     </Media.Body>
                  </Media>
                  </div> //wrap end
            
               )
            }
            <Switch> 
            <Route path="/activity/:id" exact component={ActivityDetail} />
            <Route path="/activity/new/create" exact component={ActivityCreate} />
            </Switch>
         </div>
      );
   }
}

export default ActivityList;