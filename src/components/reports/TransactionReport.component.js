import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, FormGroup, Label, Input, Button, Alert } from 'reactstrap'
import format from 'date-fns/format';
import AuthService from '../../services/Auth.service';
import ReportServices from './ReportServices';
import '../../stylesheet/TableControl.css'
import '../../stylesheet/TextControl.css'
import { TransactionDetailModal } from './ReportModal.component';
import { TransactionTable, TablePagination } from './TransactionTable';
import { DefaultSpinner } from './ReportServices';

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
  const rowHeader = ["STT", "Mã giao dịch", "Thời gian giao dịch", "Chi nhánh", "Quầy", "Ngân hàng phát lệnh", "Số tài khoản KH", "Số tiền", "Thông tin chuyển khoản", "Trạng thái"]
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
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [cardNo, setCardNo] = useState('')
  const handleOpenModal = (data) => {
    setModalData({ ...data, merchantName: merchantName })
    setOpenModal(!openModal)
  }
  useEffect(() => {
    if (targetType === 'MERCHANT') {
      setDisableCashier(true)
      ReportServices.getWithoutPaginating('/merchantweb/api/TblMerchantBranch/branchByMerchant')
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
    if (targetType !== 'CASHIER') {
      ReportServices.getWithoutPaginating(`/merchantweb/api/TblMerchantCashier/cashierByBranch?branchId=${branchId}`)
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
      sort: 'id,desc'
    }

    const filtersInput = {
      merchantId: merchantId,
      branchId: branchId,
      cashierId: cashierId,
      status: status,
      dateTimeBegin: fromDate,
      dateTimeEnd: toDate,
      fromAmount: ReportServices.formatNumberToString(fromAmount),
      toAmount: ReportServices.formatNumberToString(toAmount),
      cardNo: cardNo
    }

    setLoading(true)
    ReportServices.get(`/merchantweb/api/HisPayment/`, paging, filtersInput).then(
      (res) => {
        const { data } = res
        const { content, totalPages } = data
        setTotalPage(totalPages)
        setData(content)
      }
    ).catch(
      (e) => { throw new Error(e) }
    ).finally(
      setLoading(false)
    )
  }
  useEffect(() => {
    getTransactions()
  }, [page])

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     getTransactions()
  //   }, 20000);
  //   return () => clearInterval(interval);
  // }, [])

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
  const handleChangeFromAmount = (e) => {
    setFromAmount(ReportServices.formatStringToNumber(e.target.value))
  }
  const handleChangeToAmount = (e) => {
    setToAmount(ReportServices.formatStringToNumber(e.target.value))
  }
  const handleChangeCardNumber = (e) => {
    setCardNo(e.target.value)
  }
  return (
    <>

      {/* Tìm kiếm */}

      <Container fluid>
        <Row>
          <Col>
            <Card className='mt-0'>
              <Row>
                <Col xs={12} sm={12} md={4} lg={4}>
                  <FormGroup row style={{ alignItems: 'center' }} className='transaction-modal-form-group'>
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
                      <FormGroup row style={{ alignItems: 'center' }} className='transaction-modal-form-group'>
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
                      <FormGroup row style={{ alignItems: 'center' }} className='transaction-modal-form-group'>
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
                  <FormGroup row style={{ alignItems: 'center' }} className='transaction-modal-form-group'>
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
                  <FormGroup row style={{ alignItems: 'center' }} className='transaction-modal-form-group'>
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
                  <FormGroup row style={{ alignItems: 'center' }} className='transaction-modal-form-group'>
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

                <Col xs={12} sm={12} md={4} lg={4}>
                  <FormGroup row style={{ alignItems: 'center' }} className='transaction-modal-form-group'>
                    <Label
                      for="exampleEmail"
                      sm={4} xs={4} md={5} lg={4}
                    >
                      Số tiền: Từ
                    </Label>

                    <Col sm={8} xs={8} md={7} lg={8}>
                      <Input
                        id="fromAmount"
                        name="fromAmount"
                        type="text"
                        value={fromAmount}
                        onChange={handleChangeFromAmount}
                      />
                    </Col>
                  </FormGroup>
                </Col>
                <Col xs={12} sm={12} md={4} lg={4}>
                  <FormGroup row style={{ alignItems: 'center' }} className='transaction-modal-form-group'>
                    <Label
                      for="exampleEmail"
                      sm={4} xs={4} md={5} lg={4}
                    >
                      Đến
                    </Label>

                    <Col sm={8} xs={8} md={7} lg={8}>
                      <Input
                        id="toAmount"
                        name="toAmount"
                        type="text"
                        value={toAmount}
                        onChange={handleChangeToAmount}
                      />
                    </Col>
                  </FormGroup>
                </Col>
                <Col xs={12} sm={12} md={4} lg={4}>
                  <FormGroup row style={{ alignItems: 'center' }} className='transaction-modal-form-group'>
                    <Label
                      for="exampleEmail"
                      sm={4} xs={4} md={5} lg={4}
                    >
                      Số tài khoản
                    </Label>

                    <Col sm={8} xs={8} md={7} lg={8}>
                      <Input
                        id="fromAmount"
                        name="fromAmount"
                        type="text"
                        value={cardNo}
                        onChange={handleChangeCardNumber}
                      />
                    </Col>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col xs={12} sm={12} md={4} lg={4}>
                  <Button
                    color="primary"
                    onClick={handleSearch}
                    className='btn-search-transaction'
                  >
                    Tìm kiếm
                  </Button></Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {loading ? <DefaultSpinner /> : totalPage === 0 ? <Alert color="warning">Không tìm thấy kết quả!</Alert> :
          <Row>
            <Col>
              <Card className='mt-0'>
                <Row>
                  <Col xl={4} lg={6} md={8} className="control-col-r3">
                    <TablePagination totalPage={totalPage} handleChangePage={handleChangePage} />
                  </Col>
                </Row>

                <TransactionTable rowHeader={rowHeader} data={data} handleOpenModal={handleOpenModal} page={page} pageSize={size} />

              </Card>
            </Col >
          </Row >
        }
      </Container>

      <TransactionDetailModal isOpen={openModal} toggle={handleOpenModal} data={modalData} />
    </>

  )
}

export default TransactionReport