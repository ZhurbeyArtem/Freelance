import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { approveBid, bid, getAllBids } from "./model";
import { RootState } from "services/store";

export const bidApi = createApi({

    reducerPath: 'bidApi',
    tagTypes: ['Bids', 'Jobs'],
    baseQuery: fetchBaseQuery({
        baseUrl: String(process.env.REACT_APP_BASE_URL),
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.user.token

            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    endpoints: (build) => {
        return ({

            createBid: build.mutation<bid, bid>({  // 1 те що вертаєм 2 те що передаєм
                query: (bid) => ({
                    url: `/bid`,
                    method: 'POST',
                    body: bid,
                }),
                invalidatesTags: ['Bids']
            }),

            getBidsByStatus: build.query<number, void>({
                query: () => '/bid/countBids/user'
            }),

            getBids: build.query<getAllBids[], void>({
                query: () => '/bid?status=0',
                providesTags: ['Bids'],
            }),

            countBidsJob: build.query<number, number>({
                query: (id) => `/bid/countBids/job/${id}`,
                providesTags: ['Bids']
            }),

            deleteBid: build.mutation<string, number>({  // 1 те що вертаєм 2 те що передаєм
                query: (id: number) => ({
                    url: `/bid/${id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: ['Bids']
            }),

            approveBid: build.mutation<string, approveBid>({
                query: (bid: approveBid) => ({
                    url: `/bid/approve`,
                    method: 'PATCH',
                    body: bid
                }),
                invalidatesTags: ['Jobs']
            })

        })
    }
})

export const { useCreateBidMutation, useGetBidsQuery, useGetBidsByStatusQuery, useDeleteBidMutation, useApproveBidMutation, useCountBidsJobQuery } = bidApi

