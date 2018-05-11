import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, Header, Dropdown, Button, Grid } from 'semantic-ui-react';
import { getAllCategories, createPosts } from '../store/actions';
import PostsList from './PostsList';
import EditPost from './EditPost';

class Home extends Component {
  state = {
    sort: null,
  }

  componentDidMount() {
    this.props.getAllCategories();
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
            <List.Item>
              <Link to={'/'}>
                <Button>All Posts</Button>
              </Link>
            </List.Item>
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
                    <EditPost
                      createPost={params => this.props.createPost(params)}
                    />
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
  createPost: params => dispatch(createPosts(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
