import React, { Component } from 'react';
import LatestTransactionRow from "./LatestTransactionRow/LatestTransactionRow";
import Pagination from "react-bootstrap/lib/Pagination";
import Table from "react-bootstrap/lib/Table";

class LatestBlockTable extends Component {

    handleSelect(eventKey) {
        let location = this.props.location.pathname.split('/')
        let pathname = '/'
        for(let i = 1; i < location.length - 1; ++i){
            pathname = pathname + location[i] + '/'
        }
        this.props.history.push(pathname + eventKey)
    }

    render() {
        let showing
        let pagination
        let thead
        let content = []
        let data = this.props.data
        let total = this.props.total
        let maxPage = this.props.maxPage
        let page = this.props.page
        if(maxPage > 0){
            pagination = <Pagination
                prev
                next
                first
                last
                boundaryLinks
                items={maxPage}
                maxButtons={5}
                activePage={page}
                onSelect={this.handleSelect.bind(this)}/>
        }
        if (total === 1) {
            showing = total + ' transaction found'
        } else {
            showing = total + ' transactions found'
        }
        thead = <thead>
        <tr>
            <th>Timestamp</th>
            <th>Transaction Hash</th>
            <th>From</th>
            <th>To</th>
            <th>Value</th>
        </tr>
        </thead>
        for(let i = 0; i < data.length; i++) {
            content.push(<LatestTransactionRow
                key={data[i]["hash"]}
                history={this.props.history}
                data={data[i]}
            />)
        }
        return (
            <div>
                <h4>{this.props.title}</h4>
                {showing}
                <div style={{textAlign: "right"}}>
                    {pagination}
                </div>
                <Table style={{tableLayout: "fixed"}} responsive>
                    {thead}
                    <tbody>
                    {content}
                    </tbody>
                </Table>
                <div style={{textAlign: "right"}}>
                    {pagination}
                </div>
            </div>
        );
    }
}

export default LatestBlockTable;