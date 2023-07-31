import {Button, Table} from 'antd';
import {columns} from "./bidHooks";
import {useApproveBidMutation, useDeleteBidMutation, useGetBidsQuery} from "./bidStore";
import {wrapper} from "./styles";
import {Link} from "react-router-dom";
import {notify} from "services/hooks/notificationHook";
import { approveBid } from './model';


const Bids = () => {
    const {data: bid} = useGetBidsQuery(undefined, {refetchOnMountOrArgChange: true})
    const [delBid] = useDeleteBidMutation()
    const [approveBid] = useApproveBidMutation()

    const onDelete = async (id) => {
        const result: any = await delBid(id)
        if (result.data) notify(result.data.message)
        else notify("Успішно")
    }
    const onApprove = async (data: approveBid) => {
    const result: any = await approveBid(data)
    console.log(result)
        if (result.error.data != 'success') notify(result.error.data.message)
        else notify("Успішно")
    }


    const actions = {
        key: '1',
        title: "Дії",
        render: (record) => {
            return <>
                <Button type="primary" ghost onClick={() => {
                    onApprove({id :record.Bid_id, jobId: record.Bid_jobId})
                }
                }
                >Підтвердити</Button>
                <Button type="primary" ghost danger style={{marginLeft: 10}} onClick={() => {
                    onDelete(record.Bid_id)
                }
                }>Видалити</Button>
            </>
        }
    }

    return (
        <div
            style={wrapper}
        >
            <p><a href="/">головна сторінка</a>/ відгуки на роботу</p>

            <Table
                columns={[...columns, actions]}
                expandable={{
                    expandedRowRender: record => <p style={{margin: 0}}>{record.Bid_description}</p>,
                    rowExpandable: record => record.Bid_description !== 'Not Expandable',
                }}
                dataSource={
                    bid?.map(e => {
                   return {...e, key: e.Bid_id,  style:{background: 'red'} ,link: (<Link to={`/job/${e.Bid_jobId}`}>link</Link>)}
                })
            }
                style={{width: '100%'}}
            
            />
        </div>
    );
};

export default Bids;





