import React from "react";
import { Button, Pagination, Select } from 'antd';

import { useJobListQuery, useTagListQuery } from "../homeStore";
import {
    paginationPage,
    forPagination,
    forButton, forFilters
} from "./styles";

import { useSelector } from "react-redux";
import CardComponent from "../card/card";
import { getNameTags } from "../createJob/jobHooks";

function Home() {

    const [page, setPage] = React.useState(1);
    const [tags, setTags] = React.useState([''])

    const { data: tagsForJob } = useTagListQuery(undefined, {
        pollingInterval: 60000,
    })
    const { data: jobs, isLoading } = useJobListQuery({ page, tags }, {
        pollingInterval: 6000,
    });

    const { userRole } = useSelector((state: any) => state.user.user);
    const employer = 'Employer'
    return (
        isLoading ? <h1>Loading</h1>
            : <>

                <div style={forFilters}>
                    <Select
                        mode="tags"
                        placeholder="Фільтри для робіт"
                        style={{ width: "80%" }}
                        onChange={setTags}
                    >
                        {getNameTags(tagsForJob)}
                    </Select>
                    {(userRole === employer) &&
                        <Button href='create/job' style={forButton}>Створити роботу</Button>
                    }
                </div>


                <div style={paginationPage}>
                    {jobs[0].map(item =>
                        <CardComponent item={item} key={item.id} />
                    )}
                </div>
                <Pagination simple defaultCurrent={1} total={jobs[1]} onChange={setPage} style={forPagination} />
            </>
    )
}

export default Home;
