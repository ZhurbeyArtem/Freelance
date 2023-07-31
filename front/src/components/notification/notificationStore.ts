import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { RootState } from "services/store";
import { addMark, createNotification, getAllNotifications, getNotification, notification, updateNotification } from "./model";
import { listResponse } from "components/jobs/home/model";
import { url } from "inspector";

export const notificationApi = createApi({

  reducerPath: 'notificationApi',
  tagTypes: ['Notifications'],
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

      create: build.mutation<notification, createNotification>({  // 1 те що вертаєм 2 те що передаєм
        query: (data) => ({
          url: `/notification`,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['Notifications']
      }),

      get: build.query<getAllNotifications, getNotification>({
        query: (data) => ({
          url: `/notification`,
          params: {
            page: data.page,
            status: data.status
          },
        }),
        providesTags: ['Notifications']
      }),

      update: build.mutation<string, updateNotification>({
        query: ({ id, status }) => ({
          url: `/notification/${id}`,
          params: { status: status },
          method: 'PATCH',
        }),
        invalidatesTags: ['Notifications']
      }),

      sendMark: build.mutation<string, addMark>({
        query: (data) => ({
          url: `/users/addMarks/${data.id}`,
          method: 'PATCH',
          params:{mark: data.mark},
        }),
      }),

      generateQr: build.query<object, number>({
        query: (id) => (`/jobs/pay/${id}`)
      })

    })
  }
})

export const { useCreateMutation, useGetQuery, useUpdateMutation, useSendMarkMutation, useLazyGenerateQrQuery } = notificationApi

