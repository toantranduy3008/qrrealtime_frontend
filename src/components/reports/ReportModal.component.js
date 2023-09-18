import { Container, Row, Col, Input, FormGroup, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Report.css'
export const TransactionDetailModal = ({ isOpen, toggle, data }) => {
    const { paymentReference, tnxStamp, merchantName, merchantBranchName, merchantCashierCode, acqName, cardNo, addInfo, amount, ibftInfo, responseCode } = data
    return (
        <>
            <Modal isOpen={isOpen} toggle={toggle} size='lg' scrollable={true}>
                <ModalHeader toggle={toggle}>Thông tin giao dịch</ModalHeader>
                <ModalBody>
                    <Container fluid>
                        <Row>
                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }}>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Mã giao dịch</Label>
                                    <Col sm={8}>
                                        <Input readonly id="statusSelect" name="statusSelect" type="text" value={paymentReference} />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }}>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Thời gian giao dịch</Label>
                                    <Col sm={8}>
                                        <Input readonly id="statusSelect" name="statusSelect" type="text" value={tnxStamp} />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }}>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Merchant</Label>
                                    <Col sm={8}>
                                        <Input readonly id="statusSelect" name="statusSelect" type="text" value={merchantName} />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }}>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Branch</Label>
                                    <Col sm={8}>
                                        <Input readonly id="statusSelect" name="statusSelect" type="text" value={merchantBranchName} />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }}>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Cashier</Label>
                                    <Col sm={8}>
                                        <Input readonly id="statusSelect" name="statusSelect" type="text" value={merchantCashierCode} />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }}>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Ngân hàng PL</Label>
                                    <Col sm={8}>
                                        <Input readonly id="statusSelect" name="statusSelect" type="text" value={acqName} />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }}>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Mã giao dịch</Label>
                                    <Col sm={8}>
                                        <Input readonly id="statusSelect" name="statusSelect" type="text" value={paymentReference} />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }}>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Tài khoản KH</Label>
                                    <Col sm={8}>
                                        <Input readonly id="statusSelect" name="statusSelect" type="text" value={cardNo} />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }}>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Tên KH</Label>
                                    <Col sm={8}>
                                        <Input readonly id="statusSelect" name="statusSelect" type="text" value={addInfo} />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }}>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Số tiền</Label>
                                    <Col sm={8}>
                                        <Input readonly id="statusSelect" name="statusSelect" type="text" value={new Intl.NumberFormat('en-US').format(amount)} />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }}>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Thông tin chuyển khoản</Label>
                                    <Col sm={8}>
                                        <Input readonly id="statusSelect" name="statusSelect" type="text" value={ibftInfo} />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12}>
                                <FormGroup row style={{ alignItems: 'center' }}>
                                    <Label for="exampleEmail" sm={3} className='label-model'>Trạng thái giao dịch</Label>
                                    <Col sm={8}>
                                        <Input readonly id="statusSelect" name="statusSelect" type="text" value={responseCode === '00' ? '00 - Thành công' : responseCode === '68' ? '68 - Đang xử lý' : `${responseCode} - Không thành công`} />
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