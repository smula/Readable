import React, { Component } from 'react';
import { Button, Modal, Form, Icon } from 'semantic-ui-react';

const defaultState = {
  author: '',
  comment: '',
  open: false,
}

class EditComment extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.handleChange = this.handleChange.bind(this);
    this.handleIsEditing = this.handleIsEditing.bind(this);
  }

  componentDidMount() {
    if (this.props.editing) {
      this.handleIsEditing();
    }
  }

  handleChange(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleIsEditing() {
    this.setState({
      author: this.props.comment.author,
      comment: this.props.comment.body,
    });
  }

  handleUnmount() {
    if (!this.props.editing) {
      this.setState(defaultState);
    }
  }

  toggleForm() {
    this.setState({
      open: !this.state.open,
    })
  }

  // handleValidation() {
  //   if ()
  // }

  renderEdit() {
    if (!this.props.editing) {
      return (
        <Modal
          open={this.state.open}
          onSubmit={() => this.toggleForm()}
          onUnmount={() => this.handleUnmount()}
          trigger={
            <Button
              onClick={() => this.toggleForm}
            >
              Add Comment
            </Button>
          }
        >
          <Modal.Header>Add Comment</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form onSubmit={() => {
                this.props.createComment({
                  body: this.state.comment,
                  author: this.state.author,
                  parentId: this.props.postId,
                }).then(() => {
                  this.props.getSinglePost({ postId: this.props.postId });
                })
              }}>
                <Form.Field required>
                  <label>Author</label>
                  <input
                    placeholder='Author'
                    name="author"
                    value={this.state.author}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field required>
                  <label>Comment</label>
                  <input
                    placeholder="Comment"
                    name="comment"
                    value={this.state.comment}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Button type='submit'>Submit</Button>
                <Button color="red" onClick={() => this.toggleForm()}>Close</Button>    
              </Form>
            </Modal.Description>
          </Modal.Content>
       </Modal>
      );
    }

    return (
      <Modal
        open={this.state.open}
        onSubmit={() => this.toggleForm()}
        onUnmount={() => this.handleUnmount()}
        trigger={
          <Button
            onClick={() => this.setState({
              open: true,
            })}
          >
            Click here to edit
          </Button>}>
        <Modal.Header>Edit Comment</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form
            onSubmit={() =>
              this.props.updateComment({
                body: this.state.comment,
                commentId: this.props.comment.id,
              })
            }>
              <Form.Field required>
                <label><Icon name='user' /> Author</label>
                <input
                  placeholder="Author"
                  name="author"
                  value={this.state.author}
                  onChange={this.handleChange}
                  disabled
                />
              </Form.Field>
              <Form.Field required>
                <label>Comment</label>
                <input
                  placeholder="Comment"
                  name="comment"
                  value={this.state.comment}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Button type='submit'>Submit</Button>
              <Button color="red" onClick={() => this.toggleForm()}>Close</Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }

  render() {
    return (
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        {this.renderEdit()}
      </div>
    );
  }
}

export default EditComment;
