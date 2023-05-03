import React from "react";
import { Row, Col, Card, Accordion } from "react-bootstrap";

export const InfoCard = () => {
  const toolsUsed = {
    django: "4.2",
    "django-rest-framework": "3.14",
    requests: "2.29",
    unidecode: "1.3.6",
    "django-cors-headers": "3.14",
    "@fortawesome/fontawesome-svg-core": "6.1.1",
    "@fortawesome/free-brands-svg-icons": "6.1.1",
    "@fortawesome/free-regular-svg-icons": "6.1.1",
    "@fortawesome/free-solid-svg-icons": "6.1.1",
    "@fortawesome/react-fontawesome": "0.1.18",
    "@testing-library/jest-dom": "5.16.5",
    "@testing-library/react": "13.4.0",
    "@testing-library/user-event": "13.5.0",
    axios: "1.4.0",
    bootstrap: "5.2.3",
    "node-sass": "7.0.3",
    react: "18.2.0",
    "react-bootstrap": "2.7.4",
    "react-dom": "18.2.0",
    "react-query": "3.39.3",
    "react-scripts": "5.0.1",
    "react-table": "7.8.0",
    "web-vitals": "2.1.4",
    "workbox-background-sync": "6.5.4",
    "workbox-broadcast-update": "6.5.4",
    "workbox-cacheable-response": "6.5.4",
    "workbox-core": "6.5.4",
    "workbox-expiration": "6.5.4",
    "workbox-google-analytics": "6.5.4",
    "workbox-navigation-preload": "6.5.4",
    "workbox-precaching": "6.5.4",
    "workbox-range-requests": "6.5.4",
    "workbox-routing": "6.5.4",
    "workbox-strategies": "6.5.4",
    "workbox-streams": "6.5.4",
  };
  const todo = {
    "Add buttons with page index": "For easier walkthrough",
    "Add dropdown for selecting page size": "It would increase usability",
    "Better styling": "Nothing to explain",
  };
  return (
    <>
      <Card
        className="d-flex"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.596)" }}
      >
        <Card.Header>
          <Row className="d-flex text-center">
            <Col>
              <h2>Fullstack Python/React Developer - Home Assignment</h2>
              <h4>Created by Adrian KLEMCZAK</h4>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body className="text-light">
          <Row>
            <Col>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <h5 className="text-dark">Project details</h5>
                  </Accordion.Header>
                  <Accordion.Body className="text-light">
                    <Row className="">
                      <Col xl={6} md={6} sm={12} className="d-flex flex-column">
                        <Card className="own_blue2">
                          <Card.Body>
                            <h6>Libraries used:</h6>

                            {Object.entries(toolsUsed).map(([key, value]) => (
                              <Row className="d-flex text-gray-400">
                                <Col key={key}>
                                  <span>{key}</span>
                                </Col>
                                <Col key={value}>
                                  <span>{value}</span>
                                </Col>
                              </Row>
                            ))}
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col xl={6} md={6} sm={12}>
                        <Row className="d-flex flex-column">
                          <Col className="mb-2">
                            <Card className="own_blue2">
                              <Card.Body>
                                <h6>Description:</h6>
                                <Row className="d-flex flex-column">
                                  <Col className="text-gray-500">
                                    <ul>
                                      <li>Backend endpoints:</li>
                                      <ul>
                                        <li>/api/movies/</li>
                                        <ul>
                                          <li>Query parameters:</li>
                                          <ol className="text-gray-300">
                                            <li>
                                              ?title - (e.g. ?title=s) Will
                                              return every movies that title
                                              starts with 's'
                                            </li>
                                            <li>
                                              ?update (boolean) - When update
                                              parameter is set to 'true' script
                                              will check for updates from
                                              'https://query.wikidata.org'
                                            </li>
                                            <li>
                                              ?page (number) - Go to page
                                              (number)
                                            </li>
                                            <li>
                                              ?page_size (number) - Return
                                              (number - default 10) objects
                                            </li>
                                          </ol>
                                        </ul>
                                      </ul>
                                    </ul>
                                  </Col>
                                  <Col className="text-gray-500">
                                    <Row className="d-flex flex-column">
                                      <Col>
                                        <span>
                                          Example of saved movie in database:
                                        </span>
                                      </Col>
                                      <Col className="text-gray-300">
                                        <pre>
                                          {JSON.stringify(
                                            {
                                              movie:
                                                "http://www.wikidata.org/entity/Q18407",
                                              imdb_id: "tt0053779",
                                              title: "La Dolce Vita",
                                              date: "2020-03-20",
                                            },
                                            null,
                                            2
                                          )}
                                        </pre>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </Col>
                          <Col>
                            <Card className="own_blue2">
                              <Card.Body>
                                <h6>TODO:</h6>
                                <Row>
                                  <Col>
                                    {Object.entries(todo).map(
                                      ([key, value]) => (
                                        <Row className="d-flex text-gray-400">
                                          <Col xl={5} md={5} sm={5} key={key}>
                                            <span>{key}:</span>
                                          </Col>
                                          <Col xl={5} md={5} sm={5} key={value}>
                                            <span>{value}</span>
                                          </Col>
                                        </Row>
                                      )
                                    )}
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};
