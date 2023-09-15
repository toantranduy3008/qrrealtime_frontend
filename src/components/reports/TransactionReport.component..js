import React, { useEffect, useState } from 'react'
// import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, FormGroup, Label, Input, Button, Table, Badge } from 'reactstrap'
import ReactPaginate from 'react-paginate';
import format from 'date-fns/format';
import axios from 'axios';
import AuthService from '../../services/Auth.service';
import ServiceAlert from '../../common/ServiceAlert';
import ReportServices from './ReportServices';
import authHeader from '../../services/auth-header';
function TransactionReport() {
  // State
  const [disableMerchant, setDisableMerchant] = useState(false)
  const [disableBranch, setDisableBranch] = useState(false)
  const [disableCashier, setDisableCashier] = useState(false)
  const [status, setStatus] = useState("")
  const [merchantId, setMerchantId] = useState()
  const [cashierId, setCashierId] = useState()
  const [fromDate, setFromDate] = useState()
  const [toDate, setToDate] = useState()


  const [merchant, setMerchant] = useState([{ id: 0, name: 'Tất cả' }])
  const [branch, setBranch] = useState([{ id: 0, name: 'Tất cả' }])
  const [cashier, setCashier] = useState([{ id: 0, name: 'Tất cả' }])
  const [data, setData] = useState([])
  // Select options
  const transactionStatus = [
    {
      name: "Tất cả",
      value: ""
    },
    {
      name: "Thành công",
      value: "0"
    },
    {
      name: "Không thành công",
      value: "1"
    }
  ]

  const rowHeader = ["STT", "Mã giao dịch", "Thời gian giao dịch", "Branch", "Quầy", "Tên khách hàng", "Số tiền", "Trạng thái"]
  const fakeData = [
    {
      refNo: 123,
      date: format(new Date(), 'dd/MM/yyyy'),
      branch: "Chi nhánh 1",
      counter: "1",
      customerName: "Trần Duy Toàn",
      amount: 20000,
      status: "00"
    },
    {
      refNo: 123,
      date: format(new Date(), 'dd/MM/yyyy'),
      branch: "Chi nhánh 1",
      counter: "1",
      customerName: "Trần Duy Toàn",
      amount: 20000,
      status: "00"
    },
    {
      refNo: 123,
      date: format(new Date(), 'dd/MM/yyyy'),
      branch: "Chi nhánh 1",
      counter: "1",
      customerName: "Trần Duy Toàn",
      amount: 20000,
      status: "00"
    },
    {
      refNo: 123,
      date: format(new Date(), 'dd/MM/yyyy'),
      branch: "Chi nhánh 1",
      counter: "1",
      customerName: "Trần Duy Toàn",
      amount: 20000,
      status: "14"
    },
    {
      refNo: 123,
      date: format(new Date(), 'dd/MM/yyyy'),
      branch: "Chi nhánh 1",
      counter: "1",
      customerName: "Trần Duy Toàn",
      amount: 20000,
      status: "68"
    },
    {
      refNo: 123,
      date: format(new Date(), 'dd/MM/yyyy'),
      branch: "Chi nhánh 1",
      counter: "1",
      customerName: "Trần Duy Toàn",
      amount: 20000,
      status: "00"
    },
    {
      refNo: 123,
      date: format(new Date(), 'dd/MM/yyyy'),
      branch: "Chi nhánh 1",
      counter: "1",
      customerName: "Trần Duy Toàn",
      amount: 20000,
      status: "00"
    },
    {
      refNo: 123,
      date: format(new Date(), 'dd/MM/yyyy'),
      branch: "Chi nhánh 1",
      counter: "1",
      customerName: "Trần Duy Toàn",
      amount: 20000,
      status: "00"
    }
  ]
  const sessionUser = AuthService.getCurrentUser()
  const userType = sessionUser ? sessionUser.targetType : 'CASHIER';

  const totalPages = 10;

  // Call api get data

  const handleChangeStatus = (e) => {
    console.log(e.target.value)
    setStatus(e.target.value);
  }

  const handleSearch = async () => {
    const paging = {
      page: 0,
      size: totalPages,
      sort: 'id, asc'
    }

    const filtersInput = {
      merchantId: merchantId,
      cashierId: cashierId,
      transactionStatus: status,
      fromDate: fromDate,
      toDate: toDate
    }

    const apiUrl = ''
    const result = await ReportServices.get(apiUrl, paging, filtersInput)
  }

  return (
    <>
      {/* Tìm kiếm */}
      <Container fluid>
        <Row>
          <Col>
            <Card>
              <Row>
                <Col xs={4}>
                  <FormGroup row>
                    <Label
                      for="exampleEmail"
                      sm={4}
                    >
                      Merchant
                    </Label>
                    <Col sm={8}>
                      <Input
                        id="exampleSelect"
                        name="select"
                        type="select"
                        disabled={disableMerchant}
                      >
                        {merchant.map((item, index) => <option value={item.id} key={index}>{item.name}</option>)}
                      </Input>
                    </Col>
                  </FormGroup>
                </Col>
                <Col xs={4}>
                  <FormGroup row>
                    <Label
                      for="exampleEmail"
                      sm={4}
                    >
                      Branch
                    </Label>
                    <Col sm={8}>
                      <Input
                        id="exampleSelect"
                        name="select"
                        type="select"
                        disabled={disableBranch}
                      >
                        {branch.map((item, index) => <option value={item.id} key={index}>{item.name}</option>)}
                      </Input>
                    </Col>
                  </FormGroup>
                </Col>
                <Col xs={4}>
                  <FormGroup row>
                    <Label
                      for="exampleEmail"
                      sm={4}
                    >
                      Cashier
                    </Label>

                    <Col sm={8}>
                      <Input
                        id="exampleSelect"
                        name="select"
                        type="select"
                        disabled={disableCashier}
                      >
                        {cashier.map((item, index) => <option value={item.id} key={index}>{item.name}</option>)}
                      </Input>
                    </Col>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col xs={4}>
                  <FormGroup row>
                    <Label
                      for="exampleEmail"
                      sm={4}
                    >
                      Từ ngày
                    </Label>
                    <Col sm={8}>
                      <Input
                        id="exampleDate"
                        name="date"
                        placeholder="date placeholder"
                        type="date"
                      />
                    </Col>
                  </FormGroup>
                </Col>
                <Col xs={4}>
                  <FormGroup row>
                    <Label
                      for="exampleEmail"
                      sm={4}
                    >
                      Đến ngày
                    </Label>
                    <Col sm={8}>
                      <Input
                        id="exampleDate"
                        name="date"
                        placeholder="date placeholder"
                        type="date"
                      />
                    </Col>
                  </FormGroup>
                </Col>
                <Col xs={4}>
                  <FormGroup row>
                    <Label
                      for="exampleEmail"
                      sm={4}
                    >
                      Trạng thái
                    </Label>

                    <Col sm={8}>
                      <Input
                        id="statusSelect"
                        name="statusSelect"
                        type="select"
                        value={status}
                        onChange={handleChangeStatus}
                      >
                        {transactionStatus.map((s, index) => {
                          return (
                            <option value={s.value} key={index}>{s.name}</option>
                          )
                        })}
                      </Input>
                    </Col>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col xs={2}>
                  <Button
                    color="primary"
                    onClick={handleSearch}
                  >
                    Tìm kiếm
                  </Button></Col>
              </Row>
            </Card>
          </Col>

        </Row>
      </Container>

      {/* Kết quả */}
      <Container fluid>
        <Row>
          <Col>
            <Card>
              {/* Phân trang */}
              <Row>
                <Col xl={4} lg={6} md={8} className="control-col-r3">

                  <ReactPaginate
                    previousLabel={'Trước'}
                    nextLabel={'Sau'}
                    pageCount={totalPages}
                    // onPageChange={this.handleClickPage}
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
              </Row>

              {/* Bảng */}
              <Table bordered hover
              // striped
              // hover
              // responsive
              // size="sm"
              >
                <thead>
                  <tr>
                    {rowHeader.map((row, index) => {
                      return (<th key={index}>{row}</th>)
                    })}
                  </tr>
                </thead>
                <tbody>
                  {fakeData.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td style={{ cursor: "pointer" }}>{item.refNo}</td>
                        {/* <td style={{ cursor: "pointer" }} onClick={() => goRouteId(item.refNo)}>{item.refNo}</td> */}
                        {/* <td style={{ cursor: "pointer" }}><Link href="/">{item.refNo}</Link></td> */}
                        <td>{item.date}</td>
                        <td>{item.branch}</td>
                        <td>{item.counter}</td>
                        <td>{item.customerName}</td>
                        <td>{new Intl.NumberFormat('en-US').format(item.amount)}</td>
                        <td>
                          {
                            item.status === "00" ?
                              <Badge
                                color="success"
                                pill
                              >
                                Thành công
                              </Badge>
                              :
                              <Badge
                                color="danger"
                                pill
                              >
                                Không thành công
                              </Badge>
                          }
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Card>
          </Col>

        </Row>
      </Container >
    </>

  )
}

export default TransactionReport