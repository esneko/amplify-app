import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync'
import gql from 'graphql-tag'
import awsconfig from './aws-exports'

import { listTodos } from './graphql/queries'

const client = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: awsconfig.aws_appsync_apiKey,
  }
})

const init = async () => {
  const res = await client.query<any>({
    query: gql(listTodos)
  })

  console.log(res.data.listTodos.items)
}

init()
