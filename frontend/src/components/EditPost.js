import React, { Component } from 'react';
import { Button, Modal, Form, Icon } from 'semantic-ui-react';

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      body: '',
      title: '',
      category: '',
      open: false,
    }

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
      author: this.props.post.author,
      body: this.props.post.body,
      title: this.props.post.title,
    });
  }

  handleUnmount() {
    if (!this.props.editing) {
      this.setState({
        author: '',
        body: '',
        title: '',
        category: '',
        open: false,
      });
    }
  }

  renderEdit() {
    if (!this.props.editing) {
      return (
        <Modal
          open={this.state.open}
          onSubmit={() => {
            this.setState({
              open: false,
            });
          }}
          onUnmount={() => this.handleUnmount()}
          trigger={
            <Button
              onClick={() => this.setState({
                open: true,
              })}
            >
              Create Post
            </Button>
          }
        >
          <Modal.Header>Create Post</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form onSubmit={() =>
                this.props.createPost({
                  author: this.state.author,
                  title: this.state.title,
                  body: this.state.body,
                  category: this.state.category,
                })
              }>
                <Form.Field>
                  <label>Author</label>
                  <input
                    placeholder='Author'
                    name="author"
                    value={this.state.author}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Category</label>
                  <input
                    placeholder="Category"
                    name="category"
                    value={this.state.category}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Title</label>
                  <input
                    placeholder="Title"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Body</label>
                  <input
                    placeholder="Body"
                    name="body"
                    value={this.state.body}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Button type='submit'>Submit</Button>
                <Button color="red" onClick={() => this.setState({ open: false })}>Close</Button>                
              </Form>
            </Modal.Description>
          </Modal.Content>
       </Modal>
      );
    }

    return (
      <Modal
        open={this.state.open}
        onSubmit={() => {
          this.setState({
            open: false,
          });
        }}
        onUnmount={() => this.handleUnmount()}
        trigger={
          <Button
            onClick={() => this.setState({
              open: true,
            })}
          >
            Click here to edit
          </Button>
        }
      >
        <Modal.Header>Edit Post</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form
            onSubmit={() =>
              this.props.updatePost({
                title: this.state.title,
                body: this.state.body,
                postId: this.props.post.id,
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
              <Form.Field>
                <label>Title</label>
                <input
                  placeholder="Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>body</label>
                <input
                  placeholder="body"
                  name="body"
                  value={this.state.body}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Button type='submit'>Submit</Button>
              <Button color="red" onClick={() => this.setState({ open: false })}>Close</Button>                              
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }

  render() {
    return (
      <div style={{ marginBottom: 10 }}>
        {this.renderEdit()}
      </div>
    );
  }
}

export default EditPost;
