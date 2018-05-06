import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, Header, Dropdown, Card, Button, Grid } from 'semantic-ui-react';
import { getAllCategories } from '../store/actions';
import PostsList from './PostsList';

class Home extends Component {
  state = {
    sort: null,
  }

  componentDidMount() {
    //console.log('mounted')
    console.log(this.props)
    const { getAllCategories } = this.props;
   
    getAllCategories();
  }


  render() {
    const sortOptions = [
      {
        value: 'voteScore',
        text: 'Vote Score'
      },
      {
        value: 'timestamp',
        text: 'Timestamp',
      },
    ];
    return (
      <div>
        <div style={{ marginBottom: 30 }}>
          <Header as="h1">Select category to see post from only that category</Header>
          <List>
            {
              this.props.categories.map((category, index) => (
                <List.Item key={`${category.name}.${index}`}>
                  <Link to={`/${category.path}/posts`}>
                    {
                      category.name
                    }
                  </Link>
                </List.Item>
              ))
            }
          </List>
        </div>
        <div>
          <Header as="h1">All posts</Header>
            <div style={{ marginBottom: 10 }}>
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <Dropdown
                      placeholder="Sort"
                      fluid
                      selection
                      options={sortOptions}
                      onChange={(e, data) => {
                        this.setState({
                          sort: data.value,
                        })
                      }}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Link to="/create">
                      <Button color="green">Click here to create a post</Button>
                    </Link>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
           </div>
           <PostsList sort={this.state.sort} {...this.props}/>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    categories: state.categories,
  }
}

const mapDispatchToProps = dispatch => ({
  getAllCategories: () => dispatch(getAllCategories()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
