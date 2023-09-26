import { Container, Row, Col, Input, FormGroup, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useEffect, useState } from 'react';
import './Report.css'
import ReportServices from './ReportServices'
import ServiceAlert from '../../common/ServiceAlert';
import { DefaultSpinner } from './ReportServices';
import AuthService from '../../services/Auth.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import authHeader from '../../services/auth-header';

export const TransactionDetailModal = ({ isOpen, toggle, data }) => {
    const { paymentReference, tnxStamp, merchantName, merchantBranchName, merchantCashierCode, acqName, cardNo, addInfo, amount, ibftInfo, responseCode } = data
    return (
        <>
            <Modal isOpen={isOpen} toggle={toggle} size='lg' centered scrollable={true}>
                <ModalHeader toggle={toggle} className='transaction-detail-modal-header'>Thông tin giao dịch</ModalHeader>
                <ModalBody>
                    <Container fluid>
                        <Row>
                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }}>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Mã giao dịch</Label>
                                    <Col sm={8}>
                                        <Input className='modal-input' readonly id="statusSelect" name="statusSelect" type="text" value={paymentReference} disabled />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }}>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Thời gian giao dịch</Label>
                                    <Col sm={8}>
                                        <Input readonly id="statusSelect" name="statusSelect" type="text" value={tnxStamp} className='modal-input' disabled />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }}>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Merchant</Label>
                                    <Col sm={8}>
                                        <Input readonly id="statusSelect" name="statusSelect" type="text" value={merchantName} className='modal-input' disabled />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }}>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Chi nhánh</Label>
                                    <Col sm={8}>
                                        <Input readonly id="statusSelect" name="statusSelect" type="text" value={merchantBranchName} className='modal-input' disabled />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }}>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Quầy</Label>
                                    <Col sm={8}>
                                        <Input readonly id="statusSelect" name="statusSelect" type="text" value={merchantCashierCode} className='modal-input' disabled />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }}>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Ngân hàng PL</Label>
                                    <Col sm={8}>
                                        <Input readonly id="statusSelect" name="statusSelect" type="text" value={acqName} className='modal-input' disabled />
                                    </Col>
                                </FormGroup>
                            </Col>

                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }}>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Tài khoản KH</Label>
                                    <Col sm={8}>
                                        <Input readonly id="statusSelect" name="statusSelect" type="text" value={cardNo} className='modal-input' disabled />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }}>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Tên KH</Label>
                                    <Col sm={8}>
                                        <Input readonly id="statusSelect" name="statusSelect" type="text" value={addInfo} className='modal-input' disabled />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }}>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Số tiền</Label>
                                    <Col sm={8}>
                                        <Input readonly id="statusSelect" name="statusSelect" type="text" value={new Intl.NumberFormat('en-US').format(amount)} className='modal-input' disabled />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }}>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Thông tin chuyển khoản</Label>
                                    <Col sm={8}>
                                        <Input readonly id="statusSelect" name="statusSelect" type="text" value={ibftInfo} className='modal-input' disabled />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }}>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Trạng thái giao dịch</Label>
                                    <Col sm={8}>
                                        <Input readonly id="statusSelect" name="statusSelect" type="text" value={responseCode === '00' ? '00 - Thành công' : responseCode === '68' ? '68 - Đang xử lý' : `${responseCode} - Không thành công`} className='modal-input' disabled />
                                    </Col>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Đóng</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export const GenerateQRCodeModal = ({ isOpen, toggle }) => {
    const randomString = ReportServices.generateRandomString(7)
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState(randomString)
    const [imgSource, setImgSource] = useState('/merchantweb/images/napas.svg')
    const [loading, setLoading] = useState(false)
    const [isPayment, setIsPayment] = useState(false)
    const [createdQR, setCreatedQR] = useState(false)
    const handleGenerateQRCode = () => {
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
        setLoading(true)
        setCreatedQR(false)
        ReportServices.genQRCode(`/merchantweb/api/VietQR/generateQRCodeCashier?amount=${qrAmount}&description=${description}`)
            .then(
                res => {
                    const { status, data } = res
                    if (status !== 200) {
                        ServiceAlert.error('Lỗi', 'Tài khoản không có quyền tạo mã QR.')
                        return
                    }

                    const url = URL.createObjectURL(data)
                    setImgSource(url)
                    setCreatedQR(true)
                    handlePayment();
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
        setAmount('')
        setDescription(randomString)
        setImgSource('/merchantweb/images/napas.svg')
        setIsPayment(false)
        setCreatedQR(false)
        isOpen = false
    }

    const handlePayment = () => {
        axios.get('', { headers: authHeader() })
            .then(res => {

            })
            .catch(e => {
                throw new Error(e.message)
            })
            .finally()
    }

    useEffect(() => {
        const interval = setInterval(() => {
            handlePayment()
        }, 3000);
        return () => clearInterval(interval);
    }, [])
    return (
        <>
            <Modal isOpen={isOpen} toggle={toggle} size='lg' centered scrollable={true} onClosed={handleCloseModal}>
                <ModalHeader toggle={toggle}>Thông tin QR</ModalHeader>
                <ModalBody>
                    <Container fluid>
                        <Row>
                            <Col xs={12} sm={12} md={{ size: 4, offset: 4 }} style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                                <div className='qr-container'>
                                    {loading ? <DefaultSpinner /> : <img src={imgSource} alt="pic" />}
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }}>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Số tiền</Label>
                                    <Col sm={8}>
                                        <Input placeholder='Số tiền' id="statusSelect" name="statusSelect" type="text" value={amount} onChange={handleChangeAmount} />
                                    </Col>
                                </FormGroup>
                            </Col>

                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }}>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Nội dung chuyển tiền</Label>
                                    <Col sm={8}>
                                        <Input placeholder='Nội dung chuyển tiền' id="statusSelect" name="statusSelect" type="textarea" value={description} onChange={handleChangeDescription} disabled readOnly />
                                    </Col>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Container fluid>
                        <Row>
                            <Col xs={12} sm={12} md={8}>
                                <div className='modal-transaction-payment-notification'>
                                    {
                                        !createdQR ? null : isPayment ?
                                            <><span><FontAwesomeIcon icon={faCheckCircle} color='green' /></span><p>Thanh toán thành công</p></> :
                                            <><span><FontAwesomeIcon icon={faCircle} color='#ffc107' fade /></span><p>Đang thanh toán. Vui lòng chờ.</p></>
                                    }

                                </div>

                            </Col>
                            <Col xs={12} sm={12} md={4}>
                                <div className='modal-transaction-payment-button'>
                                    <Button color="primary" onClick={handleGenerateQRCode}>Tạo mã</Button>
                                    {/* <Button color="secondary" onClick={toggle}>Đóng</Button> */}
                                </div>

                            </Col>
                        </Row>
                    </Container>

                </ModalFooter>
            </Modal>
        </>
    )
}