import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, FormGroup, Label, Input, Button } from 'reactstrap'
import format from 'date-fns/format';
import AuthService from '../../services/Auth.service';
import ReportServices from './ReportServices';
import '../../stylesheet/TableControl.css'
import '../../stylesheet/TextControl.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import FileDownload from 'js-file-download';
import EventBus from '../../common/EventBus';
import ServiceAlert from "../../common/ServiceAlert";

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

  const reportTypes = [{ id: 1, name: 'Báo cáo chi tiết' }, { id: 2, name: 'Báo cáo tổng hợp' }]
  const sessionUser = AuthService.getCurrentUser()
  const { targetType, merchantName, branchName, cashierCode } = sessionUser
  const curr = new Date();
  curr.setDate(curr.getDate());
  const currentDate = curr.toISOString().substring(0, 10);
  const firstDateOfMonth = format(curr, 'yyyy-MM-01')
  const [personal, setPersonal] = useState(targetType === 'PERSONAL')
  const [fromDate, setFromDate] = useState(`${firstDateOfMonth}T00:00`)
  const [toDate, setToDate] = useState(`${currentDate}T23:59`)
  const [loading, setLoading] = useState(false)
  const [merchant, setMerchant] = useState(merchantName ? [{ code: "", name: merchantName }] : selectBoxInitialvalue)
  const [branch, setBranch] = useState(branchName ? [{ code: "", name: branchName }] : selectBoxInitialvalue)
  const [cashier, setCashier] = useState(cashierCode ? [{ code: "", name: cashierCode }] : selectBoxInitialvalue)
  const [merchantId, setMerchantId] = useState("")
  const [branchId, setBranchId] = useState("")
  const [selectedBranchName, setSelectedBranchName] = useState(branchName ? branchName : 'Tất cả')
  const [selectedCashierCode, setSelectedCashierCode] = useState(cashierCode ? cashierCode : 'Tất cả')
  const [cashierId, setCashierId] = useState("")
  const [disableMerchant, setDisableMerchant] = useState(userTypes.MERCHANT.includes(targetType))
  const [disableBranch, setDisableBranch] = useState(userTypes.BRANCH.includes(targetType))
  const [disableCashier, setDisableCashier] = useState(userTypes.CASHIER.includes(targetType))
  const [status, setStatus] = useState("")
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [cardNo, setCardNo] = useState('')
  const [reportTypeId, setReportTypeId] = useState(1)
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
    if (targetType !== 'CASHIER' && branchId) {
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
    const reportName = reportTypeId === 1 ? 'Báo cáo chi tiết' : 'Báo cáo tổng hợp'

    const filtersInput = {
      merchantId: merchantId,
      branchId: branchId,
      cashierId: cashierId,
      status: status,
      dateTimeBegin: fromDate,
      dateTimeEnd: toDate,
      fromAmount: ReportServices.formatNumberToString(fromAmount),
      toAmount: ReportServices.formatNumberToString(toAmount),
      cardNo: cardNo,
      merchantName: merchantName,
      branchName: selectedBranchName,
      cashierName: selectedCashierCode,
      type: reportTypeId
    }

    ReportServices.exportExcel(filtersInput)
      .then(
        response => {
          const { status, data } = response
          if (status === 200) {
            const fileNameHeader = "x-suggested-filename";
            const suggestedFileName = response.headers[fileNameHeader];
            const effectiveFileName = (suggestedFileName === undefined
              ? `${reportName}.xlsx`
              : suggestedFileName);

            FileDownload(data, effectiveFileName);
          }
          else if (status === 401) {
            EventBus.dispatch("logout");
          } else {
            ServiceAlert.error("Lỗi", 'Không lấy được dữ liệu từ server');
          }
        }
      )
      .catch((e) => { ServiceAlert.error("Lỗi", e.message); })
      .finally()
  }

  const handleChangeMerchant = (e) => { setMerchantId(e.target.value) }
  const handleChangeBranch = (e) => {
    let selected = e.target.value ? branch.find(x => x.id === Number(e.target.value)).name : 'Tất cả'
    setSelectedBranchName(selected)

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
  const handleChangeCashier = (e) => {
    let selected = e.target.value ? cashier.find(x => x.id === Number(e.target.value)).name : 'Tất cả'
    setSelectedCashierCode(selected)
    setCashierId(e.target.value)
  }
  const handleChangeStatus = (e) => { setStatus(e.target.value) }
  const handleFromdate = (e) => { setFromDate(e.target.value) }
  const handleToDate = (e) => { setToDate(e.target.value) }
  const handleExport = () => { getTransactions() }
  const handleChangeFromAmount = (e) => { setFromAmount(ReportServices.formatStringToNumber(e.target.value)) }
  const handleChangeToAmount = (e) => { setToAmount(ReportServices.formatStringToNumber(e.target.value)) }
  const handleChangeCardNumber = (e) => { setCardNo(e.target.value) }
  const handleChangeReportType = (e) => { setReportTypeId(e.target.value) }

  return (
    <>
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
                  <FormGroup row style={{ alignItems: 'center' }} className='transaction-modal-form-group'>
                    <Label for="exampleEmail" sm={4} xs={4} md={5} lg={4}>Loại báo cáo</Label>
                    <Col sm={8} xs={8} md={7} lg={8}>
                      <Input
                        id="statusSelect"
                        name="statusSelect"
                        type="select"
                        value={reportTypeId}
                        onChange={handleChangeReportType}
                      >
                        {reportTypes.map((s, index) => {
                          return (
                            <option value={s.id} key={index}>{s.name}</option>
                          )
                        })}
                      </Input>
                    </Col>
                  </FormGroup>
                </Col>
                <Col xs={12} sm={12} md={4} lg={4}>
                  <Button color="success" onClick={handleExport} className='btn-search-transaction'>Export <span><FontAwesomeIcon icon={faFileExcel} /></span></Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default TransactionReport