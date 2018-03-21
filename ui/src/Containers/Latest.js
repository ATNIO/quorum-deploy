import React, { Component } from 'react';
import axios from "axios"
import LatestBlockTable from "../Components/LatestBlockTable";
import LatestTransactionTable from "../Components/LatestTransactionTable";
import LatestContractTable from "../Components/LatestContractTable";

class Latest extends Component {

    blockQuery = this.props.server + '/api/blocks'
    txQuery = this.props.server + '/api/transactions'
    contractQuery = this.props.server + '/api/contracts'

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            data: [],
            isLoading: true,
            page: 1,
            maxPage: 0,
            count: 25,
            total: 0,
            from: -1
        }
    }

    componentWillMount() {
        if (this.props.match.params.page <= 0) {
            let location = this.props.location.pathname.split('/')
            let pathname = '/'
            for(let i = 1; i < location.length - 1; ++i){
                pathname = pathname + location[i] + '/'
            }
            pathname = pathname + 1
            this.props.history.push(pathname)
        } else {
            if(this.props.match.params.value) {
                this.handleComplexQuery(this.props.match.params.value,
                    this.props.match.params.page)
            } else {
                this.handleQuery(this.props.match.params.page)
            }
        }
    }

    handleComplexQuery(value, page) {
        let query = "?page=" + (parseInt(page, 10) - 1)
        this.setState({
            isLoading: true,
            page: parseInt(page, 10)
        })

        if (this.props.history.location.pathname.includes("block")) {
            query = query + "&block=" + value
            this.submitQuery(query, this.txQuery)
        } else {
            query = query + "&address=" + value
            this.submitQuery(query, this.txQuery)

        }
    }

    buildComponentQuery(query, root) {
        axios.get(root + query)
            .then(result => {
                if(result.data.result <= this.state.count){
                    this.setState({
                        maxPage: 0,
                        total: result.data.result
                    })
                } else {
                    this.setState({
                        maxPage: Math.ceil(result.data.result / this.state.count),
                        total: result.data.result
                    })
                }
            })
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.location.key !== nextProps.location.key) {
            if (nextProps.match.params.page <= 0) {
                let location = nextProps.location.pathname.split('/')
                let pathname = '/'
                for(let i = 1; i < location.length - 1; ++i){
                    pathname = pathname + location[i] + '/'
                }
                pathname = pathname + 1
                nextProps.history.push(pathname)
            } else {
                if(nextProps.match.params.value) {
                    this.handleComplexQuery(nextProps.match.params.value,
                        nextProps.match.params.page)
                } else {
                    this.handleQuery(nextProps.match.params.page)
                }
            }
        }
    }

    handleQuery(page) {
        let query = "?page=" + (parseInt(page, 10) - 1)
        this.setState({
            isLoading: true,
            page: parseInt(page, 10)
        })

        if (this.props.history.location.pathname.includes("blocks")) {
            this.submitQuery(query, this.blockQuery)
        } else if (this.props.history.location.pathname.includes("transactions")) {
            this.submitQuery(query, this.txQuery)
        } else {
            this.submitQuery(query, this.contractQuery)
        }
    }

    submitQuery(query, root) {
        axios.get(root + query)
            .then(result => {
                let title = result.data.type.charAt(0).toUpperCase() + result.data.type.slice(1);
                if(!result.data.error.message){
                    this.setState({
                        title: title,
                        data: result.data.result.data,
                        isLoading: false,
                        from: result.data.result.atBlock
                    })
                    if (this.props.history.location.pathname.includes("blocks")) {
                        this.buildComponentQuery('/count?from=' + result.data.result.atBlock, this.blockQuery)
                    } else if (this.props.history.location.pathname.includes("block")){
                        this.buildComponentQuery('/count?block=' + result.data.id, this.txQuery)
                    } else if (this.props.history.location.pathname.includes("account")) {
                        this.buildComponentQuery('/count?address=' + result.data.id, this.txQuery)
                    } else if (this.props.history.location.pathname.includes("contracts")) {
                        this.buildComponentQuery('/count?from=' + result.data.result.atBlock, this.contractQuery)
                    } else {
                        this.buildComponentQuery('/count?from=' + result.data.result.atBlock, this.txQuery)
                    }
                } else {
                    this.setState({
                        title: title,
                        data: result.data.error,
                        isLoading: false
                    })
                }
            })
    }

    render() {
        let content = []
        if (!this.state.isLoading && this.state.data) {
            let data = this.state.data
            let total = this.state.total
            if (this.props.location.pathname.includes('blocks')) {
                content.push(<LatestBlockTable
                    title={this.state.title}
                    data={data}
                    total={total}
                    maxPage={this.state.maxPage}
                    page={this.state.page}
                    history={this.props.history}
                    location={this.props.location}/>)

            } else if (this.props.location.pathname.includes('transactions')) {
                content.push(<LatestTransactionTable
                    title={this.state.title}
                    data={data}
                    total={total}
                    maxPage={this.state.maxPage}
                    page={this.state.page}
                    history={this.props.history}
                    location={this.props.location}/>)
            } else {
                content.push(<LatestContractTable
                    title={this.state.title}
                    data={data}
                    total={total}
                    maxPage={this.state.maxPage}
                    page={this.state.page}
                    history={this.props.history}
                    location={this.props.location}/>)
            }
        } else {
            content = 'Loading...'
        }
        return (
            <div>
                {content}
            </div>
        )
    }
}


export default Latest;