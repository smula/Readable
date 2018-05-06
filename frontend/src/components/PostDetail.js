import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllPosts } from '../store/actions';

class PostDetail extends Component {
  state = {
    currentPost: {},
  }
  componentWillMount() {
    console.log(this.props);
    const { posts } = this.props;
    if (posts.length === 0) {
      console.log('should get all the posts')
      getAllPosts();
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  render() {
    return (
      <div>
        Post detail view.
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    posts: state.posts,
  }
}

const mapDispatchToProps = dispatch => ({
  getAllPosts: dispatch(getAllPosts()),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);