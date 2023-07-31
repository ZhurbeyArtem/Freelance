import React from "react";
import { Pagination, Select } from 'antd';

import { useGetOwnerJobsQuery } from "../homeStore";
import {
    paginationPage,
    forPagination,
    forFilters
} from "./styles";
import CardComponent from "../card/card";


function EmployerJobs() {

    const [page, setPage] = React.useState(1);
    const [status, setStatus] = React.useState('notStarted')

    const { data: jobs, isLoading, error } = useGetOwnerJobsQuery({ page, status }, {
        pollingInterval: 60000,
    });
    console.log(jobs)
    console.log(isLoading)
    console.log(error)

    const optionData = [{
        "value": 'notStarted',
        "label": 'Не розпочаті'
    },
    {
        "value": 'atProcess',
        "label": 'В процесі'
    },
    {
        "value": 'finished',
        "label": 'Виконанні'
    }]

    return (
        isLoading ? <h1>Loading</h1>
            : <>
                <p style={paginationPage}><a href="/">головна сторінка</a>/ мої роботи</p>

                <div style={forFilters}>
                    <Select
                        placeholder="Статус робіт"
                        style={{ width: "80%" }}
                        onChange={setStatus}
                        options={optionData}
                    />

                </div>


                <div style={paginationPage}>
                    {
                        jobs[0].length < 1
                            ? <h1>Робіт за таким статусом не знайдено</h1>
                            :
                            jobs[0].map(item =>
                                <CardComponent item={item} key={item.id} />
                            )}
                </div>
                <Pagination simple defaultCurrent={1} total={jobs[1]} onChange={setPage} style={forPagination} />
            </>
    )
}

export default EmployerJobs;
