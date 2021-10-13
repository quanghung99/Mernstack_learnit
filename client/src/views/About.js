import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const About = () => {
  return (
    <Row style={{ marginTop: '24vh', marginRight: '0' }}>
      <Col className="text-center">
        <Button variant="primary" size="lg" href="https://youtube.com">
          Visit my youtube channel for more videos
        </Button>
      </Col>
    </Row>
  );
};

export default About;
