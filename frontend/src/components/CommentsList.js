import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loader, List, Header, Button, Card, Icon } from 'semantic-ui-react';
import { getPostComments, createPostComments, updatePostComments, deletePostComments, votePostComments } from '../store/actions';
import EditComment from './EditComment';

class CommentsList extends Component {
  state = {
    currentPost: null,
  }

  componentWillMount() {
    const { match, getPostComments, createPostComments } = this.props;
    getPostComments(match.params.id);
  }

  formatTime(unixTimestamp) {
    const date = new Date(unixTimestamp);
    const year = date.getFullYear();
    const month = date.getMonth() > 9 ? date.getMonth() : `0${date.getMonth()}`;
    const day = date.getDay() > 9 ? date.getDay() : `0${date.getDay()}`;
    const formatedTime = `${year}-${month}-${day}`;

    return formatedTime;
  }

  renderComments() {
    if (this.props.comments) {
      return (
        <div>
          {
            this.props.comments.sort((a, b) => b.timestamp - a.timestamp).map(comment => (
              <div key={comment.id} style={{ marginBottom: 20 }}>
                <Card>
                  <Card.Content>
                    <Card.Meta><Icon name='user' />{comment.author}</Card.Meta>
                    <Card.Description>{comment.body}</Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <div>
                      Score: {comment.voteScore}
                    </div>
                    <div>
                      Date: {this.formatTime(comment.timestamp)}
                    </div>
                    <EditComment
                      editing
                      comment={comment}
                      updateComment={params => this.props.updateComment(params)}
                    />
                    <div>
                      <Button
                        color="red"
                        onClick={() => this.props.deleteComment({ commentId: comment.id })}
                      >
                        Delete Commnet
                      </Button>
                    </div>
                    <div style={{ marginTop: 10 }}>
                      <Button
                        color="green"
                        onClick={() => this.props.votePostComment({ commentId: comment.id, voteType: 'upVote' })}
                      >
                        +
                      </Button>
                      <Button
                        color="red"
                        onClick={() => this.props.votePostComment({ commentId: comment.id, voteType: 'downVote' })}
                      >
                        -
                      </Button>
                    </div>
                  </Card.Content>
                </Card>
              </div>
            ))
          }
        </div>
      );
    }
    return (
      <Loader />
    )
  }

  render() {
    return (
      <div>
        <Header as="h2">
          comment section ({ this.props.currentPost.commentCount })
        </Header>
        <EditComment
          createComment={params => this.props.createPostComments(params)}
          postId={this.props.match.params.id}
      />
        {this.renderComments()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    comments: state.comments,
  }
}

const mapDispatchToProps = dispatch => ({
  getPostComments: postId => dispatch(getPostComments(postId)),
  createPostComments: params => dispatch(createPostComments(params)),
  updateComment: params => dispatch(updatePostComments(params)),
  deleteComment: params => dispatch(deletePostComments(params)),
  votePostComment: params => dispatch(votePostComments(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList);