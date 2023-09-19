import React, { useEffect, useState, Suspense } from 'react'
import { Switch, Route, Link } from "react-router-dom";
import { Container, Row, Col, Card, FormGroup, Label, Input, Button, Table, Badge, Spinner, Alert } from 'reactstrap'
import ReactPaginate from 'react-paginate';
import format from 'date-fns/format';
import axios from 'axios';
import AuthService from '../../services/Auth.service';
import ReportServices from './ReportServices';
import authHeader from '../../services/auth-header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import '../../stylesheet/TableControl.css'
import '../../stylesheet/TextControl.css'
import { TransactionDetailModal } from './ReportModal.component';

function TransactionReport() {
  const selectBoxInitialvalue = [{ id: "", name: 'Tất cả' }]
  const userTypes = {
    MERCHANT: ['PERSONAL', 'MERCHANT', 'BRANCH', 'CASHIER'],
    BRANCH: ['BRANCH', 'CASHIER'],
    CASHIER: ['CASHIER']
  }
  const transactionStatus = [
    {
      name: "Tất cả",
      id: ""
    },
    {
      name: "Thành công",
      id: "SUCCESS"
    },
    {
      name: "Không thành công",
      id: "FAILURE"
    },
    {
      name: "Đang xử lý",
      id: "TIMEOUT"
    }
  ]

  const sessionUser = AuthService.getCurrentUser()
  const { targetType, merchantName, branchName, cashierCode } = sessionUser
  const rowHeader = ["STT", "Mã giao dịch", "Thời gian giao dịch", "Chi nhánh", "Quầy", "Ngân hàng phát lệnh", "Số tiền", "Trạng thái"]
  const size = 10;
  const curr = new Date();
  curr.setDate(curr.getDate());
  const currentDate = curr.toISOString().substring(0, 10);
  const firstDateOfMonth = format(curr, 'yyyy-MM-01')
  const [personal, setPersonal] = useState(targetType === 'PERSONAL')
  const [fromDate, setFromDate] = useState(`${firstDateOfMonth}T00:00`)
  const [toDate, setToDate] = useState(`${currentDate}T23:59`)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [merchant, setMerchant] = useState(merchantName ? [{ code: "", name: merchantName }] : selectBoxInitialvalue)
  const [branch, setBranch] = useState(branchName ? [{ code: "", name: branchName }] : selectBoxInitialvalue)
  const [cashier, setCashier] = useState(cashierCode ? [{ code: "", name: cashierCode }] : selectBoxInitialvalue)
  const [merchantId, setMerchantId] = useState("")
  const [branchId, setBranchId] = useState("")
  const [cashierId, setCashierId] = useState("")
  const [totalPage, setTotalPage] = useState(0)
  const [disableMerchant, setDisableMerchant] = useState(userTypes.MERCHANT.includes(targetType))
  const [disableBranch, setDisableBranch] = useState(userTypes.BRANCH.includes(targetType))
  const [disableCashier, setDisableCashier] = useState(userTypes.CASHIER.includes(targetType))
  const [status, setStatus] = useState("")
  const [data, setData] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [modalData, setModalData] = useState({})
  const handleOpenModal = (data) => {
    setModalData({ ...data, merchantName: merchantName })
    setOpenModal(!openModal)
  }
  useEffect(() => {
    if (targetType === 'MERCHANT') {
      setDisableCashier(true)
      axios.get('/merchantweb/api/TblMerchantBranch/branchByMerchant', { headers: authHeader() })
        .then(
          (res) => {
            const listBranch = res.data.length > 0 ? res.data.map((item) => { return { id: item.id, name: item.branchName } }) : []
            listBranch.unshift(selectBoxInitialvalue[0])
            setBranch(listBranch)
          }
        ).catch((e) => { throw new Error(e) })
    }

  }, [merchantId])

  useEffect(() => {
    // Get list cashier
    if (targetType !== 'CASHIER' && branchId) {
      axios.get(`/merchantweb/api/TblMerchantCashier/cashierByBranch?branchId=${branchId}`, { headers: authHeader() })
        .then(
          (res) => {
            const listCashier = res.data.length > 0 ? res.data.map((item) => { return { id: item.id, name: item.cashierCode } }) : []
            listCashier.unshift(selectBoxInitialvalue[0])
            setDisableCashier(false)
            setCashier(listCashier)
          }
        ).catch((e) => { throw new Error(e) })
    }
  }, [branchId])

  const getTransactions = () => {
    const paging = {
      page: page,
      size: size,
      sort: 'id,asc'
    }

    const filtersInput = {
      merchantId: merchantId,
      branchId: branchId,
      cashierId: cashierId,
      status: status,
      dateTimeBegin: fromDate,
      dateTimeEnd: toDate
    }

    setLoading(true)
    ReportServices.get(`/merchantweb/api/HisPayment/`, paging, filtersInput).then(
      (res) => {
        const { status, data } = res
        if (status !== 200) console.log('Có lỗi trong quá trình lấy dữ liệu')
        const { content, totalPages } = data
        setTotalPage(totalPages)
        if (content.length === 0) console.log('Không có dữ liệu')
        setData(content)
      }
    ).catch(
      (e) => { console.log(e) }
    ).finally(
      setLoading(false)
    )
  }
  useEffect(() => {
    // Get transactions
    getTransactions()
  }, [page])

  const handleChangePage = (e) => { setPage(e.selected) }
  const handleChangeMerchant = (e) => { setMerchantId(e.target.value) }
  const handleChangeBranch = (e) => {
    if (!e.target.value) {
      // Nếu branch đổi sang tất cả -> set giá trị của cashier sang tất cả
      setCashierId("")
      setCashier(selectBoxInitialvalue)
      setDisableCashier(true)
    }
    else {
      setDisableCashier(false)
    }
    setBranchId(e.target.value)
  }
  const handleChangeCashier = (e) => { setCashierId(e.target.value) }
  const handleChangeStatus = (e) => { setStatus(e.target.value) }
  const handleFromdate = (e) => { setFromDate(e.target.value) }
  const handleToDate = (e) => { setToDate(e.target.value) }
  const handleSearch = () => { getTransactions() }

  if (loading) return <Spinner />
  return (
    <>
      <Suspense fallback={<Spinner />}>
        {/* Tìm kiếm */}
        <Container fluid>
          <Row>
            <Col>
              <Card className='mt-0'>
                <Row>
                  <Col xs={12} sm={12} md={4} lg={4}>
                    <FormGroup row style={{ alignItems: 'center' }}>
                      <Label for="exampleEmail" sm={4} xs={4} md={5} lg={4}>Merchant</Label>
                      <Col sm={8} xs={8} md={7} lg={8}>
                        <Input
                          id="exampleSelect"
                          name="select"
                          type="select"
                          disabled={disableMerchant}
                          defaultValue={merchantId}
                          onChange={handleChangeMerchant}
                        >
                          {merchant.map((item, index) => <option value={item.id} key={index}>{item.name}</option>)}
                        </Input>
                      </Col>
                    </FormGroup>
                  </Col>
                  {!personal ?
                    <>
                      <Col xs={12} sm={12} md={4} lg={4}>
                        <FormGroup row style={{ alignItems: 'center' }}>
                          <Label for="exampleEmail" sm={4} xs={4} md={5} lg={4}>Branch</Label>
                          <Col sm={8} xs={8} md={7} lg={8}>
                            <Input
                              id="exampleSelect"
                              name="select"
                              type="select"
                              disabled={disableBranch}
                              defaultValue={branchId}
                              onChange={handleChangeBranch}
                            >
                              {branch.map((item, index) => <option value={item.id} key={index}>{item.name}</option>)}
                            </Input>
                          </Col>
                        </FormGroup>
                      </Col>
                      <Col xs={12} sm={12} md={4} lg={4}>
                        <FormGroup row style={{ alignItems: 'center' }}>
                          <Label
                            for="exampleEmail"
                            sm={4} xs={4} md={5} lg={4}
                          >
                            Cashier
                          </Label>

                          <Col sm={8} xs={8} md={7} lg={8}>
                            <Input
                              id="exampleSelect"
                              name="select"
                              type="select"
                              disabled={disableCashier}
                              defaultValue={cashierId}
                              onChange={handleChangeCashier}
                            >
                              {cashier.map((item, index) => <option value={item.id} key={index}>{item.name}</option>)}
                            </Input>
                          </Col>
                        </FormGroup>
                      </Col>
                    </> : <></>
                  }
                  <Col xs={12} sm={12} md={4} lg={4}>
                    <FormGroup row style={{ alignItems: 'center' }}>
                      <Label
                        for="fromDate"
                        sm={4} xs={4} md={5} lg={4}
                      >
                        Từ ngày
                      </Label>
                      <Col sm={8} xs={8} md={7} lg={8}>
                        <Input
                          id="fromDate"
                          name="fromDate"
                          placeholder="Từ ngày"
                          type="datetime-local"
                          value={fromDate}
                          onChange={handleFromdate}
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4}>
                    <FormGroup row style={{ alignItems: 'center' }}>
                      <Label
                        for="toDate"
                        sm={4} xs={4} md={5} lg={4}
                      >
                        Đến ngày
                      </Label>
                      <Col sm={8} xs={8} md={7} lg={8}>
                        <Input
                          id="toDate"
                          name="toDate"
                          placeholder="tới ngày"
                          type="datetime-local"
                          value={toDate}
                          onChange={handleToDate}
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4}>
                    <FormGroup row style={{ alignItems: 'center' }}>
                      <Label
                        for="exampleEmail"
                        sm={4} xs={4} md={5} lg={4}
                      >
                        Trạng thái
                      </Label>

                      <Col sm={8} xs={8} md={7} lg={8}>
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
                  <Col xs={12} sm={12} md={4} lg={4}>
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

          {totalPage === 0 ? <Alert color="warning">Không tìm thấy kết quả!</Alert> :
            <Row>
              <Col>
                <Card className='mt-0'>
                  {/* Phân trang */}
                  <Row>
                    <Col xl={4} lg={6} md={8} className="control-col-r3">
                      <ReactPaginate
                        previousLabel={'Trước'}
                        nextLabel={'Sau'}
                        pageCount={totalPage}
                        onPageChange={handleChangePage}
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
                  <Table className="align-items-center small-font-table"
                    bordered
                    striped
                    hover
                    responsive
                  >
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
                            <td style={{ cursor: "pointer", color: "blue" }} className="align-middle no-wrap-box" onClick={() => handleOpenModal(item)}>{item.paymentReference.substring(0, 10).concat('...')}</td>
                            <td>{item.tnxStamp}</td>
                            <td>{item.merchantBranchName}</td>
                            <td>{item.merchantCashierCode}</td>
                            <td>{item.acqName}</td>
                            <td>{new Intl.NumberFormat('en-US').format(item.amount)}</td>
                            <td>
                              {
                                item.responseCode === "00" ?
                                  <Badge color="success" pill >Thành công</Badge>
                                  :
                                  item.responseCode === "68" ?
                                    <Badge color="warning" pill >Đang xử lý</Badge>
                                    :
                                    <Badge color="danger" pill >Không thành công</Badge>
                              }
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </Card>
              </Col >

            </Row >
          }
        </Container>
      </Suspense>

      <TransactionDetailModal isOpen={openModal} toggle={handleOpenModal} data={modalData} />
    </>

  )
}

export default TransactionReport