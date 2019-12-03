import gql from 'graphql-tag'
import * as React from 'react'
import { graphql } from 'react-apollo'

import { listTodos } from '../graphql/queries'

const ListTodos = ({ listTodos: { items } }) => (
  <div>
    <pre>{JSON.stringify(items, null, 2)}</pre>
  </div>
)

export default graphql<any, any>(gql`${listTodos}`, {
  options: {
    fetchPolicy: 'cache-and-network',
  },
  props: ({ data: { listTodos } }) => ({
    data: listTodos || [],
  }),
})(ListTodos)
