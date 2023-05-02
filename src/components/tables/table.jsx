import React, { useMemo, useState, useEffect } from "react";
import { useTable, useFilters, usePagination, useSortBy } from "react-table";
import { instance } from "../../instance";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import {
  Table,
  Card,
  Pagination,
  Nav,
  InputGroup,
  Row,
  Col,
  Form,
  Spinner,
} from "react-bootstrap";
import {
  faAngleDown,
  faSearch,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UpdateDB } from "../widgets/updateDB";

const TableQuery = ({ tableHeader }) => {
  const [tableData, setTableData] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(10);
  const [pageIndex, setPageIndex] = useState(1);
  const [movieName, setMovieName] = useState("");
  const [emptyDB, setEmptyDB] = useState(false);

  const movieQuery =
    movieName.length > 0
      ? `/api/movies/?page_size=${page}&page=${pageIndex}&title=${movieName}`
      : `/api/movies/?page_size=${page}&page=${pageIndex}`;
  const fetchData = () => instance.get(movieQuery);

  const { data: apiResponse, isLoading } = useQuery(
    ["movies", page, pageIndex, movieName],
    fetchData,
    {
      enabled: !tableData,
    }
  );

  useEffect(() => {
    setTableData(apiResponse?.data?.["results"]);
    setTotalItems(apiResponse?.data?.count);
    if (apiResponse?.data?.count === 0) {
      setEmptyDB(true);
    }
  }, [apiResponse]);

  if (isLoading || !tableData) {
    return (
      <Row xl={12} className="d-flex mt-5">
        <Col xl={12} className="justify-content-center">
          <Card className="own_blue2">
            <Card.Body>
              <Row xl={12} className="justify-content-center">
                <Col xl={6} className="text-start">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
  if (emptyDB) {
    return <UpdateDB type="widget" />;
  }
  return (
    <TableInstance
      tableData={tableData}
      tableHeader={tableHeader}
      totalItems={totalItems}
      setPage={setPage}
      setPageIndex={setPageIndex}
      pageIndex={pageIndex}
      pageSize={page}
      setMovieName={setMovieName}
    />
  );
};

export const TableInstance = ({
  tableData,
  tableHeader,
  totalItems,
  setPage,
  setPageIndex,
  pageIndex,
  pageSize,
  setMovieName,
}) => {
  const [columns, data] = useMemo(() => {
    const columns = tableHeader?.["data"];
    return [columns, tableData];
  }, [tableData]);

  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <>
      <div>
        <TableLayout
          {...tableInstance}
          setPage={setPage}
          totalItems={totalItems}
          setPageIndex={setPageIndex}
          _pageIndex={pageIndex}
          _pageSize={pageSize}
          setMovieName={setMovieName}
        />
      </div>
    </>
  );
};

const TableLayout = ({
  getTableProps,
  getTableBodyProps,
  headerGroups,
  page,
  prepareRow,
  setFilter,
  _pageSize,
  _pageIndex,
  state: { pageIndex = _pageIndex, pageSize = _pageSize },
  pageOptions,
  gotoPage,
  nextPage,
  setPageSize,
  update,
  totalItems,
  setPage,
  setPageIndex,
  setMovieName,
}) => {
  const [filterInput, setFilterInput] = useState("");
  const handleFilterChange = () => {
    setMovieName(filterInput);
  };

  const canNextPage = () => {
    return _pageIndex + 1 <= Math.round(totalItems / _pageSize);
  };

  const canPreviousPage = () => {
    return _pageIndex > 1;
  };

  return (
    <>
      <Row xl={12} className="">
        <Col
          xs={8}
          md={8}
          lg={6}
          xl={6}
          className="pb-4"
          style={{ paddingRight: "10%" }}
        >
          <InputGroup>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder=" e.g Snowpiercer"
              value={filterInput}
              onChange={(e) => setFilterInput(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleFilterChange();
                }
              }}
            />
          </InputGroup>
        </Col>
        <Col xs={4} md={4} lg={6} xl={6} className="pb-4 text-end">
          <UpdateDB type="simple" />
        </Col>
        <Card className="table-wrapper own_blue2 table-responsive">
          <Card.Body className="pt-0">
            <Table
              hover
              responsive
              className="user-table align-items-center mb-6"
              {...getTableProps()}
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        className={
                          column.isSorted
                            ? column.isSortedDesc
                              ? "sort-desc  ⬇️"
                              : "sort-asc ⬆️"
                            : " ↕️"
                        }
                      >
                        {column.render("Header")}
                        <FontAwesomeIcon className="px-1" icon={faAngleDown} />
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                  prepareRow(row);
                  return (
                    <>
                      <tr className="table_row" {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td
                              style={{ fontSize: "large" }}
                              {...cell.getCellProps()}
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
            <Card.Footer className="px-3 border-0 d-flex align-items-center ">
              <Row className="d-flex justify-content-between w-100">
                <Col xl={6} md={6} xs={6}>
                  <Nav>
                    <Pagination className="mb-2 mb-lg-0">
                      <Pagination.Prev
                        onClick={() => {
                          setPageIndex((_pageIndex) => _pageIndex - 1);
                        }}
                        disabled={!canPreviousPage()}
                      >
                        <FontAwesomeIcon icon={faChevronLeft} />
                      </Pagination.Prev>
                      <Pagination.Next
                        onClick={() => {
                          setPageIndex((_pageIndex) => _pageIndex + 1);
                        }}
                        disabled={!canNextPage()}
                      >
                        <FontAwesomeIcon icon={faChevronRight} />
                      </Pagination.Next>
                    </Pagination>
                  </Nav>
                </Col>
                <Col xl={6} md={6} xs={6} className="text-end">
                  {/* <div>
                    <span>
                      Rows: <strong>{_pageSize ?? 10}</strong>
                    </span>
                  </div> */}
                  <div>
                    <span>
                      Page{" "}
                      <strong>
                        {_pageIndex} / {Math.round(totalItems / page.length)}
                      </strong>{" "}
                    </span>
                  </div>
                  <div>
                    <span>
                      Total items: <strong>{totalItems}</strong>
                    </span>
                  </div>
                </Col>
              </Row>
            </Card.Footer>
          </Card.Body>
        </Card>
      </Row>
    </>
  );
};
const client = new QueryClient();
export const TableComponent = ({ tableHeader }) => {
  return (
    <QueryClientProvider client={client}>
      <TableQuery tableHeader={tableHeader} />
    </QueryClientProvider>
  );
};
