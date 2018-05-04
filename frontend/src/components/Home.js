import React, { Component } from 'react';
import { List, Header, Dropdown } from 'semantic-ui-react';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div>
          <Header as="h1">Here should all the categories be listed</Header>
          {/* <Dropdown placeholder="select category" /> */}
          <List>
            <List.Item>Here should all the categories be listed</List.Item>
            <List.Item>Here should all the categories be listed</List.Item>
            <List.Item>Here should all the categories be listed</List.Item>
          </List>
        </div>
        <div>
          <Header as="h1">Here should all the posts be shown</Header>
          <List>
            <List.Item>Here should all the categories be listed</List.Item>
            <List.Item>Here should all the categories be listed</List.Item>
            <List.Item>Here should all the categories be listed</List.Item>
          </List>
        </div>
        <div>
          Control for changing the order of the posts list.
        </div>
        <div>
          Add new post
        </div>
      </div>
    )
  }
}
