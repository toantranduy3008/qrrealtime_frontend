import React, { useEffect, useState } from 'react'
// import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, FormGroup, Label, Input, Button, Table, Badge } from 'reactstrap'
import ReactPaginate from 'react-paginate';
import format from 'date-fns/format';
import axios from 'axios';
import AuthService from '../../services/Auth.service';
import ReportServices from './ReportServices';
import authHeader from '../../services/auth-header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'


function TransactionReport() {
  const userTypes = {
    MERCHANT: ['MERCHANT', 'BRANCH', 'CASHIER'],
    BRANCH: ['BRANCH', 'CASHIER'],
    CASHIER: ['CASHIER']
  }
  const sessionUser = AuthService.getCurrentUser()
  const sessionUserType = sessionUser ? sessionUser.targetType : 'CASHIER';
  const merchantName = sessionUser ? sessionUser.merchantName : 'TEST'
  const branchName = sessionUser ? sessionUser.branchName : 'TEST'
  const cashierInfo = sessionUser ? sessionUser.cashierCode : { id: 0, cashierCode: "TEST" }
  const rowHeader = ["STT", "", "Thời gian giao dịch", "Branch", "Quầy", "Tài khoản KH", "Số tiền", "Trạng thái"]
  let totalPages = 10;
  const size = 10;


  let curr = new Date();
  curr.setDate(curr.getDate());
  let currentDate = curr.toISOString().substring(0, 10);
  // Select options
  const transactionStatus = [
    {
      name: "Tất cả",
      id: ""
    },
    {
      name: "Thành công",
      id: "0"
    },
    {
      name: "Không thành công",
      id: "1"
    }
  ]
  // State
  const [disableMerchant, setDisableMerchant] = useState(userTypes.MERCHANT.includes(sessionUserType))
  const [disableBranch, setDisableBranch] = useState(userTypes.BRANCH.includes(sessionUserType))
  const [disableCashier, setDisableCashier] = useState(userTypes.CASHIER.includes(sessionUserType))
  const [status, setStatus] = useState("")
  const [merchantId, setMerchantId] = useState("")
  const [branchId, setBranchId] = useState("")
  const [cashierId, setCashierId] = useState("")
  const [fromDate, setFromDate] = useState(currentDate)
  const [toDate, setToDate] = useState(currentDate)
  const [merchant, setMerchant] = useState([{ code: "", name: merchantName }])
  const [branch, setBranch] = useState([{ code: "", name: branchName }])

  const apiList = {
    getBranch: 'api/TblMerchantBranch/branchByMerchant',
    getCashier: `api/TblMerchantCashier/cashierByBranch?branchId=${branchId}`,
    getTransaction: ''
  }
  // const [cashier, setCashier] = useState([{ code: cashierInfo.id, name: cashierInfo.cashierCode }])
  const [cashier, setCashier] = useState([{ code: 1, name: "TEST" }])
  const [data, setData] = useState([{
    tnxStamp: "01/01/2020",
    branchName: "Chi nhánh 1",
    merchantCashierCode: "01",
    accountNo: "123456",
    amount: 200000,
    responseCode: "68",
    id: 1
  }, {
    tnxStamp: "01/01/2020",
    branchName: "Chi nhánh 1",
    merchantCashierCode: "01",
    accountNo: "123456",
    amount: 200000,
    responseCode: "68",
    id: 2
  }])


  // Call api get data

  // useEffect(() => {
  //   // Get list branch
  //   axios.get(`${apiList.getBranch}?merchantId=${merchantId}`, { headers: authHeader() })
  //     .then(
  //       (res) => {
  //         const { status, data } = res
  //         if (status !== 200) console.log('Lỗi k lấy được danh sách branch')
  //         setBranch([...branch, data])
  //       }
  //     ).catch((e) => { throw new Error(e) })
  // }, [])


  // useEffect(() => {
  //   // Get list cashier
  //   axios.get(`${apiList.getCashier}?branchId=${branchId}`, { headers: authHeader() })
  //     .then(
  //       (res) => {
  //         const { status, data } = res
  //         if (status !== 200) console.log('Lỗi k lấy được danh sách branch')
  //         setCashier([...cashier, data])
  //       }
  //     ).catch((e) => { throw new Error(e) })
  // }, [])

  // useEffect(() => {
  //   // Get transactions
  //   const paging = {
  //     page: 0,
  //     size: size,
  //     sort: 'id, asc'
  //   }

  //   const filtersInput = {
  //     merchantId: merchantId,
  //     cashierId: cashierId,
  //     transactionStatus: status,
  //     fromDate: fromDate,
  //     toDate: toDate
  //   }

  //   ReportServices.get(apiList.getTransaction, paging, filtersInput).then(
  //     (res) => {
  //       const { status, data } = res
  //       if (status !== 200) console.log('Có lỗi trong quá trình lấy dữ liệu')
  //       const content = data.content;
  //       if (content.length === 0) console.log('Không có dữ liệu')
  //       setData(content)
  //     }
  //   ).catch(

  //   )
  // }, [])

  const handleChangeMerchant = (e) => { setMerchantId(e.target.value) }
  const handleChangeBranch = (e) => { setBranchId(e.target.value) }
  const handleChangeCashier = (e) => { setCashierId(e.target.value) }
  const handleChangeStatus = (e) => { setStatus(e.target.value) }
  const handleFromdate = (e) => {
    setFromDate(e.target.value)
  }
  const handleToDate = (e) => { setToDate(e.target.value) }
  const handleSearch = async () => {
    console.log(`From Date: ${fromDate}`)
    console.log(`To Date: ${toDate}`)
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
                        defaultValue={merchantId}
                      >
                        {merchant.map((item, index) => <option value={item.code} key={index}>{item.name}</option>)}
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
                        defaultValue={branchId}

                      >
                        {branch.map((item, index) => <option value={item.code} key={index}>{item.name}</option>)}
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
                        defaultValue={cashierId}
                      >
                        {cashier.map((item, index) => <option value={item.code} key={index}>{item.name}</option>)}
                      </Input>
                    </Col>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col xs={4}>
                  <FormGroup row>
                    <Label
                      for="fromDate"
                      sm={4}
                    >
                      Từ ngày
                    </Label>
                    <Col sm={8}>
                      <Input
                        id="fromDate"
                        name="fromDate"
                        placeholder="Từ ngày"
                        type="date"
                        value={fromDate}
                        onChange={handleFromdate}
                      />
                    </Col>
                  </FormGroup>
                </Col>
                <Col xs={4}>
                  <FormGroup row>
                    <Label
                      for="toDate"
                      sm={4}
                    >
                      Đến ngày
                    </Label>
                    <Col sm={8}>
                      <Input
                        id="toDate"
                        name="toDate"
                        placeholder="tới ngày"
                        type="date"
                        value={toDate}
                        onChange={handleToDate}
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
                            <option value={s.id} key={index}>{s.name}</option>
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
                  {data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td style={{ cursor: "pointer" }}><FontAwesomeIcon icon={faCircleInfo} style={{ color: "#4b1dc9", }} /></td>
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