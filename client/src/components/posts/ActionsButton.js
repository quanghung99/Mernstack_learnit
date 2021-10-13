import React from 'react';
import Button from 'react-bootstrap/Button';
import playIcon from '../../assests/images/play-btn.svg';
import editIcon from '../../assests/images/pencil.svg';
import deleteIcon from '../../assests/images/trash.svg';
import { useContext } from 'react';
import { PostContext } from '../../contexts/PostContext';

const ActionsButton = ({ url, _id }) => {
  const { deletePost, findPost, SetShowModalUpdate } = useContext(PostContext);

  const choosePost = (postId) => {
    findPost(postId);
    SetShowModalUpdate(true);
  };
  return (
    <>
      <Button className="post-button ">
        <img src={playIcon} width="32" height="32" target="_blank" alt="play" />
      </Button>
      <Button className="post-button">
        <img
          src={editIcon}
          width="24"
          height="24"
          alt="editIcon"
          onClick={choosePost.bind(this, _id)}
        />
      </Button>
      <Button className="post-button">
        <img
          src={deleteIcon}
          width="24"
          height="24"
          alt="deleteIcon"
          onClick={deletePost.bind(this, _id)}
        />
      </Button>
    </>
  );
};

export default ActionsButton;
