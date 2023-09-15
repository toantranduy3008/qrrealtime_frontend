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
  const dataFake = [
    {
      id: 1234,
      tnxStamp: format(new Date(), 'dd/MM/yyyy HH:mm:ss'),
      branchName: "Chi nhánh 1",
      merchantCashierCode: "Quầy 1",
      accountNo: "123456789",
      amount: 20000000,
      responseCode: "00"
    },
    {
      id: 1234,
      tnxStamp: format(new Date(), 'dd/MM/yyyy HH:mm:ss'),
      branchName: "Chi nhánh 1",
      merchantCashierCode: "Quầy 1",
      accountNo: "123456789",
      amount: 20000000,
      responseCode: "00"
    }
  ]

  const sessionUser = AuthService.getCurrentUser()
  const userType = sessionUser ? sessionUser.targetType : 'CASHIER';

  const totalPages = 10;
  const size = 10;

  // Call api get data

  const handleChangeStatus = (e) => {
    console.log(e.target.value)
    setStatus(e.target.value);
  }

  const handleSearch = async () => {
    const paging = {
      page: 0,
      size: size,
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
    ReportServices.get(apiUrl, paging, filtersInput).then(
      (res) => {
        const { status, data } = res
        if (status !== 200) console.log('Có lỗi trong quá trình lấy dữ liệu')
        const content = data.content;
        if (content.length === 0) console.log('Không có dữ liệu')
      }
    ).catch(

    )
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
              <Table bordered hover>
                <thead>
                  <tr>
                    {rowHeader.map((row, index) => {
                      return (<th key={index}>{row}</th>)
                    })}
                  </tr>
                </thead>
                <tbody>
                  {dataFake.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td style={{ cursor: "pointer" }}>{item.id}</td>
                        <td>{item.tnxStamp}</td>
                        <td>{item.branchName}</td>
                        <td>{item.merchantCashierCode}</td>
                        <td>{item.accountNo}</td>
                        <td>{new Intl.NumberFormat('en-US').format(item.amount)}</td>
                        <td>
                          {
                            item.responseCode === "00" ?
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