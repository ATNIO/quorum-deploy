import React, { Component } from 'react';
import Pagination from "react-bootstrap/lib/Pagination";
import LatestBlockRow from "./LatestBlockRow/LatestBlockRow";
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
        showing = 'Showing Blocks (#'
            + data[0]["number"]
            + ' to #'
            + data[data.length - 1]["number"]
            + ') out of '
            + total
            + ' total blocks'
        thead = <thead>
        <tr>
            <th>Timestamp</th>
            <th>Block Number</th>
            <th>Block Hash</th>
            <th>Transaction Count</th>
        </tr>
        </thead>
        for (let i = 0; i < data.length; i++) {
            content.push(<LatestBlockRow
                key={data[i]["number"]}
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