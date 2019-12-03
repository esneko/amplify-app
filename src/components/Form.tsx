import { AWSAppSyncClient, buildMutation } from 'aws-appsync'
import gql from 'graphql-tag'
import * as React from 'react'
import { ApolloContext, graphql } from 'react-apollo'
import Button from '@material/react-button'

import InputField from '../components/InputField'
import { UpdateTodoInput } from '../api'
import { getTodo, listTodos } from '../graphql/queries'
import { updateTodo } from '../graphql/mutations'
import { InitialState, initialState } from '../hooks/initialState'
import { reducer } from '../hooks/reducer'

interface Props {
  todo: any
}

const Form: React.FunctionComponent<Props> = ({ todo }) => {
  const { client }: { client: AWSAppSyncClient<any> } = React.useContext(
    ApolloContext as any
  )

  const [formState, dispatch] = React.useReducer(reducer, initialState)

  React.useEffect(() => {
    Object.keys(todo).map(id =>
      dispatch({
        type: 'setField',
        data: {
          id,
          value: {
            ...formState[id as keyof InitialState],
            value: todo[id as keyof InitialState],
          },
        },
      })
    )
  }, [todo])

  const handleChangeInput = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: 'setField',
      data: {
        id: name,
        value: {
          ...formState[name as keyof InitialState],
          value: event.target.value,
        },
      },
    })
  }

  const handleClick = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    const result = await client.mutate(
      buildMutation(
        client,
        gql(updateTodo),
        {
          inputType: gql(UpdateTodoInput),
          variables: {
            input: {
              id: todo.id,
              title: formState.title.value,
            },
          },
        },
        (_variables: any) => [gql(listTodos)],
        'Todo'
      )
    )
    console.log(result)
  }

  return (
    <form className="save-todo">
      <InputField
        value={formState.title.value}
        onChange={handleChangeInput('title')}
        placeholder="Title"
        required
      />
      <br />
      <br />
      <Button onClick={handleClick} unelevated>
        Save
      </Button>
    </form>
  )
}

export default graphql<any, any>(gql`${getTodo}`, {
  options: ({ id }: {id: string}) => ({
    variables: { id },
    fetchPolicy: 'cache-and-network',
  }),
  props: ({ data: { getTodo } }) => ({
    todo: getTodo,
  }),
})(React.memo(Form))
