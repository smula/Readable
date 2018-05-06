import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import { getAllPosts, getCategoryPosts } from '../store/actions';

class PostsList extends Component {
  state = {
    currentPath: '/',
  }

  componentWillMount() {
    console.log('mounted')
    console.log(this.props)
    const { match, getCategoryPosts, getAllPosts } = this.props;
    if (!match) {
      getAllPosts();
    } else {
      console.log(match.params.category)
      getCategoryPosts(match.params.category);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match) {
      if (this.props.match.params.category !== nextProps.match.params.category) {
        getCategoryPosts(nextProps.match.params.category);      
      }
    }
  }

  formatTime(unixTimestamp) {
    const date = new Date(unixTimestamp);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();
    const formatedTime = `${year}-${month}-${day}`

    return formatedTime
  }

  render() {
    return (
      <Card.Group>
        {
          this.props.posts.sort((a, b) => {
            if (this.props.sort === null || this.props.sort === 'timestamp') { return b.timestamp - a.timestamp }
            return b.voteScore - a.voteScore;
          }).map((post, index) => (
            <Link key={`${post.id}`} to={`/posts/${post.id}`}>
              <Card>
                <Card.Content>
                  <Card.Header>{post.title}</Card.Header>
                  <Card.Meta>{post.author}</Card.Meta>
                  <Card.Description>{post.body}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div>
                    Score: {post.voteScore}
                  </div>
                  <div>
                    Date: {this.formatTime(post.timestamp)}
                  </div>
                </Card.Content>
              </Card>
            </Link>
          ))
        }
      </Card.Group>
    )
  }
}


const mapStateToProps = state => {
  console.log(state);
  return {
    posts: state.posts,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log(ownProps);
  return {
    getCategoryPosts: (category) => dispatch(getCategoryPosts(category)),
    getAllPosts: () => dispatch(getAllPosts()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);
