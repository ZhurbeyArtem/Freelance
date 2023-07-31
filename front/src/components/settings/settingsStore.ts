import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from "../../services/store";
import { ContactEditValues } from "./settings-edit-contacts/model";
import { IPassword } from './settings-change-password/model'


export const settingsApi = createApi({

  reducerPath: 'settingsApi',
  tagTypes: ['Settings'],
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
      changeData: build.mutation<string, ContactEditValues>({
        query: (data) => ({
          url: `/users/data`,
          method: 'PATCH',
          body: data,
        })
      }),
 
      changePassword: build.mutation<string, IPassword>({
        query: (data)=> ({
          url: `/auth/password`,
          method: 'PATCH',
          body: data,
})
      })
    

    })
  }
})

export const { useChangeDataMutation, useChangePasswordMutation } = settingsApi

