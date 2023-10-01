import { Container, Row, Col, Input, FormGroup, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useEffect, useState } from 'react';
import './Report.css'
import ReportServices from './ReportServices'
import ServiceAlert from '../../common/ServiceAlert';
import { DefaultSpinner } from './ReportServices';
import AuthService from '../../services/Auth.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircle, faQrcode } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import authHeader from '../../services/auth-header';

export const TransactionDetailModal = ({ isOpen, toggle, data }) => {
    const { paymentReference, tnxStamp, merchantName, merchantBranchName, merchantCashierCode, acqName, cardNo, addInfo, amount, ibftInfo, responseCode } = data
    return (
        <>
            <Modal isOpen={isOpen} toggle={toggle} size='lg' centered scrollable={true} className='transaction-report-modal'>
                <ModalHeader toggle={toggle} className='transaction-detail-modal-header'>Thông tin giao dịch</ModalHeader>
                <ModalBody>
                    <Container fluid>
                        <Row>
                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }} className='transaction-modal-form-group boder-bottom-solid '>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Mã giao dịch</Label>
                                    <Col sm={8}>
                                        <Input className='modal-input ' readOnly id="statusSelect" name="statusSelect" type="text" value={paymentReference} disabled />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }} className='transaction-modal-form-group boder-bottom-solid'>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Thời gian giao dịch</Label>
                                    <Col sm={8}>
                                        <Input readOnly id="statusSelect" name="statusSelect" type="text" value={tnxStamp} className='modal-input' disabled />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }} className='transaction-modal-form-group boder-bottom-solid'>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Merchant</Label>
                                    <Col sm={8}>
                                        <Input readOnly id="statusSelect" name="statusSelect" type="text" value={merchantName} className='modal-input' disabled />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }} className='transaction-modal-form-group boder-bottom-solid'>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Chi nhánh</Label>
                                    <Col sm={8}>
                                        <Input readOnly id="statusSelect" name="statusSelect" type="text" value={merchantBranchName ? merchantBranchName : ''} className='modal-input' disabled />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }} className='transaction-modal-form-group boder-bottom-solid'>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Quầy</Label>
                                    <Col sm={8}>
                                        <Input readOnly id="statusSelect" name="statusSelect" type="text" value={merchantCashierCode ? merchantCashierCode : ''} className='modal-input' disabled />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }} className='transaction-modal-form-group boder-bottom-solid'>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Ngân hàng PL</Label>
                                    <Col sm={8}>
                                        <Input readOnly id="statusSelect" name="statusSelect" type="text" value={acqName} className='modal-input' disabled />
                                    </Col>
                                </FormGroup>
                            </Col>

                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }} className='transaction-modal-form-group boder-bottom-solid'>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Tài khoản KH</Label>
                                    <Col sm={8}>
                                        <Input readOnly id="statusSelect" name="statusSelect" type="text" value={cardNo} className='modal-input' disabled />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }} className='transaction-modal-form-group boder-bottom-solid'>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Tên KH</Label>
                                    <Col sm={8}>
                                        <Input readOnly id="statusSelect" name="statusSelect" type="text" value={addInfo} className='modal-input' disabled />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }} className='transaction-modal-form-group boder-bottom-solid'>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Số tiền</Label>
                                    <Col sm={8}>
                                        <Input readOnly id="statusSelect" name="statusSelect" type="text" value={new Intl.NumberFormat('en-US').format(amount)} className='modal-input' disabled />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }} className='transaction-modal-form-group boder-bottom-solid'>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Thông tin chuyển khoản</Label>
                                    <Col sm={8}>
                                        <Input readOnly id="statusSelect" name="statusSelect" type="text" value={ibftInfo} className='modal-input' disabled />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }} className='transaction-modal-form-group boder-bottom-solid'>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Trạng thái giao dịch</Label>
                                    <Col sm={8}>
                                        <Input readOnly id="statusSelect" name="statusSelect" type="text" value={responseCode === '00' ? 'Thành công' : responseCode === '68' ? 'Đang xử lý' : `${responseCode} - Không thành công`} className='modal-input' disabled />
                                    </Col>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Container>
                </ModalBody>
                {/* <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Đóng</Button>
                </ModalFooter> */}
            </Modal>
        </>
    )
}

