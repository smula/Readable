import React, { Component } from 'react';
import { Button, Modal, Form, Icon } from 'semantic-ui-react';

const defaultState = {
  author: '',
  body: '',
  title: '',
  category: '',
  open: false,
  btnDisabled: true,
}

class EditPost extends Component {
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
    const { author, body, title, category } = this.state;
    let btnDisabled = true;
    let fields = [
      {
        name: 'author',
        value: author,
      },
      {
        name: 'body',
        value: body,
      },
      {
        name: 'title',
        value: title,
      },
      {
        name: 'category',
        value: category,
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
      author: this.props.post.author,
      body: this.props.post.body,
      title: this.props.post.title,
      category: this.props.post.category,
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
                  <label>Category</label>
                  <input
                    placeholder="Category"
                    name="category"
                    value={this.state.category}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field required>
                  <label>Title</label>
                  <input
                    placeholder="Title"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field required>
                  <label>Body</label>
                  <input
                    placeholder="Body"
                    name="body"
                    value={this.state.body}
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
                <label>Category</label>
                <input
                  placeholder="Category"
                  name="category"
                  value={this.state.category}
                  onChange={this.handleChange}
                  disabled
                />
              </Form.Field>
              <Form.Field required>
                <label>Title</label>
                <input
                  placeholder="Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field required>
                <label>body</label>
                <input
                  placeholder="body"
                  name="body"
                  value={this.state.body}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Button type='submit' disabled={this.state.btnDisabled}>Submit</Button>
              <Button color="red" onClick={() => this.toggleForm()}>Close</Button>                              
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
