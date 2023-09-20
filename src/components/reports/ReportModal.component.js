import { Container, Row, Col, Input, FormGroup, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Report.css'
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