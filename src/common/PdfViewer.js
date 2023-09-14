import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import {
  Row, Col, ButtonGroup,
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { SizeMe } from 'react-sizeme';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSearchMinus, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from "react-paginate";

export default function PdfViewer(props) {
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); //setting 1 to show fisrt page
  const [zoomPage, setZoomPage] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setTotalPages(numPages);
    setCurrentPage(1);
  }

  function changeZoom(multiplier) {
    if (multiplier < 0.1) multiplier = 0.1;
    else if (multiplier > 2) multiplier = 2;
    setZoomPage(multiplier);
  }

  function handleClickPage(e) {
    setCurrentPage(Number(e.selected) + 1);
}

  const { pdf, isModalOpen, closeModal } = props;
  return (
    <Modal isOpen={isModalOpen}
      toggle={closeModal}
      centered={true}
      size="xl"
      style={{ maxWidth: '2700px', width: '100%' }}
      scrollable={true}
    >
      <ModalHeader toggle={closeModal}>
        <Row>
          <Col md="9">
          <ReactPaginate
                                            previousLabel={'Trước'}
                                            nextLabel={'Sau'}
                                            pageCount={totalPages}
                                            onPageChange={handleClickPage}
                                            pageClassName="page-item"
                                            pageLinkClassName="page-link"
                                            previousClassName="page-item"
                                            previousLinkClassName="page-link"
                                            nextClassName="page-item"
                                            nextLinkClassName="page-link"
                                            breakLabel="..."
                                            breakClassName="page-item"
                                            breakLinkClassName="page-link"
                                            containerClassName="pagination align-right"
                                            activeClassName="active"
                                        />
          </Col>
          <Col md="3">
            <ButtonGroup>
              <Button name="zoomout" id="zoomOut"
                onClick={e => changeZoom(zoomPage - 0.1)}
                className="btn btn-light btn-outline-secondary">
                <FontAwesomeIcon icon={faSearchMinus} />
              </Button>
              <Button name="zoomdefault" id="zoomDefault"
                onClick={e => changeZoom(1)}
                className="btn btn-light btn-outline-secondary">
                <FontAwesomeIcon icon={faSearch} />
              </Button>
              <Button name="zoomin" id="zoomIn"
                onClick={e => changeZoom(zoomPage + 0.1)}
                className="btn btn-light btn-outline-secondary">
                <FontAwesomeIcon icon={faSearchPlus} />
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </ModalHeader>
      <ModalBody>
        <SizeMe
          monitorHeight
          refreshRate={128}
          refreshMode={"debounce"}
          render={({ size }) => (
            <div>
              <Document
                file={pdf}
                onLoadSuccess={onDocumentLoadSuccess}
              // onLoadError={this.onDocumentLoadError}
              >
                <div>
                  <Page width={size.width * zoomPage} pageNumber={currentPage} />
                </div>
              </Document>
            </div>
          )}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={closeModal}>Đóng</Button>
      </ModalFooter>
    </Modal>
  );
}
