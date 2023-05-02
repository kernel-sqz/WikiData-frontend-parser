import React, { useState } from "react";
import { Col, Row, Button, Spinner, Card } from "react-bootstrap";
import { instance } from "../../instance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";

export const UpdateDB = ({ type }) => {
  const [pending, setPending] = useState(false);
  const hideOnPending = pending === true ? "d-none" : "";
  const showOnPending = pending === true ? "" : "d-none";
  const pendingMessage =
    pending === false
      ? "There is no records in database, please update..."
      : "Updating, please wait...";
  function triggerUpdate() {
    setPending(true);
    instance.get("/api/movies/?update=true").then((res) => {
      if (res.status === 200) {
        window.location.reload();
      }
    });
  }

  if (type === "simple") {
    return (
      <>
        <Button
          className={hideOnPending}
          variant="success"
          onClick={triggerUpdate}
        >
          <span className="mx-2">Update</span>
          <FontAwesomeIcon icon={faRefresh} />
        </Button>
        <div className={`text-dark ${showOnPending}`}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Updating...</span>
          </Spinner>
        </div>
      </>
    );
  }
  if (type === "widget") {
    return (
      <Card className="own_blue2 text-light">
        <Card.Body>
          <Row className="d-flex text-center flex-column">
            <Col>
              <h3>{pendingMessage}</h3>
            </Col>
            <Col>
              <Button
                className={hideOnPending}
                variant="success"
                onClick={triggerUpdate}
              >
                <span className="mx-2">Update</span>
                <FontAwesomeIcon icon={faRefresh} />
              </Button>
              <div className={showOnPending}>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Updating...</span>
                </Spinner>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
};
