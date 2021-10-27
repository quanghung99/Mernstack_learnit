import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useContext, useState, useEffect } from 'react';
import { PostContext } from '../../contexts/PostContext';
import { toast } from 'react-toastify';

const UpdateModalPost = () => {
  // update existing post
  const {
    updatedPost,
    postState: { post },
    ShowModalUpdate,
    SetShowModalUpdate,
  } = useContext(PostContext);

  //state
  const [updatePost, setupdatePost] = useState(post);

  useEffect(() => setupdatePost(post), [post]);

  const { title, description, url, status } = updatePost;

  const onChangeUpdatePost = (event) => {
    setupdatePost({ ...updatePost, [event.target.name]: event.target.value });
  };

  const closeModal = () => {
    setupdatePost(post);
    SetShowModalUpdate(false);
  };

  const onSubmitUpdatedPost = async (event) => {
    event.preventDefault();
    toast('Updated learning post', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    SetShowModalUpdate(false);

    try {
      await updatedPost(updatePost);
    } catch (error) {}
  };

  return (
    <Modal show={ShowModalUpdate} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit your learning</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmitUpdatedPost}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              aria-describedby="title-help"
              placeholder="title"
              required
              name="title"
              value={title}
              onChange={onChangeUpdatePost}
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
              onChange={onChangeUpdatePost}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Url"
              name="url"
              value={url}
              onChange={onChangeUpdatePost}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              name="status"
              value={status}
              onChange={onChangeUpdatePost}
            >
              <option value="To learn">To learn</option>
              <option value="Learning">Learning</option>
              <option value="Learned">Learned</option>
            </Form.Control>
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

export default UpdateModalPost;
