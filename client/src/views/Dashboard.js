import React from 'react';
import { PostContext } from '../contexts/PostContext';
import { AuthContext } from '../contexts/AuthContext';
import { useContext, useEffect } from 'react';
import SinglePost from '../components/posts/SinglePost';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import AddModalPost from '../components/posts/AddModalPost';
import UpdateModalPost from '../components/posts/UpdateModalPost';
import createIcon from '../assests/images/plus-circle-fill.svg';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  // state
  const {
    postState: { post, posts, postLoading },
    getPosts,
    SetShowModal,
  } = useContext(PostContext);

  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  // start Get All Post
  useEffect(() => getPosts(), []);

  let body = null;

  if (postLoading) {
    <div className="spinner-container">
      <Spinner variant="info" animation="border" />
    </div>;
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5 mt-3">
          <Card.Header>
            <Card.Title>Hi {username}!!!</Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Title>Welcom to our class</Card.Title>

            <Card.Text>
              CLick the button below to track your first skill to learn.
            </Card.Text>
            <Button variant="primary" onClick={SetShowModal}>
              Start learn
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map((post) => {
            return (
              <Col key={post._id} className="mt-2">
                <SinglePost post={post} />
              </Col>
            );
          })}
        </Row>

        <Button
          className="btn-floating"
          onClick={SetShowModal.bind(this, true)}
          width="32"
          height="32"
        >
          <img src={createIcon} alt="createIcon" width="60" height="60" />
        </Button>
        {/* <OverlayTrigger
          placement="left"
          overlay={<Tooltip> Add a new thing to learn </Tooltip>}
        >
          
        </OverlayTrigger> */}
      </>
    );
  }

  return (
    <>
      {body}
      <AddModalPost />
      {post !== null && <UpdateModalPost />}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
};

export default Dashboard;
