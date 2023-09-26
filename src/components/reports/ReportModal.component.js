import { Container, Row, Col, Input, FormGroup, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useState } from 'react';
import './Report.css'
import ReportServices from './ReportServices'
import ServiceAlert from '../../common/ServiceAlert';
import { DefaultSpinner } from './ReportServices';
import AuthService from '../../services/Auth.service';

export const TransactionDetailModal = ({ isOpen, toggle, data }) => {
    const { paymentReference, tnxStamp, merchantName, merchantBranchName, merchantCashierCode, acqName, cardNo, addInfo, amount, ibftInfo, responseCode } = data
    return (
        <>
            <Modal isOpen={isOpen} toggle={toggle} size='lg' centered scrollable={true}>
                <ModalHeader toggle={toggle}>Thông tin giao dịch</ModalHeader>
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
                                    <Label for="exampleEmail" sm={3} className='label-model'>Branch</Label>
                                    <Col sm={8}>
                                        <Input readonly id="statusSelect" name="statusSelect" type="text" value={merchantBranchName} className='modal-input' disabled />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }}>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Cashier</Label>
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
                                    <Label for="exampleEmail" sm={3} className='label-model'>Mã giao dịch</Label>
                                    <Col sm={8}>
                                        <Input readonly id="statusSelect" name="statusSelect" type="text" value={paymentReference} className='modal-input' disabled />
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
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [imgSource, setImgSource] = useState('/merchantweb/images/napas.svg')
    const [loading, setLoading] = useState(false)
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
        setAmount(0)
        setDescription('')
        setImgSource('/merchantweb/images/napas.svg')
        isOpen = false
    }
    return (
        <>
            <Modal isOpen={isOpen} toggle={toggle} size='md' centered scrollable={true} onClosed={handleCloseModal}>
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
                                        <Input placeholder='Nội dung chuyển tiền' id="statusSelect" name="statusSelect" type="textarea" value={description} onChange={handleChangeDescription} />
                                    </Col>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleGenerateQRCode}>Tạo mã</Button>
                    <Button color="secondary" onClick={toggle}>Đóng</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}