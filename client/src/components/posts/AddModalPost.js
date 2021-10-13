import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useContext, useState } from 'react';
import { PostContext } from '../../contexts/PostContext';
import { toast } from 'react-toastify';

const AddModalPost = () => {
  // add new post
  const { addPost } = useContext(PostContext);

  //state
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    url: '',
    status: 'To learn',
  });

  const { ShowModal, SetShowModal } = useContext(PostContext);

  const { title, description, url } = newPost;

  const onChangeNewPost = (event) => {
    setNewPost({ ...newPost, [event.target.name]: event.target.value });
  };

  const closeModal = () => {
    resetAddPost();
  };

  const onSubmitNewPost = async (event) => {
    event.preventDefault();
    resetAddPost();
    toast('Created a new learn', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    try {
      await addPost(newPost);
    } catch (error) {}
  };

  const resetAddPost = () => {
    setNewPost({ title: '', description: '', url: '', status: 'To learn' });
    SetShowModal(false);
  };

  return (
    <Modal show={ShowModal} animation={false} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>what's things do you want to learn?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmitNewPost}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              aria-describedby="title-help"
              placeholder="title"
              required
              name="title"
              value={title}
              onChange={onChangeNewPost}
            />
            <Form.Text id="title-help">Required</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="description"
              name="description"
              required
              value={description}
              onChange={onChangeNewPost}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Url"
              name="url"
              value={url}
              onChange={onChangeNewPost}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            let's do it!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddModalPost;
