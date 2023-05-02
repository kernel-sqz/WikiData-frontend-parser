import React from "react";
import { Card } from "react-bootstrap";
import { TableComponent } from "../tables/table";
import { imdbTable } from "../../data/tables";

export const TableCard = () => {
  return (
    <Card style={{ backgroundColor: "rgba(255, 255, 255, 0.596)" }}>
      <Card.Body>
        <TableComponent tableHeader={imdbTable} />
      </Card.Body>
    </Card>
  );
};