export const GenerateQRCodeModal = ({ isOpen, toggle }) => {
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [imgSource, setImgSource] = useState('/merchantweb/images/qrcode.png')
    const [loading, setLoading] = useState(false)
    const [isPayment, setIsPayment] = useState(false)
    const [createdQR, setCreatedQR] = useState(false)
    const [orderCode, setOrderCode] = useState('')
    let intervalIdStorage = []
    useEffect(() => {
        const interval = setInterval(() => {
            if (orderCode) {
                handlePayment(orderCode)
            }

        }, 3000);

        intervalIdStorage.push(interval)
        return () => clearInterval(interval);
    }, [orderCode])

    const handleGenerateQRCode = () => {
        const randomString = ReportServices.generateRandomString(7)
        setOrderCode(randomString)
        const sessionUser = AuthService.getCurrentUser()
        const { targetType } = sessionUser
        if (targetType !== 'PERSONAL' && targetType !== 'CASHIER') {
            ServiceAlert.error('Lỗi', 'Bạn không có quyền tạo mã QR.')
            return
        }

        if (!amount || !description || parseInt(amount, 10) === 0) {
            ServiceAlert.error('Lỗi', 'Không được để trống số tiền hoặc nội dung chuyển tiền.')
            return
        }

        const qrAmount = ReportServices.formatNumberToString(amount)
        if (qrAmount < 2000) {
            ServiceAlert.error('Lỗi', 'Số tiền phải lớn hơn 2,000.')
            return
        }
        setLoading(true)
        setCreatedQR(false)
        ReportServices.genQRCode(`/merchantweb/api/VietQR/generateQRCodeCashier?amount=${qrAmount}&description=${description}&orderCode=${randomString}`)
            .then(
                res => {
                    const { status, data } = res
                    if (status !== 200) {
                        ServiceAlert.error('Lỗi', 'Bạn không có quyền tạo mã QR.')
                        return
                    }

                    const url = URL.createObjectURL(data)
                    setImgSource(url)
                    setCreatedQR(true)
                    handlePayment(orderCode);
                }
            )
            .catch((error) => {
                ServiceAlert.error('Lỗi', 'Không tạo được mã QR.')
            })
            .finally(
                setLoading(false)
            )
    }
    const handleChangeAmount = (e) => {
        setAmount(ReportServices.formatStringToNumber(e.target.value))
    }
    const handleChangeDescription = (e) => {
        setDescription(ReportServices.formatTransferDescription(e.target.value))
    }
    const handleCloseModal = () => {
        resetAllState()
        clearAllInterval(intervalIdStorage)
    }

    const handlePayment = (orderCode) => {
        if (orderCode) {
            axios.get(`/merchantweb/api/PaymentQR/getPaymentStatus?orderCode=${orderCode}`, { headers: authHeader() })
                .then(res => {
                    console.log(1)
                    const { data } = res
                    if (Object.keys(data).length > 0) setIsPayment(true)
                    clearAllInterval(intervalIdStorage)
                    if (orderCode === data.orderCode) {
                        setTimeout(() => {
                            toggle()
                            console.log(2)
                        }, 5000)
                    }
                })
                .catch(e => {
                    throw new Error(e.message)
                })
                .finally()
        }

    }

    const resetAllState = () => {
        setAmount('')
        setDescription('')
        setImgSource('/merchantweb/images/qrcode.png')
        setIsPayment(false)
        setCreatedQR(false)
        setOrderCode('')
    }

    const clearAllInterval = (list) => {
        for (let i = 0; i < list.length; i++) {
            clearInterval(list[i])
        }
    }
    return (
        <>
            <Modal isOpen={isOpen} toggle={toggle} size='md' centered scrollable={true} onClosed={handleCloseModal} className='transaction-report-modal'>
                <ModalHeader toggle={toggle} className='transaction-detail-modal-header'>Thông tin QR</ModalHeader>
                <ModalBody>
                    <Container fluid>
                        <Row>
                            <Col xs={7} sm={7} md={7} lg={7} >
                                {/* Thông tin */}
                                <FormGroup row style={{ alignItems: 'center', marginBottom: '15px' }} className='transaction-modal-form-group'>
                                    <Label for="exampleEmail" sm={12} className='label-model'>Số tiền</Label>
                                    <Col sm={12}>
                                        <Input placeholder='Số tiền' id="statusSelect" name="statusSelect" type="text" value={amount} onChange={handleChangeAmount} maxLength={11} />
                                    </Col>
                                </FormGroup>

                                <FormGroup row style={{ alignItems: 'center' }} className='transaction-modal-form-group'>
                                    <Label for="exampleEmail" sm={12} className='label-model'>Nội dung chuyển tiền</Label>
                                    <Col sm={12}>
                                        <Input placeholder='Nội dung chuyển tiền' id="statusSelect" name="statusSelect" type="textarea" value={description} onChange={handleChangeDescription} maxLength={210} />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs={5} sm={5} md={5} lg={5} >
                                {/* Mã QR */}
                                <div className='qr-container'>
                                    {loading ? <DefaultSpinner /> : !createdQR ? <img src={imgSource} alt="pic" style={{ width: '200px', height: '200px', opacity: '0.5' }} /> : <img src={imgSource} alt="pic" />}
                                </div>
                            </Col>
                        </Row>

                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Container fluid>
                        <Row>
                            <Col xs={12} sm={12} md={8} style={{ display: 'flex', alignItems: 'center' }}>
                                <div className='modal-transaction-payment-notification'>
                                    {
                                        !createdQR ? null : isPayment ?
                                            <><span><FontAwesomeIcon icon={faCheckCircle} color='green' /></span><p>Thanh toán thành công</p></> :
                                            <><span><FontAwesomeIcon icon={faCircle} color='#ffc107' fade /></span><p>Đang thanh toán...</p></>
                                    }
                                </div>

                            </Col>
                            {
                                !createdQR && <Col xs={12} sm={12} md={4}>
                                    <div className='modal-transaction-payment-button'>
                                        <Button color="primary" onClick={handleGenerateQRCode}>Tạo mã</Button>
                                    </div>

                                </Col>
                            }

                        </Row>
                    </Container>

                </ModalFooter>
            </Modal>
        </>
    )
}