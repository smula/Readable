import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Button } from 'semantic-ui-react';
import { getAllPosts, getCategoryPosts, editPosts, deletePosts, votePosts } from '../store/actions';
import EditPost from './EditPost';

class PostsList extends Component {
  state = {
    currentParams: '',
    canGetAllPosts: true,
  }

  componentWillMount() {
    const { match, getCategoryPosts, getAllPosts } = this.props;
    if (!this.props.match) {
      this.props.getAllPosts();
    } else {
      this.props.getCategoryPosts(match.params.category);
      this.setState({
        currentParams: match.params.category,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match || (this.state.currentParams === '' && nextProps.match)) {
      if (this.state.currentParams === '' || this.props.match.params.category !== nextProps.match.params.category) {
        this.props.getCategoryPosts(nextProps.match.params.category);
        this.setState({
          currentParams: nextProps.match.params.category,
          canGetAllPosts: true,
        });
      }
    }

    if (this.state.canGetAllPosts && !nextProps.match) {
      this.props.getAllPosts();
      this.setState({
        currentParams: '',
        canGetAllPosts: false,
      })
    }
  }

  formatTime(unixTimestamp) {
    const date = new Date(unixTimestamp);
    const year = date.getFullYear();
    const month = date.getMonth() > 9 ? date.getMonth() : `0${date.getMonth()}`;
    const day = date.getDay() > 9 ? date.getDay() : `0${date.getDay()}`;
    const formatedTime = `${year}-${month}-${day}`

    return formatedTime;
  }

  render() {
    return (
      <div>
        {
          this.props.posts.sort((a, b) => {
            if (this.props.sort === null || this.props.sort === 'timestamp') { return b.timestamp - a.timestamp }
            return b.voteScore - a.voteScore;
          }).map((post, index) => (
            <Card key={`${post.id}`} style={{ width: '100%', marginTop: 10, marginBottom: 10 }}>
              <Card.Content>
                <Link to={`/posts/${post.id}`}>
                  <Card.Header>{post.title}</Card.Header>
                  <Card.Meta>{post.author}</Card.Meta>
                  <Card.Description>{post.body}</Card.Description>
                </Link>              
              </Card.Content>
              <Card.Content extra>
                <div>
                  Score: { post.voteScore }
                </div>
                <div>
                  Date: { this.formatTime(post.timestamp)}
                </div>
                <Button
                  color="green"
                  onClick={() => this.props.votePost({ postId: post.id, voteType: 'upVote' })}
                >
                  +
                      </Button>
                <Button
                  color="red"
                  onClick={() => this.props.votePost({ postId: post.id, voteType: 'downVote' })}
                >
                  -
                </Button>
                <EditPost
                  editing
                  post={post}
                  updatePost={params => this.props.editPost(params)}
                />
                <Button
                  color="red"
                  onClick={() => this.props.deletePost({ postId: post.id})}
                >Delete Post</Button>
              </Card.Content>
            </Card>
          ))
        }
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    posts: state.posts,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoryPosts: category => dispatch(getCategoryPosts(category)),
    getAllPosts: () => dispatch(getAllPosts()),
    editPost: params => dispatch(editPosts(params)),
    deletePost: params => dispatch(deletePosts(params)),
    votePost: params => dispatch(votePosts(params)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);
