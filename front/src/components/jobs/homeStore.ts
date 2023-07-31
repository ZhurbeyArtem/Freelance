import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { createJob, jobs, listJobs, listJobsStatus, listResponse } from "./home/model";
import { RootState } from "../../services/store";
import { ITags, getJob } from "./job/model";


export const homeApi = createApi({

    reducerPath: 'homeApi',
    tagTypes: ['Jobs'],
    baseQuery: fetchBaseQuery({
        baseUrl: String(process.env.REACT_APP_BASE_URL),

        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.user.token

            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
console.log(headers)
            return headers
        },
    }),
    
    endpoints: (build) => {
        return ({
            jobList: build.query<listResponse<jobs>, listJobs>({
                query: (data) => ({
                    url: `/jobs/getAll`,
                    params: {
                        page: data.page,
                        tags: data.tags
                    },
                }),
                providesTags: ['Jobs']
            }),

            createJob: build.mutation<jobs, createJob>({
                query: (job) => ({
                    url: `/jobs`,
                    method: 'POST',
                    body: job,
                }),
                invalidatesTags: ['Jobs']
            }),

            getJob: build.query<getJob, number>({
                query: (id: number) => ({
                    url: `/jobs/${id}`,
                }),
            }),

            getOwnerJobs: build.query<listResponse<jobs>, listJobsStatus>({
                query: (data) => ({
                    url: `/jobs/getOwner`,
                    params: {
                        page: data.page,
                        status: data.status
                    },
                }),
                providesTags: ['Jobs']
            }),

            getFreelancerJobs: build.query<listResponse<jobs>, listJobsStatus>({
                query: (data) => ({
                    url: `/jobs/getFreelancer`,
                    params: {
                        page: data.page,
                        status: data.status
                    },
                }),
                providesTags: ['Jobs']
            }),

            getJobByTitle: build.query<getJob, string>({
                query: (title: string) => ({
                    url: `/jobs/title`,
                    params: { title }
                }),
            }),

            tagList: build.query<ITags[], void>({
                query: () => '/tags'
            }),

            finishJobOwner: build.mutation<string, number>({
                query: (id) => ({
                     url: `/jobs/owner/${id}`,
                     method: 'PATCH'
                }),
                  invalidatesTags: ['Jobs']
            }),

            finishJobFreelancer: build.mutation<string, number>({
                query: (id) => ({
                    url: `/jobs/freelancer/${id}`,
                    method: 'PATCH'
                }),
                invalidatesTags: ['Jobs']
            })

        })
    }
})

export const { useJobListQuery, useTagListQuery, useCreateJobMutation, useGetJobQuery, useGetJobByTitleQuery, useGetOwnerJobsQuery, useGetFreelancerJobsQuery, useFinishJobOwnerMutation, useFinishJobFreelancerMutation } = homeApi

