import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loader, Header, Button, Icon } from 'semantic-ui-react';
import { getAllPosts, votePosts, deletePosts, editPosts } from '../store/actions';
import CommentsList from './CommentsList';
import EditPost from './EditPost';

class PostDetail extends Component {
  state = {
    currentPost: null,
    notFound: false,
  }
  componentWillMount() {
    const { posts, match } = this.props;
    if (posts.length === 0) {
      getAllPosts();
    } else {
      this.setState({
        currentPost: this.findCurrentPost(this.props.posts, match.params.id),
      })
    }
  }

  findCurrentPost(posts, id) {
    const currentPost = posts.find(post => {
      return post.id === id;
    });
    if (currentPost === undefined) {
      this.setState({
        notFound: true,
      });
    }
    return currentPost
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentPost: this.findCurrentPost(nextProps.posts, this.props.match.params.id)
    })
  }

  formatTime(unixTimestamp) {
    const date = new Date(unixTimestamp);
    const year = date.getFullYear();
    const month = date.getMonth() > 9 ? date.getMonth() : `0${date.getMonth()}`;
    const day = date.getDay() > 9 ? date.getDay() : `0${date.getDay()}`;
    const formatedTime = `${year}-${month}-${day}`

    return formatedTime
  }

  render() {
    const { currentPost, notFound } = this.state;
    if (currentPost) {
      return (
        <div>
          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Link to="/">
              <Button
                style={{
                  position: 'absolute',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  left: 0,
                  top: 0,
                  bottom: 0,
                }}
              >
                <Icon name="long arrow left" />
              </Button>
            </Link>
            <Header as="h1">
              {
              currentPost.title
              }
            </Header>
          </div>
          <div>
            <b>Author:</b> {
              currentPost.author
            }
          </div>
          <div>
            <b>Category:</b> {
              currentPost.category
            }
          </div>
          <div>
            <b>Score:</b> {
              currentPost.voteScore
            }
          </div>
          <div>
            <b>Date:</b> {
              this.formatTime(currentPost.timestamp)
            }
          </div>
          <EditPost
            editing
            post={currentPost}
            updatePost={params => this.props.editPost(params)}
          />
          <Link to="/">
            <Button
              color="red"
              onClick={() => this.props.deletePost({ postId: currentPost.id })}
            >
              Delete post
            </Button>
          </Link>
          <div style={{ marginBottom: 30, marginTop: 10 }}>
            <Button
              color="green"
              onClick={() => this.props.votePost({ postId: currentPost.id, voteType: 'upVote' })}
            >
              +
            </Button>
            <Button
              color="red"
              onClick={() => this.props.votePost({ postId: currentPost.id, voteType: 'downVote' })}
            >
              -
            </Button>
          </div>
          <p>
            {
              currentPost.body
            }
          </p>

          <div>
            <CommentsList currentPost={currentPost} {...this.props}/>
          </div>
        </div>
      );
    } else if (notFound) {
      return (
        <div style={{ flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Header as="h1">
            Post not found
          </Header>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      );
    }
    return (
      <div style={{ flex: 1 }}>
        <Loader active />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
  }
}

const mapDispatchToProps = dispatch => ({
  getAllPosts: dispatch(getAllPosts()),
  votePost: params => dispatch(votePosts(params)),
  deletePost: params => dispatch(deletePosts(params)),
  editPost: params => dispatch(editPosts(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);