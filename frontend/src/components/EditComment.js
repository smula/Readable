import React, { Component } from 'react';
import { Button, Modal, Form, Icon } from 'semantic-ui-react';

const defaultState = {
  author: '',
  comment: '',
  btnDisabled: true,
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
    const { author, comment } = this.state;
    let btnDisabled = true;
    let fields = [
      {
        name: 'author',
        value: author,
      },
      {
        name: 'comment',
        value: comment,
      }
    ];

    const shouldBeDisabled = fields.map((field, index) => {
      if (field.name === name) {
        return value.length;
      }
      return field.value.length;
    });
    if (shouldBeDisabled.indexOf(0) < 0) {
      btnDisabled = false;
    }

    this.setState({
      [name]: value,
      btnDisabled,
    });
  }

  handleIsEditing() {
    this.setState({
      author: this.props.comment.author,
      comment: this.props.comment.body,
      btnDisabled: false,
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

  renderEdit() {
    if (!this.props.editing) {
      return (
        <Modal
          open={this.state.open}
          onSubmit={() => this.toggleForm()}
          onUnmount={() => this.handleUnmount()}
          trigger={
            <Button
              onClick={() => this.toggleForm()}
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
                <Button type='submit' disabled={this.state.btnDisabled}>Submit</Button>
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
            onClick={() => this.toggleForm()}
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
              <Form.Field>
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
              <Button type='submit' disabled={this.state.btnDisabled}>Submit</Button>
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
