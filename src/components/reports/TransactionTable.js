import React from 'react'
import { Table, Badge } from 'reactstrap'
import ReactPaginate from 'react-paginate';

export const TransactionTable = ({ rowHeader, data, handleOpenModal, page, pageSize }) => {
    return (
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
                        <tr key={item.id}>
                            <th>{page * pageSize + index + 1}</th>
                            <td style={{ cursor: "pointer", color: "blue" }} className="align-middle no-wrap-box" onClick={() => handleOpenModal(item)}>{item.paymentReference.substring(0, 10).concat('...')}</td>
                            <td>{item.tnxStamp}</td>
                            <td>{item.merchantBranchName}</td>
                            <td>{item.merchantCashierCode}</td>
                            <td>{item.acqName}</td>
                            <td>{item.accountNo}</td>
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
    )
}

export const TablePagination = ({ totalPage, handleChangePage }) => {
    return (
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
    )
}