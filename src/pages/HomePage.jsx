import React from "react";
import { Row, Col } from "react-bootstrap";
import { TableCard } from "../components/widgets/tableCard";
import { InfoCard } from "../components/widgets/infoCard";

export const HomePage = () => {
  return (
    <>
      <Row className="mb-2">
        <Col>
          <InfoCard />
        </Col>
      </Row>
      <Row>
        <Col>
          <TableCard />
        </Col>
      </Row>
    </>
  );
};
